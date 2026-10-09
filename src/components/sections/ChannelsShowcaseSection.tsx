import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import {
  CHANNELS_DATA,
  CHANNEL_CATEGORIES,
  type ChannelCategory,
  HIGHLIGHTS_RESIDENCIAL,
} from '@/content/channels'
import { SALES_CONTACT_URL, SECTION_IDS } from '@/content/site'
import { cn } from '@/lib/cn'

export function ChannelsShowcaseSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<ChannelCategory>('Todos')

  const filteredChannels =
    selectedCategory === 'Todos'
      ? CHANNELS_DATA
      : CHANNELS_DATA.filter((ch) => ch.category === selectedCategory)

  return (
    <section
      id={SECTION_IDS.channels}
      className="relative overflow-hidden border-t border-line bg-ink py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-brand/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-site px-5 sm:px-8">
        <SectionHeader
          eyebrow="Somente Todos os Canais"
          titleId="channels-title"
          title="Toda a programação que sua família ama, reunida em um só lugar"
          description="Sem pegadinhas ou cobranças por pacotes extras de futebol ou filmes: você tem acesso direto à grade completa na sua Smart TV."
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

        {/* Barra de Filtro de Categorias */}
        <div className="mt-12 flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scroll-rail gap-2">
          {CHANNEL_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  'rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer border select-none',
                  isActive
                    ? 'border-brand bg-brand text-ink shadow-[0_8px_20px_-6px_hsl(var(--brand)/0.6)] font-bold'
                    : 'border-line bg-ink-raised text-cream-dim hover:text-cream hover:bg-line'
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Grade de Canais */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filteredChannels.map((channel) => (
            <div
              key={channel.name}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-line bg-ink-raised p-2.5 sm:p-3 transition-all duration-300 hover:border-brand/60 hover:shadow-[0_16px_36px_-12px_hsl(var(--brand)/0.35)] hover:-translate-y-1"
            >
              {/* Moldura da Logo com fundo branco para contraste total e nitidez */}
              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/5">
                <img
                  src={channel.logoSrc}
                  alt={`Logotipo ${channel.name}`}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain filter group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Informações do Canal */}
              <div className="mt-2.5 px-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-semibold text-xs text-cream truncate">
                    {channel.name}
                  </h4>
                  <span className="font-mono text-[9px] font-bold text-signal shrink-0">
                    {channel.quality || 'Full HD'}
                  </span>
                </div>
                <p className="text-[11px] text-cream-dim truncate mt-0.5">
                  {channel.category}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chamada Final da Seção de Canais */}
        <div className="mt-12 rounded-2xl border border-brand/30 bg-gradient-to-r from-brand/10 via-ink-raised to-brand/10 p-6 text-center sm:p-8">
          <h3 className="font-wide text-xl font-bold text-cream sm:text-2xl">
            Procurando um canal específico para sua TV?
          </h3>
          <p className="mt-2 text-sm text-cream-dim max-w-xl mx-auto">
            Temos uma grade completa com centenas de canais abertos e fechados de esportes, filmes e notícias.
            Consulte a lista completa com nossa equipe.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ButtonLink
              href={SALES_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="md"
            >
              Consultar Grade Completa no WhatsApp
            </ButtonLink>
            <ButtonLink
              href="#calculadora"
              variant="secondary"
              size="md"
            >
              Simular Preço (1 a 5 TVs)
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
