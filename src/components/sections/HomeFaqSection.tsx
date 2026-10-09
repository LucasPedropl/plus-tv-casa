import { ChevronDown } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { HOME_FAQ } from '@/content/faq'
import { SALES_CONTACT_URL, SECTION_IDS } from '@/content/site'

export function HomeFaqSection() {
  return (
    <section
      id={SECTION_IDS.faq}
      className="relative overflow-hidden border-t border-line bg-ink-sunken py-16 sm:py-24"
    >
      <div className="relative mx-auto max-w-site px-5 sm:px-8">
        <SectionHeader
          eyebrow="Tire Suas Dúvidas"
          titleId="faq-title"
          title="Perguntas Frequentes sobre o Plus TV em Casa"
          description="Tudo o que você precisa saber sobre funcionamento, instalação e pagamento."
          alignment="center"
        />

        <div className="mx-auto mt-12 max-w-3xl divide-y divide-line/80 rounded-2xl border border-line bg-ink-raised">
          {HOME_FAQ.map((faq) => (
            <details
              key={faq.question}
              className="group p-5 sm:p-6 transition-colors hover:bg-ink-sunken/40"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-cream group-open:text-brand-light">
                <span className="text-sm sm:text-base">{faq.question}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-line bg-ink-sunken text-cream-dim transition-transform duration-200 group-open:rotate-180 group-open:text-brand-light">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-cream-dim">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-cream-dim">
            Ficou com alguma dúvida que não está aqui?{' '}
            <a
              href={SALES_CONTACT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-light underline underline-offset-4 hover:text-cream font-medium"
            >
              Fale diretamente com nossa equipe no WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
