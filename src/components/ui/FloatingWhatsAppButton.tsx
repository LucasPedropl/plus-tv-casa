import { MessageCircle } from 'lucide-react'
import { SALES_CONTACT_URL } from '@/content/site'

export function FloatingWhatsAppButton() {
  return (
    <aside
      aria-label="Atendimento no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center"
    >
      <a
        href={SALES_CONTACT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com atendente no WhatsApp"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-signal text-ink shadow-[0_12px_32px_-6px_hsl(var(--signal)/0.7)] ring-2 ring-signal/50 transition-all duration-300 hover:scale-110 hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 active:scale-95"
      >
        <MessageCircle className="h-7 w-7 fill-current stroke-[2.2]" aria-hidden="true" />
      </a>
    </aside>
  )
}
