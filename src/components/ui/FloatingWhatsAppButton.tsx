import { MessageCircle } from 'lucide-react'
import { SALES_CONTACT_URL } from '@/content/site'

export function FloatingWhatsAppButton() {
  return (
    <aside
      aria-label="Atendimento no WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center"
    >
      <a
        href={SALES_CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com atendente no WhatsApp"
        className="group flex items-center gap-2.5 rounded-full bg-signal px-4 py-3 font-semibold text-ink shadow-[0_12px_32px_-8px_hsl(var(--signal)/0.65)] ring-2 ring-signal/50 transition-all duration-300 hover:scale-105 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4"
      >
        <span className="flex h-6 w-6 items-center justify-center">
          <MessageCircle className="h-5 w-5 fill-current" aria-hidden="true" />
        </span>
        <span className="hidden text-xs font-bold tracking-tight sm:inline">
          Dúvidas? Fale no WhatsApp
        </span>
      </a>
    </aside>
  )
}
