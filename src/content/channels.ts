export interface ChannelItem {
  name: string
  category: string
  logoSrc: string
  quality: string
}

export const CHANNEL_CATEGORIES = [
  'Todos',
  'Esportes',
  'Filmes & Séries',
  'Notícias',
  'Infantil',
  'Documentários',
  'Variedades',
  'TV Aberta',
] as const

export type ChannelCategory = (typeof CHANNEL_CATEGORIES)[number]

export const CHANNELS_DATA: ChannelItem[] = [
  // Esportes
  { name: 'ESPN', category: 'Esportes', logoSrc: '/channels/espn.jpg', quality: 'Full HD' },
  { name: 'SporTV', category: 'Esportes', logoSrc: '/channels/sportv.png', quality: 'Full HD' },
  { name: 'Combate', category: 'Esportes', logoSrc: '/channels/combate.jpg', quality: 'Full HD' },

  // Filmes & Séries
  { name: 'HBO', category: 'Filmes & Séries', logoSrc: '/channels/hbo.svg', quality: 'Full HD' },
  { name: 'Telecine', category: 'Filmes & Séries', logoSrc: '/channels/telecine.png', quality: 'Full HD' },
  { name: 'Warner Channel', category: 'Filmes & Séries', logoSrc: '/channels/warner.png', quality: 'Full HD' },
  { name: 'Megapix', category: 'Filmes & Séries', logoSrc: '/channels/megapix.png', quality: 'Full HD' },

  // Notícias
  { name: 'GloboNews', category: 'Notícias', logoSrc: '/channels/globo-news.jpg', quality: 'Full HD' },
  { name: 'CNN Brasil', category: 'Notícias', logoSrc: '/channels/cnn-brasil.jpg', quality: 'Full HD' },

  // Infantil
  { name: 'Cartoon Network', category: 'Infantil', logoSrc: '/channels/cartoon-network.jpg', quality: 'Full HD' },
  { name: 'Discovery Kids', category: 'Infantil', logoSrc: '/channels/discovery-kids.png', quality: 'Full HD' },
  { name: 'Gloob', category: 'Infantil', logoSrc: '/channels/gloob.png', quality: 'Full HD' },
  { name: 'Nickelodeon', category: 'Infantil', logoSrc: '/channels/nickelodeon.png', quality: 'Full HD' },

  // Documentários
  { name: 'Animal Planet', category: 'Documentários', logoSrc: '/channels/animal-planet.jpg', quality: 'Full HD' },
  { name: 'National Geographic', category: 'Documentários', logoSrc: '/channels/natgeo.png', quality: 'Full HD' },

  // Variedades
  { name: 'GNT', category: 'Variedades', logoSrc: '/channels/gnt.jpg', quality: 'Full HD' },
  { name: 'Multishow', category: 'Variedades', logoSrc: '/channels/multishow.png', quality: 'Full HD' },
  { name: 'Canal Viva', category: 'Variedades', logoSrc: '/channels/viva.png', quality: 'Full HD' },

  // TV Aberta
  { name: 'Globo HD', category: 'TV Aberta', logoSrc: '/channels/globo.png', quality: 'Full HD' },
  { name: 'Record TV HD', category: 'TV Aberta', logoSrc: '/channels/record-tv.jpg', quality: 'Full HD' },
  { name: 'SBT HD', category: 'TV Aberta', logoSrc: '/channels/sbt.png', quality: 'Full HD' },
  { name: 'Band HD', category: 'TV Aberta', logoSrc: '/channels/band.png', quality: 'Full HD' },
]

export const HIGHLIGHTS_RESIDENCIAL = [
  {
    title: 'Grade 100% Liberada',
    desc: 'Sem canais bloqueados por pacotes adicionais. Você tem acesso a todos os canais contratados.',
  },
  {
    title: 'Troca Rápida de Canais',
    desc: 'Navegação fluida sem telas pretas intermináveis e com carregamento instantâneo via HLS.',
  },
  {
    title: 'Para Toda a Família',
    desc: 'Desenhos para as crianças, futebol ao vivo no fim de semana, novelas e filmes à noite.',
  },
]
