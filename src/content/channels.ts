export interface ChannelItem {
  name: string
  category: string
  logoSrc?: string
  quality?: string
}

export const CHANNEL_CATEGORIES = [
  'Todos',
  'Esportes',
  'Filmes & Séries',
  'Notícias',
  'Infantil',
  'Documentários',
  'TV Aberta',
] as const

export type ChannelCategory = (typeof CHANNEL_CATEGORIES)[number]

export const CHANNELS_DATA: ChannelItem[] = [
  // Esportes
  { name: 'ESPN', category: 'Esportes', logoSrc: '/channels/espn.jpg', quality: 'Full HD' },
  { name: 'Combate', category: 'Esportes', logoSrc: '/channels/combate.jpg', quality: 'Full HD' },
  { name: 'SporTV', category: 'Esportes', quality: 'Full HD' },
  { name: 'SporTV 2', category: 'Esportes', quality: 'Full HD' },
  { name: 'SporTV 3', category: 'Esportes', quality: 'Full HD' },
  { name: 'Premiere Clubes', category: 'Esportes', quality: 'Full HD' },
  { name: 'BandSports', category: 'Esportes', quality: 'Full HD' },
  { name: 'CazéTV', category: 'Esportes', quality: 'Full HD' },

  // Filmes & Séries
  { name: 'HBO', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'HBO 2', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Telecine Premium', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Telecine Action', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Telecine Pipoca', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Warner Channel', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'TNT', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Universal TV', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Sony Channel', category: 'Filmes & Séries', quality: 'Full HD' },

  // Notícias
  { name: 'GloboNews', category: 'Notícias', logoSrc: '/channels/globo-news.jpg', quality: 'Full HD' },
  { name: 'CNN Brasil', category: 'Notícias', logoSrc: '/channels/cnn-brasil.jpg', quality: 'Full HD' },
  { name: 'Jovem Pan News', category: 'Notícias', quality: 'Full HD' },
  { name: 'BandNews TV', category: 'Notícias', quality: 'Full HD' },
  { name: 'Record News', category: 'Notícias', quality: 'Full HD' },

  // Infantil
  { name: 'Cartoon Network', category: 'Infantil', logoSrc: '/channels/cartoon-network.jpg', quality: 'Full HD' },
  { name: 'Discovery Kids', category: 'Infantil', quality: 'Full HD' },
  { name: 'Nickelodeon', category: 'Infantil', quality: 'Full HD' },
  { name: 'Gloob', category: 'Infantil', quality: 'Full HD' },
  { name: 'Cartoonito', category: 'Infantil', quality: 'Full HD' },

  // Documentários
  { name: 'Animal Planet', category: 'Documentários', logoSrc: '/channels/animal-planet.jpg', quality: 'Full HD' },
  { name: 'Discovery Channel', category: 'Documentários', quality: 'Full HD' },
  { name: 'History Channel', category: 'Documentários', quality: 'Full HD' },
  { name: 'National Geographic', category: 'Documentários', quality: 'Full HD' },
  { name: 'Discovery Turbo', category: 'Documentários', quality: 'Full HD' },

  // TV Aberta
  { name: 'Record TV', category: 'TV Aberta', logoSrc: '/channels/record-tv.jpg', quality: 'Full HD' },
  { name: 'Globo HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'SBT HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'Band HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'RedeTV! HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'TV Cultura HD', category: 'TV Aberta', quality: 'Full HD' },
]

export const HIGHLIGHTS_RESIDENCIAL = [
  {
    icon: 'Tv',
    title: 'Grade 100% Liberada',
    desc: 'Sem canais bloqueados por pacotes adicionais. Você tem acesso a todos os canais contratados.',
  },
  {
    icon: 'Zap',
    title: 'Troca Rápida de Canais',
    desc: 'Navegação fluida sem telas pretas intermináveis e com carregamento instantâneo via HLS.',
  },
  {
    icon: 'Smile',
    title: 'Para Toda a Família',
    desc: 'Desenhos para as crianças, futebol ao vivo no fim de semana, novelas e filmes à noite.',
  },
]
