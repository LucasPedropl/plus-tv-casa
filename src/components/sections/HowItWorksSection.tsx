import { CheckCircle2, MessageCircle, Monitor, ShieldCheck, Tv } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { APP_TV_CONNECT_URL, SALES_CONTACT_URL, SECTION_IDS } from '@/content/site'

const STEPS = [
  {
    step: '01',
    title: 'Abra o navegador da TV',
    description:
      'Ligue sua Smart TV, abra o navegador de internet (Browser, Chrome, Silk ou Web) e digite o link.',
    linkText: 'plus.bixs.com.br/tv',
    linkHref: APP_TV_CONNECT_URL,
    icon: Monitor,
  },
  {
    step: '02',
    title: 'Copie o código PIN',
    description:
      'Um código PIN exclusivo de 4 dígitos aparecerá na tela da sua televisão (exemplo: 7492).',
    linkText: 'Código PIN na tela',
    icon: Tv,
  },
  {
    step: '03',
    title: 'Envie no WhatsApp e assista',
    description:
      'Envie o PIN pra nossa equipe no WhatsApp. Sua TV é liberada instantaneamente com todos os canais!',
    linkText: 'Ativação em 1 minuto',
    icon: MessageCircle,
  },
]

export function HowItWorksSection() {
  return (
    <section
      id={SECTION_IDS.howItWorks}
      className="relative overflow-hidden border-t border-line bg-ink-sunken py-16 sm:py-24"
    >
      <div className="relative mx-auto max-w-site px-5 sm:px-8">
        <SectionHeader
          eyebrow="Como Funciona"
          titleId="how-it-works-title"
          title="Ative na sua Smart TV em 3 passos simples"
          description="Sem visita técnica, sem furar paredes e sem passar cabos pela sala. Você mesmo ativa em menos de 1 minuto."
          alignment="center"
        />

        {/* 3 Passos */}
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.step}
                className="group relative flex flex-col justify-between rounded-2xl border border-line bg-ink-raised p-6 transition-all duration-300 hover:border-brand/40 hover:shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-black text-brand-light">
                      {s.step}
                    </span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <h3 className="font-wide mt-4 text-lg font-bold text-cream">
                    {s.title}
                  </h3>

                  <p className="mt-2 text-xs text-cream-dim leading-relaxed">
                    {s.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-line/60 pt-3">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-brand-light">
                    <CheckCircle2 className="h-3.5 w-3.5 text-signal" />
                    {s.linkText}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Banner de Garantia */}
        <div className="mt-12 rounded-2xl border border-line bg-ink-raised p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-signal/10 text-signal">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <div>
              <h4 className="font-bold text-sm text-cream">
                Suporte humano para te ajudar na configuração
              </h4>
              <p className="text-xs text-cream-dim">
                Se tiver qualquer dificuldade para abrir o navegador da sua TV, nossa equipe auxilia você passo a passo pelo WhatsApp.
              </p>
            </div>
          </div>

          <ButtonLink
            href={SALES_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="md"
            className="w-full sm:w-auto shrink-0 text-center"
          >
            Falar com Atendente
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
