import { useState, useMemo } from 'react'
import {
  Sparkles,
  Search,
  X,
  Tv,
  Film,
  Trophy,
  Smile,
  Newspaper,
  Compass,
  Music,
  SlidersHorizontal,
  Flame,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import {
  CHANNELS_DATA,
  CHANNEL_CATEGORIES,
  type ChannelCategory,
  HIGHLIGHTS_RESIDENCIAL,
  TOTAL_CHANNELS_COUNT,
  type ChannelItem,
} from '@/content/channels'
import { SALES_CONTACT_URL, SECTION_IDS } from '@/content/site'
import { cn } from '@/lib/cn'

type ViewMode = 'all' | 'featured'

function getCategoryIcon(category: string) {
  switch (category) {
    case 'Esportes':
      return <Trophy className="h-4 w-4 text-emerald-400" />
    case 'Filmes & Séries':
      return <Film className="h-4 w-4 text-purple-400" />
    case 'Infantil':
      return <Smile className="h-4 w-4 text-amber-400" />
    case 'Notícias':
      return <Newspaper className="h-4 w-4 text-sky-400" />
    case 'Documentários':
      return <Compass className="h-4 w-4 text-teal-400" />
    case 'Variedades':
      return <Sparkles className="h-4 w-4 text-pink-400" />
    case 'TV Aberta':
      return <Tv className="h-4 w-4 text-amber-300" />
    case 'Música':
      return <Music className="h-4 w-4 text-fuchsia-400" />
    default:
      return <Tv className="h-4 w-4 text-brand-light" />
  }
}

function getCategoryGradient(category: string) {
  switch (category) {
    case 'Esportes':
      return 'from-emerald-950/60 to-emerald-900/20 border-emerald-500/20 text-emerald-300'
    case 'Filmes & Séries':
      return 'from-purple-950/60 to-purple-900/20 border-purple-500/20 text-purple-300'
    case 'Infantil':
      return 'from-amber-950/60 to-amber-900/20 border-amber-500/20 text-amber-300'
    case 'Notícias':
      return 'from-sky-950/60 to-sky-900/20 border-sky-500/20 text-sky-300'
    case 'Documentários':
      return 'from-teal-950/60 to-teal-900/20 border-teal-500/20 text-teal-300'
    case 'Variedades':
      return 'from-pink-950/60 to-pink-900/20 border-pink-500/20 text-pink-300'
    case 'TV Aberta':
      return 'from-orange-950/60 to-orange-900/20 border-orange-500/20 text-orange-300'
    case 'Música':
      return 'from-fuchsia-950/60 to-fuchsia-900/20 border-fuchsia-500/20 text-fuchsia-300'
    default:
      return 'from-brand/20 to-brand/5 border-brand/20 text-brand-light'
  }
}

export function ChannelsShowcaseSection() {
  const [viewMode, setViewMode] = useState<ViewMode>('all')
  const [selectedCategory, setSelectedCategory] =
    useState<ChannelCategory>('Todos')
  const [searchQuery, setSearchQuery] = useState('')

  // Canais filtrados por visualização, categoria e texto de busca
  const filteredChannels = useMemo(() => {
    let list = CHANNELS_DATA

    // Se estiver no modo apenas destaques principais (marcas locais)
    if (viewMode === 'featured') {
      list = list.filter((ch) => ch.featured)
    }

    // Filtro de categoria
    if (selectedCategory !== 'Todos') {
      list = list.filter((ch) => ch.category === selectedCategory)
    }

    // Filtro de busca textual
    const q = searchQuery.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (ch) =>
          ch.name.toLowerCase().includes(q) ||
          ch.category.toLowerCase().includes(q)
      )
    }

    return list
  }, [viewMode, selectedCategory, searchQuery])

  // Contagem de canais por categoria para exibir nos badges
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      Todos: CHANNELS_DATA.length,
    }
    for (const ch of CHANNELS_DATA) {
      counts[ch.category] = (counts[ch.category] || 0) + 1
    }
    return counts
  }, [])

  return (
    <section
      id={SECTION_IDS.channels}
      className="relative overflow-hidden border-t border-line bg-ink py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-brand/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-site px-4 sm:px-8">
        <SectionHeader
          eyebrow={`Grade 100% Liberada · ${TOTAL_CHANNELS_COUNT} Canais`}
          titleId="channels-title"
          title="Toda a programação que sua família ama, reunida em um só lugar"
          description="Sem pegadinhas ou cobranças por pacotes extras de futebol ou filmes: você tem acesso direto à grade completa com mais de 140 canais em alta definição na sua Smart TV."
          alignment="center"
        />

        {/* 3 Destaques Rápidos */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {HIGHLIGHTS_RESIDENCIAL.map((h) => (
            <div
              key={h.title}
              className="flex items-start gap-3 rounded-xl border border-line bg-ink-raised/60 p-4"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand-light">
                <Sparkles className="h-5 w-5" />
              </span>
              <div>
                <h4 className="font-bold text-sm text-cream">{h.title}</h4>
                <p className="mt-1 text-xs text-cream-dim leading-relaxed">{h.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Painel de Controle de Navegação de Canais */}
        <div className="mt-12 rounded-3xl border border-brand/30 bg-ink-raised/70 p-4 sm:p-6 shadow-2xl backdrop-blur-md">
          {/* Barra Superior: Modos de Visualização & Busca */}
          <div className="flex flex-col gap-3.5 md:flex-row md:items-center md:justify-between">
            {/* Seletor de Modo (Grade Completa vs Destaques) */}
            <div className="inline-flex rounded-xl border border-line bg-ink-sunken p-1 select-none">
              <button
                type="button"
                onClick={() => setViewMode('all')}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer',
                  viewMode === 'all'
                    ? 'bg-brand text-ink shadow-[0_4px_12px_hsl(var(--brand)/0.5)]'
                    : 'text-cream-dim hover:text-cream hover:bg-line/40'
                )}
              >
                <Flame className="h-3.5 w-3.5" />
                <span>Grade Completa ({TOTAL_CHANNELS_COUNT})</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode('featured')}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer',
                  viewMode === 'featured'
                    ? 'bg-brand text-ink shadow-[0_4px_12px_hsl(var(--brand)/0.5)]'
                    : 'text-cream-dim hover:text-cream hover:bg-line/40'
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Destaques Principais (22)</span>
              </button>
            </div>

            {/* Campo de Busca em Tempo Real */}
            <div className="relative flex-1 md:max-w-xs lg:max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-cream-dim" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar canal ou categoria..."
                aria-label="Buscar canais disponíveis"
                className="w-full rounded-xl border border-line bg-ink-sunken py-2 pl-9 pr-9 text-xs font-medium text-cream placeholder-cream-dim/60 focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpar busca"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cream-dim hover:text-cream"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          {/* Barra de Filtro de Categorias (Scroll Horizontal Suave) */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 pt-1 scroll-rail select-none">
            {CHANNEL_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat
              const count = categoryCounts[cat] || 0
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border',
                    isActive
                      ? 'border-brand bg-brand/20 text-brand-light font-bold shadow-sm ring-1 ring-brand/40'
                      : 'border-line bg-ink-sunken/80 text-cream-dim hover:text-cream hover:bg-line'
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={cn(
                      'rounded-full px-1.5 py-0.2 font-mono text-[10px] font-bold',
                      isActive ? 'bg-brand text-ink' : 'bg-ink-raised text-cream-dim'
                    )}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Informações e contador do catálogo */}
          <div className="mt-3 flex items-center justify-between border-t border-line/50 pt-3 text-xs text-cream-dim">
            <span className="flex items-center gap-1.5">
              <SlidersHorizontal className="h-3.5 w-3.5 text-brand-light" />
              Mostrando <strong>{filteredChannels.length}</strong> de{' '}
              {TOTAL_CHANNELS_COUNT} canais
              {selectedCategory !== 'Todos' && ` em "${selectedCategory}"`}
              {searchQuery && ` para "${searchQuery}"`}
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] text-cream-dim/80">
              Role a grade interna para ver todos ↓
            </span>
          </div>

          {/* Área da Grade de Canais com ROLAGEM INTERNA Compacta (Sem ocupar a página toda) */}
          <div className="mt-4 max-h-[480px] sm:max-h-[520px] overflow-y-auto pr-1.5 scroll-rail rounded-2xl border border-line/60 bg-ink-sunken/40 p-2 sm:p-3">
            {filteredChannels.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center text-cream-dim">
                <Search className="h-8 w-8 text-cream-dim/40 mb-3" />
                <p className="text-sm font-semibold text-cream">Nenhum canal encontrado</p>
                <p className="text-xs text-cream-dim mt-1 max-w-sm">
                  Não encontramos nenhum canal com o termo "{searchQuery}". Tente buscar por outra emissora ou categoria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('Todos')
                  }}
                  className="mt-4 rounded-lg border border-line bg-ink-raised px-4 py-2 text-xs font-semibold text-cream hover:bg-line cursor-pointer"
                >
                  Limpar Filtros e Ver Todos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {filteredChannels.map((channel) => (
                  <ChannelCard key={channel.name} channel={channel} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chamada Final da Seção de Canais */}
        <div className="mt-12 rounded-2xl border border-brand/30 bg-gradient-to-r from-brand/10 via-ink-raised to-brand/10 p-6 text-center sm:p-8">
          <h3 className="font-wide text-xl font-bold text-cream sm:text-2xl">
            Procurando um canal específico para sua TV?
          </h3>
          <p className="mt-2 text-sm text-cream-dim max-w-xl mx-auto">
            Temos uma grade completa com mais de 140 canais abertos e fechados de esportes, filmes, infantis e notícias.
            Consulte a lista completa com nossa equipe.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href={SALES_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
              className="w-full sm:w-auto"
            >
              Consultar Grade Completa no WhatsApp
            </ButtonLink>
            <ButtonLink
              href="#calculadora"
              variant="secondary"
              size="md"
              className="w-full sm:w-auto"
            >
              Simular Preço (1 a 5 TVs)
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChannelCard({ channel }: { channel: ChannelItem }) {
  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-line/80 bg-ink-raised p-2 sm:p-2.5 transition-all duration-200 hover:border-brand/60 hover:shadow-[0_12px_28px_-10px_hsl(var(--brand)/0.35)] hover:-translate-y-0.5">
      {/* Moldura da Logo: Se tem logoSrc local usa container branco com imagem; senão usa badge estilizado */}
      {channel.logoSrc ? (
        <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-lg bg-white p-2.5 shadow-sm ring-1 ring-black/5">
          <img
            src={channel.logoSrc}
            alt={`Logotipo ${channel.name}`}
            loading="lazy"
            className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      ) : (
        <div
          className={cn(
            'relative flex aspect-[16/10] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-gradient-to-br p-2 text-center shadow-inner transition-transform group-hover:scale-102',
            getCategoryGradient(channel.category)
          )}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 backdrop-blur-sm shadow-sm mb-1">
            {getCategoryIcon(channel.category)}
          </div>
          <span className="font-bold text-[11px] text-white line-clamp-1 px-1">
            {channel.name}
          </span>
        </div>
      )}

      {/* Informações do Canal */}
      <div className="mt-2 px-1">
        <div className="flex items-center justify-between gap-1">
          <h4
            className="font-bold text-xs text-cream truncate"
            title={channel.name}
          >
            {channel.name}
          </h4>
          <span className="font-mono text-[9px] font-bold text-signal shrink-0">
            {channel.quality || 'Full HD'}
          </span>
        </div>
        <p className="text-[10px] text-cream-dim truncate mt-0.5 flex items-center gap-1">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-light/60" />
          {channel.category}
        </p>
      </div>
    </div>
  )
}
