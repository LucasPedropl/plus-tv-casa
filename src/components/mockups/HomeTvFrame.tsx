import { useState } from 'react'
import { Volume2, Maximize, Radio, Flame } from 'lucide-react'
import { cn } from '@/lib/cn'

interface HomeTvChannelPreview {
  id: string
  name: string
  category: string
  program: string
  timeInfo: string
  badgeColor: string
  accentGradient: string
  bgVisual: 'sports' | 'movie' | 'cartoon'
}

const PREVIEW_CHANNELS: HomeTvChannelPreview[] = [
  {
    id: 'espn',
    name: 'ESPN Brasil',
    category: 'Esportes',
    program: 'Campeonato Inglês: Arsenal x Chelsea (Ao Vivo)',
    timeInfo: '2º Tempo · 68\'',
    badgeColor: 'bg-red-600',
    accentGradient: 'from-emerald-950 via-slate-900 to-black',
    bgVisual: 'sports',
  },
  {
    id: 'hbo',
    name: 'HBO Max Films',
    category: 'Filmes & Séries',
    program: 'Duna: Parte 2 (Áudio 5.1 · 4K HDR)',
    timeInfo: '1h 42m restantes',
    badgeColor: 'bg-indigo-600',
    accentGradient: 'from-amber-950/70 via-stone-900 to-black',
    bgVisual: 'movie',
  },
  {
    id: 'cartoon',
    name: 'Cartoon Network',
    category: 'Infantil',
    program: 'O Incrível Mundo de Gumball (Temporada 6)',
    timeInfo: 'Episódio Especial',
    badgeColor: 'bg-cyan-600',
    accentGradient: 'from-sky-950 via-indigo-950 to-black',
    bgVisual: 'cartoon',
  },
]

interface HomeTvFrameProps {
  className?: string
  currentRoom?: string
  pairingPin?: string
}

