import { Tv, MessageCircle, Heart } from 'lucide-react'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { NAV_ITEMS, SALES_CONTACT_URL, APP_TV_CONNECT_URL } from '@/content/site'

export function SiteFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink-sunken pt-16 pb-12 text-cream-dim">
      <div className="mx-auto max-w-site px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
          {/* Brand Col */}
          <div>
            <BrandLogo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-dim">
              Todos os canais de TV ao vivo diretamente na Smart TV da sua residência.
              Assista seus jogos, séries e desenhos favoritos sem fios, sem antenas e sem taxa de instalação.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SALES_CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-ink-raised px-3.5 py-2 text-xs font-semibold text-cream transition-colors hover:border-brand/40 hover:text-brand-light"
              >
                <MessageCircle className="h-4 w-4 text-signal" />
                <span>Atendimento WhatsApp</span>
              </a>
              <a
                href={APP_TV_CONNECT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-line bg-ink-raised px-3.5 py-2 text-xs font-semibold text-cream transition-colors hover:border-brand/40 hover:text-brand-light"
              >
                <Tv className="h-4 w-4 text-brand" />
                <span>Conectar TV (PIN)</span>
              </a>
            </div>
          </div>

          {/* Links Navegação */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-cream">
              Navegação
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="transition-colors hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Informações Planos */}
          <div>
            <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-cream">
              Planos Residenciais
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>1 TV: R$ 25,00 / mês</li>
              <li>2 TVs: R$ 43,00 / mês</li>
              <li>3 TVs: R$ 61,00 / mês</li>
              <li>4 TVs: R$ 79,00 / mês</li>
              <li>5 TVs: R$ 97,00 / mês</li>
              <li className="pt-2 text-xs text-brand-light font-medium">
                *Cada TV adicional por apenas R$ 18,00
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line/60 pt-8 flex flex-col items-center justify-between gap-4 text-xs text-cream-dim sm:flex-row">
          <p>© {currentYear} Plus TV. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1.5">
            Feito para transformar o entretenimento da sua casa
            <Heart className="h-3.5 w-3.5 text-brand fill-current" />
          </p>
        </div>
      </div>
    </footer>
  )
}
