import { Check, ShieldCheck, Sparkles, Tv, Zap } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { HomeTvFrame } from '@/components/mockups/HomeTvFrame'
import { SALES_CONTACT_URL, SECTION_IDS } from '@/content/site'

export function HeroHomeTv() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative overflow-hidden pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-16"
    >
      {/* Luz ambiente de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[32rem] w-[54rem] rounded-full bg-brand/15 blur-[120px]"
      />

      <div className="relative mx-auto max-w-site px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          {/* Texto e Chamada de Vendas */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 text-xs font-semibold text-brand-light">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Para Pessoa Física & Residências</span>
            </div>

            <h1 className="font-wide mt-4 text-3xl font-black tracking-tight text-cream sm:text-4xl md:text-5xl lg:leading-[1.15]">
              Todos os canais ao vivo direto na{' '}
              <span className="text-brand-light underline decoration-brand/40 decoration-wavy decoration-2 underline-offset-6">
                TV de casa
              </span>
            </h1>

            <p className="mt-4 text-base leading-relaxed text-cream-dim sm:text-lg">
              Futebol, filmes, séries, infantis e notícias em alta definição na sua Smart TV. 
              Sem taxa de instalação, sem antenas, sem furar paredes e sem fios extras.
            </p>

            {/* Destaque das 3 regras principais solicitadas */}
            <div className="mt-6 space-y-3 border-y border-line/80 py-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-light">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <p className="text-sm text-cream font-medium">
                  <strong>Somente Todos os Canais:</strong> Grade completa liberada (esportes, filmes, notícias e TV aberta).
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-light">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <p className="text-sm text-cream font-medium">
                  <strong>De 1 até 5 TVs:</strong> Cada cômodo assiste o que quiser de forma 100% independente.
                </p>
              </div>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/20 text-brand-light">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </span>
                <p className="text-sm text-cream font-medium">
                  <strong>Preço Imbatível:</strong> 1 TV por <span className="text-brand-light font-bold">R$ 25,00</span> e cada TV adicional por apenas <span className="text-brand-light font-bold">R$ 18,00</span>.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center">
              <ButtonLink
                href="#calculadora"
                size="lg"
                className="gap-2"
              >
                <Tv className="h-5 w-5" />
                <span>Simular Meu Plano (1 a 5 TVs)</span>
              </ButtonLink>

              <ButtonLink
                href={SALES_CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="gap-2"
              >
                <Zap className="h-4 w-4 text-signal" />
                <span>Ativar Agora no WhatsApp</span>
              </ButtonLink>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-cream-dim">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-signal" />
                Sem fidelidade
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-brand-light" />
                Ativação em 1 minuto
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Tv className="h-4 w-4 text-cream-dim" />
                Samsung, LG, Android e Roku
              </span>
            </div>
          </div>

          {/* Visual da TV com Mockup e Simulação */}
          <div className="relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <HomeTvFrame currentRoom="Sala de Estar" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
