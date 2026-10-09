export interface TvPlanOption {
  tvCount: number
  price: number
  priceFormatted: string
  pricePerTvFormatted: string
  label: string
  roomSuggestion: string
  rooms: string[]
  badge?: string
  cableComparisonPrice: number // Preço médio de TV a cabo tradicional com essa quantidade de pontos
}

export const BASE_TV_PRICE = 25.0
export const EXTRA_TV_PRICE = 18.0
export const MAX_TVS = 5

export function calculatePrice(tvCount: number): number {
  const count = Math.min(Math.max(1, tvCount), MAX_TVS)
  return BASE_TV_PRICE + (count - 1) * EXTRA_TV_PRICE
}

export const TV_PLANS: TvPlanOption[] = [
  {
    tvCount: 1,
    price: 25.0,
    priceFormatted: 'R$ 25,00',
    pricePerTvFormatted: 'R$ 25,00',
    label: '1 Smart TV',
    roomSuggestion: 'Sala de Estar',
    rooms: ['Sala Principal'],
    cableComparisonPrice: 140.0,
  },
  {
    tvCount: 2,
    price: 43.0,
    priceFormatted: 'R$ 43,00',
    pricePerTvFormatted: 'R$ 21,50',
    label: '2 Smart TVs',
    roomSuggestion: 'Sala + Quarto Casal',
    rooms: ['Sala Principal', 'Quarto do Casal'],
    badge: 'Mais Escolhido',
    cableComparisonPrice: 185.0,
  },
  {
    tvCount: 3,
    price: 61.0,
    priceFormatted: 'R$ 61,00',
    pricePerTvFormatted: 'R$ 20,33',
    label: '3 Smart TVs',
    roomSuggestion: 'Sala + 2 Quartos',
    rooms: ['Sala Principal', 'Quarto do Casal', 'Quarto dos Filhos'],
    badge: 'Melhor Custo-Benefício',
    cableComparisonPrice: 230.0,
  },
  {
    tvCount: 4,
    price: 79.0,
    priceFormatted: 'R$ 79,00',
    pricePerTvFormatted: 'R$ 19,75',
    label: '4 Smart TVs',
    roomSuggestion: 'Sala + Quartos + Espaço Gourmet',
    rooms: ['Sala Principal', 'Quarto Casal', 'Quarto Filhos', 'Espaço Gourmet / Churrasqueira'],
    cableComparisonPrice: 275.0,
  },
  {
    tvCount: 5,
    price: 97.0,
    priceFormatted: 'R$ 97,00',
    pricePerTvFormatted: 'R$ 19,40',
    label: '5 Smart TVs',
    roomSuggestion: 'Casa Completa',
    rooms: ['Sala Principal', 'Quarto Casal', 'Quarto 2', 'Quarto 3 / Hóspedes', 'Espaço Gourmet / Cozinha'],
    badge: 'Economia Máxima',
    cableComparisonPrice: 320.0,
  },
]

export const PLAN_BENEFITS = [
  {
    title: 'Somente Todos os Canais',
    description: 'Esportes, filmes, infantis, notícias e variedades abertos e fechados em uma única grade.',
  },
  {
    title: 'Transmissões Simultâneas',
    description: 'Cada TV assiste o que quiser ao mesmo tempo, sem interferir na outra tela.',
  },
  {
    title: 'Qualidade Full HD & 4K',
    description: 'Imagem cristalina e som estéreo de alta fidelidade sem antenas ou quedas com chuva.',
  },
  {
    title: 'Sem Aparelhos Extras',
    description: 'Funciona direto no navegador da Smart TV. Sem caixinhas, cabos pretos ou fios soltos.',
  },
  {
    title: 'Ativação Instantânea via PIN',
    description: 'Abriu a TV, pegou o PIN na tela, ativou. Pronto em menos de 1 minuto.',
  },
  {
    title: 'Zero Fidelidade',
    description: 'Sem contrato de 12 meses, sem multa rescisória. Assine e cancele quando desejar.',
  },
]

export function buildWhatsAppUrl(tvCount: number): string {
  const plan = TV_PLANS.find((p) => p.tvCount === tvCount) || TV_PLANS[0]
  const text = encodeURIComponent(
    `Olá! Quero assinar o Plus TV para ${plan.tvCount} ${plan.tvCount === 1 ? 'TV' : 'TVs'} na minha casa (${plan.priceFormatted}/mês). Como faço para ativar na minha Smart TV?`
  )
  return `https://wa.me/5511999999999?text=${text}`
}
