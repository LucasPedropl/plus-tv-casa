import { API_BASE_URL } from '@/content/site'

export interface ApiRegisterPlan {
  id: string
  code?: string
  name: string
  description?: string
  monthly_price: number
  screens_cap?: number
  status: string
  applications?: { application_code: string }[]
}

export interface RegisterPersonPayload {
  email: string
  name: string
  password: string
  cpf: string
  cellphone: string
  verification_code: string
  plan_id: string
}

export interface LoginSession {
  access_token: string
  refresh_token: string
  account_kind?: string
  billing_only?: boolean
  token?: string
}

export interface RegisterResponse {
  user: unknown
  login?: LoginSession | null
}

export class PlusApiError extends Error {
  status: number
  details?: unknown

  constructor(message: string, status: number, details?: unknown) {
    super(message)
    this.name = 'PlusApiError'
    this.status = status
    this.details = details
  }
}

async function fetchJson<T>(endpoint: string, init?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  let response: Response

  try {
    response = await fetch(url, {
      ...init,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...init?.headers,
      },
    })
  } catch (err) {
    throw new PlusApiError(
      'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
      0,
      err
    )
  }

  let body: unknown = null
  try {
    body = await response.json()
  } catch {
    body = null
  }

  if (!response.ok) {
    let message = 'Falha na operação'
    if (body && typeof body === 'object') {
      const b = body as Record<string, unknown>
      if (typeof b.message === 'string' && b.message.trim()) {
        message = b.message.trim()
      } else if (typeof b.error === 'string' && b.error.trim()) {
        message = b.error.trim()
      }
    }
    throw new PlusApiError(message, response.status, body)
  }

  return body as T
}

function isDemoPlan(plan: ApiRegisterPlan): boolean {
  return (
    plan.code === 'plus-demo' ||
    plan.monthly_price <= 0 ||
    /demo/i.test(plan.name)
  )
}

export function planScreensLabel(plan: ApiRegisterPlan): string {
  const cap = plan.screens_cap || 1
  return cap === 1 ? '1 Smart TV' : `${cap} Smart TVs`
}

export function parseApiPlan(raw: unknown): ApiRegisterPlan | null {
  if (!raw || typeof raw !== 'object') return null
  const o = raw as Record<string, unknown>
  const id = String(o.id ?? '').trim()
  const name = String(o.name ?? '').trim()
  if (!id || !name) return null

  const applications = Array.isArray(o.applications)
    ? o.applications
        .map((app) => {
          if (!app || typeof app !== 'object') return null
          const code = String((app as Record<string, unknown>).application_code ?? '').trim()
          return code ? { application_code: code } : null
        })
        .filter((app): app is { application_code: string } => app !== null)
    : undefined

  return {
    id,
    code: String(o.code ?? '').trim() || undefined,
    name,
    description: String(o.description ?? '').trim() || undefined,
    monthly_price: Number(o.monthly_price) || 0,
    screens_cap: Number(o.screens_cap) || 0,
    status: String(o.status ?? 'active'),
    applications,
  }
}

export function filterPlusWebPlans(plans: ApiRegisterPlan[]): ApiRegisterPlan[] {
  return plans.filter((plan) => {
    if (plan.status && plan.status !== 'active') return false
    const apps = plan.applications ?? []
    if (apps.length === 0) return true
    return apps.some((app) => app.application_code === 'plus-web')
  })
}

export function sortApiPlans(plans: ApiRegisterPlan[]): ApiRegisterPlan[] {
  return [...plans].sort((a, b) => a.monthly_price - b.monthly_price)
}

export function findMatchingPlanId(plans: ApiRegisterPlan[], tvCount?: number): string {
  if (plans.length === 0) return ''

  if (tvCount && tvCount > 0) {
    const matching = plans.filter((p) => (p.screens_cap ?? 0) >= tvCount)
    if (matching.length > 0) {
      return [...matching].sort((a, b) => a.monthly_price - b.monthly_price)[0].id
    }
    // If no plan has screens_cap >= tvCount, choose the one with highest screens_cap
    return [...plans].sort((a, b) => (b.screens_cap ?? 0) - (a.screens_cap ?? 0))[0].id
  }

  // Default: cheapest plan
  return [...plans].sort((a, b) => a.monthly_price - b.monthly_price)[0].id
}

export function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

export const plusApi = {
  async listPlans(): Promise<ApiRegisterPlan[]> {
    const data = await fetchJson<unknown>('/v1/auth/register/plans', { method: 'GET' })
    const list = Array.isArray(data) ? data : []
    const parsed = list
      .map(parseApiPlan)
      .filter((p): p is ApiRegisterPlan => p !== null)
    const activePlusWeb = filterPlusWebPlans(parsed).filter((p) => !isDemoPlan(p))
    return sortApiPlans(activePlusWeb)
  },

  sendCode(email: string, cpf: string): Promise<{ sent_to: string; expires_in_seconds: number }> {
    return fetchJson<{ sent_to: string; expires_in_seconds: number }>(
      '/v1/auth/register/person/send-code',
      {
        method: 'POST',
        body: JSON.stringify({ email, cpf }),
      }
    )
  },

  registerPerson(payload: RegisterPersonPayload): Promise<RegisterResponse> {
    return fetchJson<RegisterResponse>('/v1/auth/register/person', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
}
