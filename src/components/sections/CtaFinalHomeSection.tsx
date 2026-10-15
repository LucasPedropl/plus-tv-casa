import { MessageCircle, ShieldCheck, Sparkles, Tv, Zap } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { SALES_CONTACT_URL } from '@/content/site'

export function CtaFinalHomeSection() {
  return (
    <section className="relative overflow-hidden border-t border-line bg-gradient-to-b from-ink via-ink-raised to-ink-sunken py-16 sm:py-24">
      {/* Luz ambiente */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-[46rem] rounded-full bg-brand/20 blur-[130px]"
      />

      <div className="relative mx-auto max-w-site px-5 sm:px-8">
        <div className="mx-auto max-w-4xl rounded-[2.25rem] border border-brand/40 bg-ink-raised p-8 text-center sm:p-14 shadow-[0_30px_90px_-30px_hsl(var(--brand)/0.6)]">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3.5 py-1 font-mono text-xs font-semibold text-brand-light">
            <Sparkles className="h-3.5 w-3.5" />
            Entretenimento Sem Limites na Sua Casa
          </span>

          <h2 className="font-wide mt-5 text-2xl font-black text-cream sm:text-4xl md:text-5xl">
            Pronto para colocar todos os canais na sua Smart TV?
          </h2>

          <p className="mt-4 text-base text-cream-dim sm:text-lg max-w-2xl mx-auto">
            Escolha de 1 a 5 TVs. 1ª TV por <strong className="text-cream whitespace-nowrap">R$ 25,00/mês</strong> e cada TV adicional por apenas <strong className="text-cream whitespace-nowrap">R$ 18,00</strong>.
            Ativação guiada em 1 minuto via WhatsApp.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink
              href={SALES_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="signal"
              size="lg"
              className="w-full sm:w-auto gap-2"
            >
              <MessageCircle className="h-5 w-5 fill-current" />
              <span>Pedir Ativação no WhatsApp</span>
            </ButtonLink>

            <ButtonLink
              href="#calculadora"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto gap-2"
            >
              <Tv className="h-4 w-4" />
              <span>Recalcular Preços</span>
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-mono text-cream-dim">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-signal" />
              Sem fidelidade ou multa
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-brand-light" />
              Liberação em instantes
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Tv className="h-4 w-4 text-cream-dim" />
              Direto no navegador da TV
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
