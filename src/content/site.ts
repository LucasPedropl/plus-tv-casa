export const SITE_NAME = 'Plus TV'
export const SITE_TAGLINE = 'Todos os canais ao vivo direto na TV da sua casa'
export const SITE_DESCRIPTION =
  'Esportes, filmes, séries, desenhos e notícias na sua Smart TV sem antenas, sem aparelhos e sem fidelidade. De 1 a 5 TVs na mesma casa a partir de R$ 25,00/mês.'

export const SALES_WHATSAPP_RAW = '5531993585185'
export const SALES_WHATSAPP_DISPLAY = '(31) 9358-5185'
export const SALES_CONTACT_URL =
  'https://wa.me/5531993585185?text=' +
  encodeURIComponent('Olá! Gostaria de assinar o Plus TV para minha casa.')

export const APP_TV_CONNECT_URL = 'https://plus.bixs.com.br/tv'

export const SECTION_IDS = {
  hero: 'inicio',
  plans: 'precos',
  calculator: 'calculadora',
  channels: 'canais',
  howItWorks: 'como-funciona',
  compatibility: 'compatibilidade',
  faq: 'duvidas',
} as const

export const NAV_ITEMS = [
  { label: 'Canais', href: `#${SECTION_IDS.channels}` },
  { label: 'Calculadora & Preços', href: `#${SECTION_IDS.plans}` },
  { label: 'Como Funciona', href: `#${SECTION_IDS.howItWorks}` },
  { label: 'TVs Compatíveis', href: `#${SECTION_IDS.compatibility}` },
  { label: 'Dúvidas', href: `#${SECTION_IDS.faq}` },
]
