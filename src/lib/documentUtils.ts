export function onlyDigits(value: string): string {
  return value.replace(/\D/g, '')
}

export function formatCpf(value: string): string {
  const digits = onlyDigits(value).slice(0, 11)
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

function calcCpfCheckDigit(base: string, factor: number): number {
  let sum = 0
  for (let i = 0; i < base.length; i += 1) {
    sum += Number(base[i]) * (factor - i)
  }
  const mod = (sum * 10) % 11
  return mod === 10 ? 0 : mod
}

export function isValidCpf(value: string): boolean {
  const cpf = onlyDigits(value)
  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false
  const d1 = calcCpfCheckDigit(cpf.slice(0, 9), 10)
  if (d1 !== Number(cpf[9])) return false
  const d2 = calcCpfCheckDigit(cpf.slice(0, 10), 11)
  return d2 === Number(cpf[10])
}

export function formatPhone(value: string): string {
  let raw = onlyDigits(value)
  if (raw.startsWith('55') && (raw.length === 12 || raw.length === 13)) {
    raw = raw.slice(2)
  }
  const digits = raw.slice(0, 11)
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
  return digits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

export function formatPhoneForApi(value: string): string {
  const digits = onlyDigits(value)
  if (digits.startsWith('55') && (digits.length === 12 || digits.length === 13)) {
    return digits
  }
  return `55${digits}`
}
