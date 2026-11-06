import { useEffect, useRef, useState, useId } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  MessageCircle,
  RefreshCw,
  Sparkles,
  Tv,
  X,
} from 'lucide-react'
import { useSignUpModal } from './SignUpModalContext'
import {
  plusApi,
  isDemoPlan,
  planNeedsPayment,
  planScreensLabel,
  findMatchingPlanId,
  toBase64Url,
  PlusApiError,
  type ApiRegisterPlan,
} from '@/lib/plusApi'
import {
  formatCpf,
  formatPhone,
  formatPhoneForApi,
  isValidCpf,
  onlyDigits,
} from '@/lib/documentUtils'
import { PLUS_WEB_URL, SALES_CONTACT_URL } from '@/content/site'
import { cn } from '@/lib/cn'

const STEPS = ['Dados', 'Código', 'Plano'] as const

export function SignUpModal() {
  const { isOpen, initialTvCount, closeSignUp } = useSignUpModal()
  const modalRef = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState<number>(0)
  const [maxStep, setMaxStep] = useState<number>(0)

  // Step 0 form state
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [cellphone, setCellphone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Step 1 code state
  const [code, setCode] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)

  // Step 2 plans state
  const [plans, setPlans] = useState<ApiRegisterPlan[]>([])
  const [plansLoading, setPlansLoading] = useState(false)
  const [plansError, setPlansError] = useState<string | null>(null)
  const [selectedPlanId, setSelectedPlanId] = useState('')

  // Status & error states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [conflictError, setConflictError] = useState<string | null>(null)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [successRedirecting, setSuccessRedirecting] = useState(false)

  const titleId = useId()

  // Reset or initialize when modal opens
  useEffect(() => {
    if (!isOpen) {
      setStep(0)
      setMaxStep(0)
      setErrors({})
      setConflictError(null)
      setGeneralError(null)
      setCode('')
      setSuccessRedirecting(false)
      return
    }

    // Load plans on open if not loaded
    let active = true
    const loadPlans = async () => {
      setPlansLoading(true)
      setPlansError(null)
      try {
        const fetched = await plusApi.listPlans()
        if (!active) return
        setPlans(fetched)
        const match = findMatchingPlanId(fetched, initialTvCount)
        setSelectedPlanId(match)
      } catch (err) {
        if (!active) return
        const msg = err instanceof Error ? err.message : 'Não foi possível carregar os planos.'
        setPlansError(msg)
      } finally {
        if (active) setPlansLoading(false)
      }
    }

    void loadPlans()

    return () => {
      active = false
    }
  }, [isOpen, initialTvCount])

  // Body scroll lock
  useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen])

  // Focus trap & Escape listener
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!isSubmitting && !successRedirecting) {
          e.preventDefault()
          closeSignUp()
        }
        return
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, isSubmitting, successRedirecting, closeSignUp])

  // Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCooldown])

  if (!isOpen) return null

  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || null

  const validateStep = (stepIndex: number): boolean => {
    const nextErrors: Record<string, string> = {}

    if (stepIndex === 0) {
      if (!name.trim()) nextErrors.name = 'Nome completo é obrigatório.'
      if (!isValidCpf(cpf)) nextErrors.cpf = 'CPF inválido (11 dígitos e dígitos verificadores).'
      if (!email.trim() || !/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email.trim())) {
        nextErrors.email = 'Informe um e-mail válido.'
      }
      const phoneDigits = onlyDigits(cellphone)
      if (!phoneDigits) {
        nextErrors.cellphone = 'Celular com DDD é obrigatório.'
      } else if (phoneDigits.length < 10 || phoneDigits.length > 11) {
        nextErrors.cellphone = 'Celular inválido (deve conter DDD + 8 ou 9 dígitos).'
      }
      if (!password || password.length < 8) {
        nextErrors.password = 'A senha deve ter no mínimo 8 caracteres.'
      }
      if (confirmPassword !== password) {
        nextErrors.confirmPassword = 'As senhas não coincidem.'
      }
    }

    if (stepIndex === 1) {
      const trimmedCode = code.trim()
      if (!/^\d{6}$/.test(trimmedCode)) {
        nextErrors.code = 'O código de confirmação deve ter exatamente 6 números.'
      }
    }

    if (stepIndex === 2) {
      if (!selectedPlanId) {
        nextErrors.plan = 'Escolha um plano para finalizar seu cadastro.'
      }
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleStep0Submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)
    setConflictError(null)

    if (!validateStep(0)) return

    setIsSubmitting(true)
    try {
      await plusApi.sendCode(email.trim().toLowerCase(), onlyDigits(cpf))
      setStep(1)
      setMaxStep((prev) => Math.max(prev, 1))
      setResendCooldown(60)
    } catch (err) {
      if (err instanceof PlusApiError && err.status === 409) {
        setConflictError('Este e-mail ou CPF já possui uma conta no Plus.')
        return
      }
      const msg = err instanceof Error ? err.message : 'Erro ao enviar código de verificação.'
      setGeneralError(msg)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleResendCode = async () => {
    if (resendCooldown > 0 || isResending) return
    setIsResending(true)
    setGeneralError(null)
    setConflictError(null)
    try {
      await plusApi.sendCode(email.trim().toLowerCase(), onlyDigits(cpf))
      setResendCooldown(60)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Não foi possível reenviar o código.'
      setGeneralError(msg)
    } finally {
      setIsResending(false)
    }
  }

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)
    if (!validateStep(1)) return
    setStep(2)
    setMaxStep((prev) => Math.max(prev, 2))
  }

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)
    setConflictError(null)

    if (!validateStep(0)) {
      setStep(0)
      return
    }
    if (!validateStep(1)) {
      setStep(1)
      return
    }
    if (!validateStep(2) || !selectedPlan) {
      setStep(2)
      return
    }

    setIsSubmitting(true)
    try {
      const formattedPhone = formatPhoneForApi(cellphone)
      const res = await plusApi.registerPerson({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        cpf: onlyDigits(cpf),
        cellphone: formattedPhone,
        verification_code: code.trim(),
        plan_id: selectedPlan.id,
      })

      setSuccessRedirecting(true)

      const normalizedEmail = email.trim().toLowerCase()
      const login = res.login

      if (login && (login.access_token || login.token)) {
        const next = planNeedsPayment(selectedPlan) ? '/assinatura' : '/telas'
        const payload = {
          access_token: login.access_token || login.token,
          refresh_token: login.refresh_token,
          account_kind: login.account_kind || 'person',
          billing_only: Boolean(login.billing_only),
          email: normalizedEmail,
          next,
        }
        const s = toBase64Url(JSON.stringify(payload))
        window.location.assign(`${PLUS_WEB_URL}/entrar#s=${s}`)
      } else {
        window.location.assign(`${PLUS_WEB_URL}/login/pessoa?email=${encodeURIComponent(normalizedEmail)}`)
      }
    } catch (err) {
      if (err instanceof PlusApiError && err.status === 409) {
        setConflictError('Este e-mail ou CPF já possui cadastro no Plus.')
        setStep(0)
        return
      }

      const msg = err instanceof Error ? err.message : 'Falha ao concluir o cadastro.'
      const lower = msg.toLowerCase()

      if (lower.includes('código') || lower.includes('codigo') || (err instanceof PlusApiError && err.status === 401)) {
        setErrors((prev) => ({ ...prev, code: msg }))
        setStep(1)
      } else if (lower.includes('plano')) {
        setErrors((prev) => ({ ...prev, plan: msg }))
        setStep(2)
      } else {
        setGeneralError(msg)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-ink-sunken/80 backdrop-blur-md p-0 sm:p-4"
    >
      {/* Backdrop click dismiss */}
      <div
        className="fixed inset-0 -z-10"
        aria-hidden="true"
        onClick={() => {
          if (!isSubmitting && !successRedirecting) closeSignUp()
        }}
      />

      {/* Modal Dialog Content */}
      <div
        ref={modalRef}
        className="relative flex flex-col w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-2xl bg-ink-raised border-0 sm:border sm:border-line sm:rounded-3xl shadow-[0_24px_70px_-20px_hsl(var(--brand)/0.4)] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-line/80 bg-ink-raised/95 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand-light">
              <Tv className="h-5 w-5" />
            </span>
            <div>
              <h2 id={titleId} className="font-wide text-base font-bold text-cream">
                Assinar Tv Studio Client
              </h2>
              <p className="text-xs text-cream-dim">Passo {step + 1} de 3 · {STEPS[step]}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeSignUp}
            disabled={isSubmitting || successRedirecting}
            aria-label="Fechar janela"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-ink-sunken text-cream-dim hover:text-cream hover:border-brand/40 transition-colors disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Step Indicator Bar */}
        <div className="px-6 pt-4 pb-2">
          <div className="grid grid-cols-3 gap-2">
            {STEPS.map((stepName, idx) => {
              const isActive = idx === step
              const isDone = idx < step
              const canGoBack = idx <= maxStep && !isSubmitting && !successRedirecting

              return (
                <button
                  key={stepName}
                  type="button"
                  disabled={!canGoBack}
                  onClick={() => setStep(idx)}
                  className={cn(
                    'flex flex-col text-left py-2 px-3 rounded-xl border transition-all text-xs font-medium',
                    isActive
                      ? 'border-brand bg-brand/10 text-cream'
                      : isDone
                        ? 'border-line bg-ink-sunken text-cream-dim hover:border-line/80'
                        : 'border-line/40 bg-ink-sunken/40 text-cream-dim/50 cursor-not-allowed'
                  )}
                >
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-brand-light">
                    {isDone ? <Check className="h-3 w-3 stroke-[3]" /> : <span>0{idx + 1}</span>}
                    <span>{stepName}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Body Container */}
        <div className="flex-1 px-6 py-4">
          {/* Success Redirecting Overlay */}
          {successRedirecting && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="h-10 w-10 animate-spin text-brand" />
              <h3 className="mt-4 font-wide text-xl font-bold text-cream">
                Cadastro realizado com sucesso!
              </h3>
              <p className="mt-2 text-sm text-cream-dim">
                Conectando sua conta ao painel do Plus...
              </p>
            </div>
          )}

          {!successRedirecting && (
            <>
              {/* Conflict 409 Banner */}
              {conflictError && (
                <div className="mb-5 rounded-2xl border border-brand/50 bg-gradient-to-r from-brand/20 via-ink-sunken to-brand/10 p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-brand-light shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-cream">Você já tem conta</h4>
                      <p className="mt-1 text-xs text-cream-dim">{conflictError}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <a
                          href={`${PLUS_WEB_URL}/login/pessoa?email=${encodeURIComponent(email.trim().toLowerCase())}`}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-brand px-3.5 py-1.5 text-xs font-bold text-ink hover:bg-brand-light transition-colors"
                        >
                          <span>Fazer Login no Plus</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </a>
                        <button
                          type="button"
                          onClick={() => setConflictError(null)}
                          className="rounded-lg border border-line bg-ink-sunken px-3 py-1.5 text-xs text-cream-dim hover:text-cream transition-colors"
                        >
                          Tentar outro e-mail
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* General Error Banner */}
              {generalError && (
                <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-500/40 bg-red-500/10 p-3.5 text-xs text-red-200">
                  <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-red-300">Atenção</p>
                    <p className="mt-0.5">{generalError}</p>
                  </div>
                </div>
              )}

              {/* STEP 0: DADOS */}
              {step === 0 && (
                <form onSubmit={handleStep0Submit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-cream mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Carlos Eduardo da Silva"
                      className={cn(
                        'w-full rounded-xl border bg-ink-sunken px-3.5 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:outline-none transition-colors',
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-line focus:border-brand'
                      )}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-cream mb-1">
                        CPF *
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={cpf}
                        onChange={(e) => setCpf(formatCpf(e.target.value))}
                        placeholder="000.000.000-00"
                        maxLength={14}
                        className={cn(
                          'w-full rounded-xl border bg-ink-sunken px-3.5 py-2.5 text-sm font-mono text-cream placeholder:text-cream-dim/50 focus:outline-none transition-colors',
                          errors.cpf ? 'border-red-500 ring-1 ring-red-500' : 'border-line focus:border-brand'
                        )}
                      />
                      {errors.cpf && <p className="mt-1 text-xs text-red-400">{errors.cpf}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-cream mb-1">
                        Celular com DDD (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        inputMode="tel"
                        value={cellphone}
                        onChange={(e) => setCellphone(formatPhone(e.target.value))}
                        placeholder="(00) 00000-0000"
                        maxLength={15}
                        className={cn(
                          'w-full rounded-xl border bg-ink-sunken px-3.5 py-2.5 text-sm font-mono text-cream placeholder:text-cream-dim/50 focus:outline-none transition-colors',
                          errors.cellphone ? 'border-red-500 ring-1 ring-red-500' : 'border-line focus:border-brand'
                        )}
                      />
                      {errors.cellphone && (
                        <p className="mt-1 text-xs text-red-400">{errors.cellphone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cream mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className={cn(
                        'w-full rounded-xl border bg-ink-sunken px-3.5 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:outline-none transition-colors',
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-line focus:border-brand'
                      )}
                    />
                    <p className="mt-1 text-[11px] text-cream-dim">
                      Enviaremos o código de segurança para este e-mail no próximo passo.
                    </p>
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-cream mb-1">
                        Senha (mínimo 8 caracteres) *
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className={cn(
                            'w-full rounded-xl border bg-ink-sunken px-3.5 py-2.5 pr-10 text-sm text-cream placeholder:text-cream-dim/50 focus:outline-none transition-colors',
                            errors.password ? 'border-red-500 ring-1 ring-red-500' : 'border-line focus:border-brand'
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-dim hover:text-cream"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="mt-1 text-xs text-red-400">{errors.password}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-cream mb-1">
                        Confirmar Senha *
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className={cn(
                          'w-full rounded-xl border bg-ink-sunken px-3.5 py-2.5 text-sm text-cream placeholder:text-cream-dim/50 focus:outline-none transition-colors',
                          errors.confirmPassword
                            ? 'border-red-500 ring-1 ring-red-500'
                            : 'border-line focus:border-brand'
                        )}
                      />
                      {errors.confirmPassword && (
                        <p className="mt-1 text-xs text-red-400">{errors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-3.5 px-4 text-sm font-bold text-ink shadow-[0_12px_24px_-8px_hsl(var(--brand)/0.6)] hover:bg-brand-light active:scale-[0.99] transition-all disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Enviando código...</span>
                        </>
                      ) : (
                        <>
                          <span>Continuar para Verificação</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 1: CÓDIGO */}
              {step === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-5">
                  <div className="rounded-2xl border border-line bg-ink-sunken p-4 text-center">
                    <span className="font-mono text-xs text-brand-light uppercase tracking-wider">
                      Código de Verificação
                    </span>
                    <p className="mt-1.5 text-sm text-cream font-medium">
                      Enviamos um código de 6 dígitos para:
                    </p>
                    <p className="text-sm font-bold text-brand-light mt-0.5">{email}</p>
                    <p className="mt-2 text-xs text-cream-dim">
                      Verifique sua caixa de entrada e spam.
                    </p>
                  </div>

                  <div>
                    <label className="block text-center text-xs font-semibold text-cream mb-2">
                      Digite o código de 6 dígitos:
                    </label>
                    <input
                      type="text"
                      autoFocus
                      inputMode="numeric"
                      maxLength={6}
                      value={code}
                      onChange={(e) => setCode(onlyDigits(e.target.value))}
                      placeholder="000000"
                      className={cn(
                        'mx-auto block w-56 text-center font-mono text-3xl tracking-[0.4em] rounded-2xl border bg-ink-sunken px-4 py-3 text-cream placeholder:text-cream-dim/30 focus:outline-none transition-colors',
                        errors.code ? 'border-red-500 ring-1 ring-red-500' : 'border-brand'
                      )}
                    />
                    {errors.code && (
                      <p className="mt-1.5 text-center text-xs text-red-400">{errors.code}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-2 pt-1 text-xs">
                    <span className="text-cream-dim">Não recebeu o código?</span>
                    <button
                      type="button"
                      disabled={resendCooldown > 0 || isResending}
                      onClick={handleResendCode}
                      className="inline-flex items-center gap-1 font-semibold text-brand-light hover:underline disabled:opacity-50 disabled:no-underline"
                    >
                      {isResending ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin" />
                          <span>Reenviando...</span>
                        </>
                      ) : resendCooldown > 0 ? (
                        <span>Reenviar em {resendCooldown}s</span>
                      ) : (
                        <>
                          <RefreshCw className="h-3 w-3" />
                          <span>Reenviar código</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-ink-sunken py-3 px-4 text-xs font-semibold text-cream hover:bg-line transition-colors sm:w-1/3"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Voltar</span>
                    </button>

                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 rounded-xl bg-brand py-3 px-4 text-sm font-bold text-ink shadow-[0_12px_24px_-8px_hsl(var(--brand)/0.6)] hover:bg-brand-light active:scale-[0.99] transition-all sm:w-2/3"
                    >
                      <span>Continuar para o Plano</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: PLANO */}
              {step === 2 && (
                <form onSubmit={handleFinalSubmit} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-cream">Escolha o seu plano</h3>
                      <p className="text-xs text-cream-dim">
                        Preços oficiais e quantidade de Smart TVs liberadas
                      </p>
                    </div>

                    {initialTvCount && (
                      <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[11px] font-mono text-brand-light">
                        <Sparkles className="h-3 w-3" />
                        Sugerido para {initialTvCount} {initialTvCount === 1 ? 'TV' : 'TVs'}
                      </span>
                    )}
                  </div>

                  {plansLoading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                      <Loader2 className="h-8 w-8 animate-spin text-brand" />
                      <p className="mt-2 text-xs text-cream-dim">Carregando planos disponíveis...</p>
                    </div>
                  ) : plansError ? (
                    <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-center">
                      <p className="text-xs text-red-200">{plansError}</p>
                      <button
                        type="button"
                        onClick={() => {
                          setPlansLoading(true)
                          plusApi
                            .listPlans()
                            .then((res) => {
                              setPlans(res)
                              setSelectedPlanId(findMatchingPlanId(res, initialTvCount))
                              setPlansError(null)
                            })
                            .catch((err) => setPlansError(err.message))
                            .finally(() => setPlansLoading(false))
                        }}
                        className="mt-2 rounded-lg bg-brand px-3 py-1 text-xs font-semibold text-ink"
                      >
                        Tentar novamente
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2.5 max-h-[46vh] overflow-y-auto pr-1">
                      {plans.map((plan) => {
                        const isSelected = plan.id === selectedPlanId
                        const demo = isDemoPlan(plan)
                        const screens = planScreensLabel(plan)

                        return (
                          <div
                            key={plan.id}
                            onClick={() => setSelectedPlanId(plan.id)}
                            className={cn(
                              'group relative flex items-center justify-between rounded-2xl border p-4 cursor-pointer transition-all',
                              isSelected
                                ? 'border-brand bg-gradient-to-r from-brand/20 via-ink-sunken to-brand/5 shadow-[0_8px_20px_-8px_hsl(var(--brand)/0.5)] ring-1 ring-brand'
                                : 'border-line bg-ink-sunken hover:border-line hover:bg-ink-sunken/80'
                            )}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  'mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all',
                                  isSelected
                                    ? 'border-brand bg-brand text-ink'
                                    : 'border-cream-dim/40 bg-transparent'
                                )}
                              >
                                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                              </div>

                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-bold text-sm text-cream">{plan.name}</h4>
                                  {demo ? (
                                    <span className="rounded-full bg-signal px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink">
                                      Teste grátis
                                    </span>
                                  ) : (
                                    <span className="rounded-full border border-brand/30 bg-brand/10 px-2 py-0.5 font-mono text-[9px] font-bold text-brand-light">
                                      {screens}
                                    </span>
                                  )}
                                </div>

                                <p className="mt-1 text-xs text-cream-dim line-clamp-1">
                                  {plan.description ||
                                    (demo
                                      ? 'Teste todos os canais na sua Smart TV sem pagar nada agora.'
                                      : 'Todos os canais ao vivo, controle dos pais e liberação rápida.')}
                                </p>
                              </div>
                            </div>

                            <div className="text-right shrink-0 pl-3">
                              {demo ? (
                                <div>
                                  <span className="font-wide text-lg font-black text-signal">
                                    Grátis
                                  </span>
                                  <span className="block text-[10px] text-cream-dim">
                                    {plan.trial_days === 1 ? '1 dia' : `${plan.trial_days} dias`}
                                  </span>
                                </div>
                              ) : (
                                <div>
                                  <span className="font-wide text-lg font-black text-cream">
                                    R$ {plan.monthly_price.toFixed(2).replace('.', ',')}
                                  </span>
                                  <span className="block text-[10px] text-cream-dim">/ mês</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {errors.plan && <p className="text-xs text-red-400">{errors.plan}</p>}

                  {selectedPlan && (
                    <div className="rounded-xl border border-line bg-ink-sunken/60 p-3 text-xs text-cream-dim">
                      {isDemoPlan(selectedPlan) ? (
                        <p>
                          🎉 <strong>Plano de Teste Selecionado:</strong> Você terá acesso gratuito
                          por {selectedPlan.trial_days} dias liberado imediatamente após o cadastro.
                        </p>
                      ) : (
                        <p>
                          💳 <strong>Plano Selecionado:</strong> O pagamento via PIX é realizado com
                          segurança diretamente no painel do Plus após a conclusão.
                        </p>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setStep(1)}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-line bg-ink-sunken py-3 px-4 text-xs font-semibold text-cream hover:bg-line transition-colors sm:w-1/3 disabled:opacity-50"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" />
                      <span>Voltar</span>
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting || plansLoading || !selectedPlanId}
                      className="flex items-center justify-center gap-2 rounded-xl bg-signal py-3.5 px-4 text-sm font-bold text-ink shadow-[0_12px_24px_-8px_hsl(var(--signal)/0.5)] hover:brightness-110 active:scale-[0.99] transition-all sm:w-2/3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Finalizando cadastro...</span>
                        </>
                      ) : (
                        <>
                          <span>Finalizar Cadastro & Acessar</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>

        {/* Footer info & WhatsApp option */}
        <div className="border-t border-line/80 bg-ink-sunken/80 px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream-dim">
          <a
            href={SALES_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-cream-dim hover:text-brand-light transition-colors"
          >
            <MessageCircle className="h-3.5 w-3.5 text-signal" />
            <span>Prefiro falar com um atendente no WhatsApp</span>
          </a>

          <a
            href={`${PLUS_WEB_URL}/login/pessoa`}
            className="text-brand-light hover:underline font-semibold"
          >
            Já tem conta? Entrar
          </a>
        </div>
      </div>
    </div>
  )
}
