export interface ChannelItem {
  name: string
  category: string
  logoSrc?: string
  quality: string
  featured?: boolean
}

export const CHANNEL_CATEGORIES = [
  'Todos',
  'Esportes',
  'Filmes & Séries',
  'Infantil',
  'Notícias',
  'Documentários',
  'Variedades',
  'TV Aberta',
  'Música',
] as const

export type ChannelCategory = (typeof CHANNEL_CATEGORIES)[number]

/**
 * Grade completa de canais residenciais do Plus TV.
 * Sincronizada com o catálogo IPTV da plataforma (mais de 140 canais liberados).
 */
export const CHANNELS_DATA: ChannelItem[] = [
  // ==========================================
  // ESPORTES (20 canais)
  // ==========================================
  { name: 'SporTV HD', category: 'Esportes', logoSrc: '/channels/sportv.png', quality: 'Full HD', featured: true },
  { name: 'SporTV 2 HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'SporTV 3 HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'ESPN HD', category: 'Esportes', logoSrc: '/channels/espn.jpg', quality: 'Full HD', featured: true },
  { name: 'ESPN 2 HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'ESPN 3 HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'ESPN 4 HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'Combate HD', category: 'Esportes', logoSrc: '/channels/combate.jpg', quality: 'Full HD', featured: true },
  { name: 'Premiere Clubes HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'Premiere 2 HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'Premiere 3 HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'Premiere 4 HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'Premiere 5 HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'Premiere 6 HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'BandSports HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'CazéTV HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'NBA TV Brasil', category: 'Esportes', quality: 'Full HD' },
  { name: 'DAZN Brasil HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'Nosso Futebol HD', category: 'Esportes', quality: 'Full HD' },
  { name: 'Fish TV HD', category: 'Esportes', quality: 'Full HD' },

  // ==========================================
  // FILMES & SÉRIES (34 canais)
  // ==========================================
  { name: 'HBO HD', category: 'Filmes & Séries', logoSrc: '/channels/hbo.svg', quality: 'Full HD', featured: true },
  { name: 'HBO 2 HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'HBO Plus HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'HBO Family HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'HBO Signature HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Telecine Premium HD', category: 'Filmes & Séries', logoSrc: '/channels/telecine.png', quality: 'Full HD', featured: true },
  { name: 'Telecine Action HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Telecine Touch HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Telecine Pipoca HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Telecine Cult HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Telecine Fun HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Warner Channel HD', category: 'Filmes & Séries', logoSrc: '/channels/warner.png', quality: 'Full HD', featured: true },
  { name: 'Megapix HD', category: 'Filmes & Séries', logoSrc: '/channels/megapix.png', quality: 'Full HD', featured: true },
  { name: 'TNT HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'TNT Séries HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'TNT Novelas HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Space HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Cinemax HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Universal TV HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'USA Network HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Sony Channel HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'AXN HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'A&E HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Paramount Network HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'AMC HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Studio Universal HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'TCM Clássicos HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Canal Brasil HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'FX HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Star Channel HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Eurochannel HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Curta! HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Cine Canal HD', category: 'Filmes & Séries', quality: 'Full HD' },
  { name: 'Adrenalina Pura TV', category: 'Filmes & Séries', quality: 'Full HD' },

  // ==========================================
  // INFANTIL (18 canais)
  // ==========================================
  { name: 'Cartoon Network HD', category: 'Infantil', logoSrc: '/channels/cartoon-network.jpg', quality: 'Full HD', featured: true },
  { name: 'Discovery Kids HD', category: 'Infantil', logoSrc: '/channels/discovery-kids.png', quality: 'Full HD', featured: true },
  { name: 'Gloob HD', category: 'Infantil', logoSrc: '/channels/gloob.png', quality: 'Full HD', featured: true },
  { name: 'Nickelodeon HD', category: 'Infantil', logoSrc: '/channels/nickelodeon.png', quality: 'Full HD', featured: true },
  { name: 'Disney Channel HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'Disney Junior HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'Cartoonito HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'Nick Jr. HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'Gloobinho HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'TV Rá-Tim-Bum HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'Baby TV HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'BabyFirst Brasil', category: 'Infantil', quality: 'Full HD' },
  { name: 'Tooncast HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'Boomerang HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'ZooMoo Kids HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'Box Kids TV HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'Luccas Toon HD', category: 'Infantil', quality: 'Full HD' },
  { name: 'Anime TV HD', category: 'Infantil', quality: 'Full HD' },

  // ==========================================
  // NOTÍCIAS (15 canais)
  // ==========================================
  { name: 'GloboNews HD', category: 'Notícias', logoSrc: '/channels/globo-news.jpg', quality: 'Full HD', featured: true },
  { name: 'CNN Brasil HD', category: 'Notícias', logoSrc: '/channels/cnn-brasil.jpg', quality: 'Full HD', featured: true },
  { name: 'BandNews TV HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'Record News HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'Jovem Pan News HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'BM&C News HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'AgroMais News HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'Canal Rural HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'Terraviva HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'Canal Gov HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'TV Justiça HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'TV Senado HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'TV Câmara HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'Bloomberg TV HD', category: 'Notícias', quality: 'Full HD' },
  { name: 'BBC News Brasil', category: 'Notícias', quality: 'Full HD' },

  // ==========================================
  // DOCUMENTÁRIOS (14 canais)
  // ==========================================
  { name: 'Animal Planet HD', category: 'Documentários', logoSrc: '/channels/animal-planet.jpg', quality: 'Full HD', featured: true },
  { name: 'National Geographic HD', category: 'Documentários', logoSrc: '/channels/natgeo.png', quality: 'Full HD', featured: true },
  { name: 'Nat Geo Wild HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'Discovery Channel HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'Discovery Turbo HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'Discovery Science HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'Discovery World HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'Discovery Theater HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'History Channel HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'History 2 HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'ID Investigação Discovery HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'Film&Arts HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'Arte 1 HD', category: 'Documentários', quality: 'Full HD' },
  { name: 'Travel Box Brazil HD', category: 'Documentários', quality: 'Full HD' },

  // ==========================================
  // VARIEDADES & ENTRETENIMENTO (18 canais)
  // ==========================================
  { name: 'GNT HD', category: 'Variedades', logoSrc: '/channels/gnt.jpg', quality: 'Full HD', featured: true },
  { name: 'Multishow HD', category: 'Variedades', logoSrc: '/channels/multishow.png', quality: 'Full HD', featured: true },
  { name: 'Canal Viva HD', category: 'Variedades', logoSrc: '/channels/viva.png', quality: 'Full HD', featured: true },
  { name: 'Canal Off HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Discovery Home & Health HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'TLC HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Food Network HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'E! Entertainment HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Lifetime HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Comedy Central HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'HGTV HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Woohoo HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Fashion TV HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Chef TV HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Sabor & Arte HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Glitz* HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Like HD', category: 'Variedades', quality: 'Full HD' },
  { name: 'Shoptime HD', category: 'Variedades', quality: 'Full HD' },

  // ==========================================
  // TV ABERTA (16 canais)
  // ==========================================
  { name: 'Globo HD', category: 'TV Aberta', logoSrc: '/channels/globo.png', quality: 'Full HD', featured: true },
  { name: 'Record TV HD', category: 'TV Aberta', logoSrc: '/channels/record-tv.jpg', quality: 'Full HD', featured: true },
  { name: 'SBT HD', category: 'TV Aberta', logoSrc: '/channels/sbt.png', quality: 'Full HD', featured: true },
  { name: 'Band HD', category: 'TV Aberta', logoSrc: '/channels/band.png', quality: 'Full HD', featured: true },
  { name: 'RedeTV! HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'TV Cultura HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'TV Gazeta HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'RedeVida HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'TV Aparecida HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'TV Brasil HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'Canal Futura HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'Rede Século 21 HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'RIT TV HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'Ideal TV HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'TV Canção Nova HD', category: 'TV Aberta', quality: 'Full HD' },
  { name: 'Rede CNT HD', category: 'TV Aberta', quality: 'Full HD' },

  // ==========================================
  // MÚSICA (12 canais)
  // ==========================================
  { name: 'MTV Brasil HD', category: 'Música', quality: 'Full HD' },
  { name: 'MTV Live HD', category: 'Música', quality: 'Full HD' },
  { name: 'MTV 00s HD', category: 'Música', quality: 'Full HD' },
  { name: 'Bis HD', category: 'Música', quality: 'Full HD' },
  { name: 'Trace Brazuca HD', category: 'Música', quality: 'Full HD' },
  { name: 'Music Box Brazil HD', category: 'Música', quality: 'Full HD' },
  { name: 'KISS TV HD', category: 'Música', quality: 'Full HD' },
  { name: 'Sertanejo Pop HD', category: 'Música', quality: 'Full HD' },
  { name: 'Top Hits Brasil HD', category: 'Música', quality: 'Full HD' },
  { name: 'Mega Hits HD', category: 'Música', quality: 'Full HD' },
  { name: 'VH1 Classic HD', category: 'Música', quality: 'Full HD' },
  { name: 'Flashback Brasil HD', category: 'Música', quality: 'Full HD' },
]

export const TOTAL_CHANNELS_COUNT = CHANNELS_DATA.length

export const HIGHLIGHTS_RESIDENCIAL = [
  {
    title: 'Mais de 140 Canais Liberados',
    desc: 'Sem canais bloqueados por pacotes adicionais. Você tem acesso à grade completa desde a 1ª TV.',
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
