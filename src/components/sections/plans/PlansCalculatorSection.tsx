import { useState } from 'react'
import {
  Check,
  Home,
  MessageCircle,
  PiggyBank,
  Sparkles,
  Tv,
} from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import {
  TV_PLANS,
  PLAN_BENEFITS,
  buildWhatsAppUrl,
  BASE_TV_PRICE,
  EXTRA_TV_PRICE,
} from '@/content/plans'
import { SECTION_IDS } from '@/content/site'
import { cn } from '@/lib/cn'

export function PlansCalculatorSection() {
  const [selectedTvCount, setSelectedTvCount] = useState<number>(2) // Default 2 TVs (mais comum)

  const activePlan =
    TV_PLANS.find((p) => p.tvCount === selectedTvCount) || TV_PLANS[0]

  const annualCableCost = activePlan.cableComparisonPrice * 12
  const annualPlusCost = activePlan.price * 12
  const annualSavings = annualCableCost - annualPlusCost

  return (
    <section
      id={SECTION_IDS.calculator}
      className="relative overflow-hidden border-t border-line bg-ink-raised/40 py-16 sm:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-brand/10 blur-[130px]"
      />

      <div className="relative mx-auto max-w-site px-5 sm:px-8">
        <SectionHeader
          eyebrow="Calculadora de TVs & Preços"
          titleId="calculator-title"
          title="Escolha quantas TVs você quer na sua casa"
          description="A 1ª TV custa R$ 25,00 e cada TV adicional na mesma residência custa apenas R$ 18,00. Selecione de 1 até 5 TVs e veja o valor exato."
          alignment="center"
        />

        {/* Bloco Principal da Calculadora */}
        <div className="mt-12 mx-auto max-w-4xl rounded-[2rem] border border-brand/30 bg-ink-raised p-6 sm:p-10 shadow-[0_30px_90px_-40px_hsl(var(--brand)/0.5)]">
          {/* Seletor de Quantidade de TVs */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <span className="font-mono text-xs uppercase tracking-wider text-brand-light font-semibold">
                Passo 1: Quantas TVs você quer conectar?
              </span>
              <span className="text-xs text-cream-dim">
                Suporta de 1 até 5 aparelhos simultâneos
              </span>
            </div>

            {/* Botões Grandes de Seleção de TVs (1 a 5) */}
            <div className="mt-4 grid grid-cols-5 gap-2 sm:gap-4">
              {TV_PLANS.map((plan) => {
                const isSelected = plan.tvCount === selectedTvCount
                return (
                  <button
                    key={plan.tvCount}
                    type="button"
                    onClick={() => setSelectedTvCount(plan.tvCount)}
                    className={cn(
                      'group relative flex flex-col items-center justify-center rounded-2xl border p-3 sm:p-4 transition-all duration-200 select-none cursor-pointer',
                      isSelected
                        ? 'border-brand bg-gradient-to-b from-brand/25 to-brand/10 text-cream shadow-[0_8px_24px_-8px_hsl(var(--brand)/0.7)] ring-2 ring-brand-light/40'
                        : 'border-line bg-ink-sunken/80 text-cream-dim hover:border-line hover:bg-ink-sunken hover:text-cream'
                    )}
                  >
                    {plan.badge && (
                      <span className="absolute -top-2.5 hidden sm:inline-block rounded-full bg-brand px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink shadow">
                        {plan.badge}
                      </span>
                    )}
                    <Tv
                      className={cn(
                        'h-6 w-6 transition-transform group-hover:scale-110 sm:h-7 sm:w-7',
                        isSelected ? 'text-brand-light' : 'text-cream-dim'
                      )}
                    />
                    <span className="font-wide mt-2 text-lg font-black tracking-tight sm:text-2xl">
                      {plan.tvCount}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-wider sm:text-xs text-cream-dim">
                      {plan.tvCount === 1 ? 'TV' : 'TVs'}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Slider de Apoio */}
            <div className="mt-4 px-2">
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={selectedTvCount}
                onChange={(e) => setSelectedTvCount(Number(e.target.value))}
                aria-label="Quantidade de TVs"
                className="w-full h-2 rounded-lg bg-ink-sunken accent-brand cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono text-cream-dim mt-1">
                <span>1 TV (Individual)</span>
                <span>3 TVs (Média)</span>
                <span>5 TVs (Completa)</span>
              </div>
            </div>
          </div>

          {/* Resultado do Cálculo */}
          <div className="mt-8 grid gap-6 rounded-2xl border border-line bg-ink-sunken p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            {/* Esquerda: Detalhes do Plano e Cômodos */}
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono text-xs font-semibold text-brand-light">
                  <Sparkles className="h-3.5 w-3.5" />
                  Plano Selecionado: {activePlan.label}
                </span>
                {activePlan.badge && (
                  <span className="inline-block sm:hidden rounded-full bg-brand px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-ink">
                    {activePlan.badge}
                  </span>
                )}
              </div>

              <h3 className="font-wide mt-3 text-2xl font-black text-cream sm:text-3xl">
                {activePlan.roomSuggestion}
              </h3>

              {/* Cômodos sugeridos da casa */}
              <div className="mt-4">
                <p className="font-mono text-xs text-cream-dim uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Home className="h-3.5 w-3.5 text-brand-light" />
                  Ambientes cobertos na sua residência:
                </p>
                <div className="flex flex-wrap gap-2">
                  {activePlan.rooms.map((room, idx) => (
                    <span
                      key={room}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-brand/20 bg-brand/5 px-2.5 py-1 text-xs font-medium text-cream"
                    >
                      <Tv className="h-3 w-3 text-brand-light" />
                      TV {idx + 1}: {room}
                    </span>
                  ))}
                </div>
              </div>

              {/* Detalhamento da regra de cálculo */}
              <div className="mt-5 border-t border-line/60 pt-4 text-xs text-cream-dim space-y-1">
                <p>
                  • <strong>1ª Smart TV:</strong> R$ {BASE_TV_PRICE.toFixed(2).replace('.', ',')}
                </p>
                {selectedTvCount > 1 && (
                  <p>
                    • <strong>{selectedTvCount - 1} {selectedTvCount - 1 === 1 ? 'TV adicional' : 'TVs adicionais'}:</strong>{' '}
                    {(selectedTvCount - 1)} x R$ {EXTRA_TV_PRICE.toFixed(2).replace('.', ',')} = R${' '}
                    {((selectedTvCount - 1) * EXTRA_TV_PRICE).toFixed(2).replace('.', ',')}
                  </p>
                )}
                <p className="text-brand-light font-semibold pt-1">
                  Média de apenas {activePlan.pricePerTvFormatted} por TV ao mês!
                </p>
              </div>
            </div>

            {/* Direita: Valor e Botão de Ação */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-brand/40 bg-gradient-to-b from-brand/10 to-transparent p-6 text-center shadow-inner">
              <span className="font-mono text-xs uppercase tracking-wider text-cream-dim">
                Valor Total da Assinatura
              </span>

              <div className="mt-2 flex items-baseline justify-center gap-1">
                <span className="font-wide tabular-nums text-4xl font-black text-cream sm:text-5xl">
                  {activePlan.priceFormatted}
                </span>
                <span className="text-sm font-semibold text-cream-dim">/mês</span>
              </div>

              <span className="mt-1 text-xs text-signal font-medium">
                Sem taxas extras · Sem fidelidade
              </span>

              {/* Botão de WhatsApp com mensagem montada */}
              <a
                href={buildWhatsAppUrl(selectedTvCount)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3.5 text-sm font-bold text-ink shadow-[0_12px_24px_-8px_hsl(var(--signal)/0.6)] transition-all duration-200 hover:scale-102 hover:brightness-110 active:scale-98"
              >
                <MessageCircle className="h-5 w-5 fill-current" />
                <span>Assinar para {selectedTvCount} {selectedTvCount === 1 ? 'TV' : 'TVs'} Agora</span>
              </a>

              <p className="mt-3 text-[11px] text-cream-dim">
                Ativação guiada em 1 minuto via WhatsApp
              </p>
            </div>
          </div>

          {/* Comparativo de Economia com TV a Cabo Tradicional */}
          <div className="mt-8 rounded-xl border border-line bg-ink-sunken/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-signal/15 text-signal">
                <PiggyBank className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-cream">
                  Economize até R$ {annualSavings.toFixed(0)} por ano
                </h4>
                <p className="text-xs text-cream-dim">
                  Uma operadora de TV tradicional cobraria cerca de R$ {activePlan.cableComparisonPrice.toFixed(0)}/mês para {selectedTvCount} pontos.
                </p>
              </div>
            </div>

            <div className="shrink-0 font-mono text-xs text-right">
              <span className="text-cream-dim line-through block">
                Operadora: R$ {(activePlan.cableComparisonPrice * 12).toFixed(0)}/ano
              </span>
              <span className="text-signal font-bold block text-sm">
                Plus TV: R$ {(activePlan.price * 12).toFixed(0)}/ano
              </span>
            </div>
          </div>
        </div>

        {/* Grade de Benefícios Incluídos */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PLAN_BENEFITS.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border border-line bg-ink-raised p-5 transition-colors hover:border-brand/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand-light">
                  <Check className="h-4 w-4 stroke-[3]" />
                </span>
                <h4 className="font-semibold text-sm text-cream">{benefit.title}</h4>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-cream-dim">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
