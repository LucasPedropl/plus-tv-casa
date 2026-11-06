import { ShieldCheck, Sparkles, Tv, Zap } from 'lucide-react'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { useSignUpModal } from '@/components/signup/SignUpModalContext'

export function CtaFinalHomeSection() {
  const { openSignUp } = useSignUpModal()

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
            <button
              type="button"
              onClick={() => openSignUp()}
              className="inline-flex items-center justify-center font-semibold transition-all duration-200 select-none text-center cursor-pointer rounded-xl px-7 py-3.5 text-base shadow-lg bg-signal text-ink font-bold hover:brightness-110 shadow-[0_12px_28px_-10px_hsl(var(--signal)/0.5)] active:scale-[0.98] w-full sm:w-auto gap-2"
            >
              <Tv className="h-5 w-5 shrink-0" />
              <span>Assinar Agora</span>
            </button>

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