export function HomeTvFrame({
  className,
  currentRoom = 'Sala Principal',
  pairingPin = '7392',
}: HomeTvFrameProps) {
  const [activeChannelIdx, setActiveChannelIdx] = useState(0)
  const channel = PREVIEW_CHANNELS[activeChannelIdx]

  return (
    <figure className={cn('relative w-full select-none', className)}>
      {/* Moldura da Smart TV */}
      <div className="relative rounded-[1.25rem] bg-ink-sunken p-[1.2%] shadow-[0_45px_90px_-25px_hsl(var(--brand)/0.4)] ring-1 ring-line/80">
        {/* Tela da TV */}
        <div className="tv-viewport relative aspect-video overflow-hidden rounded-lg bg-black">
          {/* Fundo simulando a transmissão */}
          <div
            className={cn(
              'absolute inset-0 bg-gradient-to-tr transition-all duration-700',
              channel.accentGradient
            )}
          >
            {/* Visual estilizado conforme categoria */}
            {channel.bgVisual === 'sports' && (
              <div className="absolute inset-0 flex flex-col justify-center items-center opacity-85">
                <div className="pitch absolute inset-0 opacity-40" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex items-center gap-6 rounded-2xl border border-white/20 bg-black/60 px-6 py-3.5 backdrop-blur-md shadow-2xl">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-white text-base sm:text-lg">ARS</span>
                      <span className="rounded bg-red-600/90 px-2 py-0.5 text-xs font-mono font-bold text-white">2</span>
                    </div>
                    <span className="font-mono text-xs text-white/50">X</span>
                    <div className="flex items-center gap-3">
                      <span className="rounded bg-blue-600/90 px-2 py-0.5 text-xs font-mono font-bold text-white">1</span>
                      <span className="font-extrabold text-white text-base sm:text-lg">CHE</span>
                    </div>
                  </div>
                  <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-0.5 text-[11px] font-semibold text-white animate-pulse">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    AO VIVO · PREMIER LEAGUE
                  </span>
                </div>
              </div>
            )}

            {channel.bgVisual === 'movie' && (
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black" />
                <div className="relative z-10 max-w-sm">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-amber-300">
                    SESSÃO CINEMA 4K
                  </span>
                  <h4 className="mt-1 font-serif text-2xl font-black italic tracking-wide text-white sm:text-3xl">
                    DUNA: PARTE DOIS
                  </h4>
                  <p className="mt-2 text-xs text-stone-300 line-clamp-2">
                    A jornada mítica de Paul Atreides ao se unir a Chani e aos Fremen em busca de vingança.
                  </p>
                </div>
              </div>
            )}

            {channel.bgVisual === 'cartoon' && (
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-black" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/30 ring-2 ring-cyan-400/50 shadow-lg mb-2">
                    <Flame className="h-8 w-8 text-cyan-300" />
                  </div>
                  <span className="rounded-full bg-cyan-500 px-3 py-0.5 text-xs font-bold text-black">
                    ESPECIAL INFANTIL
                  </span>
                  <p className="mt-2 text-sm font-bold text-white">Gumball & Amigos em Ação</p>
                </div>
              </div>
            )}

            {/* Scanlines retrô da TV */}
            <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 opacity-40" />
          </div>

          {/* Barra Superior da TV (Cômodo & Indicadores) */}
          <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80">
            <div className="flex items-center gap-2 rounded-lg bg-black/60 px-2.5 py-1 backdrop-blur-sm border border-white/10">
              <span className="h-2 w-2 rounded-full bg-signal animate-pulse" />
              <span className="font-semibold">{currentRoom}</span>
              <span className="text-white/40">·</span>
              <span className="text-white/70">PIN {pairingPin}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-black/60 px-2 py-0.5 text-[10px] font-bold text-brand-light border border-brand/30">
                FULL HD 1080p
              </span>
              <div className="hidden sm:flex items-center gap-1 text-white/70">
                <Volume2 className="h-3.5 w-3.5" />
                <Maximize className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* OSD Inferior da TV (On Screen Display do Canal) */}
          <div className="absolute bottom-2.5 left-3 right-3 rounded-xl border border-white/15 bg-black/80 p-2.5 sm:p-3 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={cn(
                    'flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg text-white font-black text-xs shadow-md',
                    channel.badgeColor
                  )}
                >
                  <Radio className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-white truncate">
                      {channel.name}
                    </span>
                    <span className="rounded bg-white/15 px-1.5 py-0.2 text-[9px] font-mono font-medium text-white/80">
                      {channel.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/70 truncate">
                    {channel.program}
                  </p>
                </div>
              </div>
              <div className="hidden xs:flex flex-col items-end text-right shrink-0">
                <span className="text-[10px] font-mono text-signal font-semibold">
                  {channel.timeInfo}
                </span>
                <span className="text-[9px] text-white/40">Sem travar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Borda Inferior / Logotipo TV */}
        <div className="mt-1 flex items-center justify-center">
          <span className="h-1 w-8 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Suporte da TV (Pedestal) */}
      <div aria-hidden="true" className="mx-auto h-3 w-28 rounded-b-xl bg-ink-sunken ring-1 ring-line/60" />

      {/* Botões do Controle Remoto Interativo (Trocar Canal) */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        <span className="text-xs font-mono text-cream-dim mr-1">Simular Canal:</span>
        {PREVIEW_CHANNELS.map((ch, idx) => (
          <button
            key={ch.id}
            type="button"
            onClick={() => setActiveChannelIdx(idx)}
            className={cn(
              'rounded-lg px-3 py-1 text-xs font-semibold transition-all duration-200 border',
              activeChannelIdx === idx
                ? 'border-brand bg-brand/20 text-brand-light shadow-[0_0_15px_-3px_hsl(var(--brand)/0.5)]'
                : 'border-line bg-ink-raised text-cream-dim hover:text-cream hover:bg-line'
            )}
          >
            {ch.name}
          </button>
        ))}
      </div>
    </figure>
  )
}
