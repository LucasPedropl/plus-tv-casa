import { useState, useEffect } from 'react'
import { Menu, X, Tv } from 'lucide-react'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { NAV_ITEMS, SALES_CONTACT_URL } from '@/content/site'
import { cn } from '@/lib/cn'

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isScrolled
          ? 'border-b border-line bg-ink/90 shadow-[0_16px_36px_-16px_hsl(var(--ink-sunken))] backdrop-blur-md'
          : 'bg-transparent py-2'
      )}
    >
      <div className="mx-auto flex max-w-site items-center justify-between px-5 sm:px-8">
        <a href="#inicio" aria-label="Página inicial do Plus TV" className="focus-visible:outline-none">
          <BrandLogo />
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-cream-dim transition-colors hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden items-center gap-3 sm:flex">
          <ButtonLink
            href="#calculadora"
            variant="ghost"
            size="sm"
            className="text-xs"
          >
            Ver Preços
          </ButtonLink>
          <ButtonLink
            href={SALES_CONTACT_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            className="gap-1.5"
          >
            <Tv className="h-3.5 w-3.5" />
            <span>Assinar para Minha TV</span>
          </ButtonLink>
        </div>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu de navegação'}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-ink-raised text-cream lg:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-line bg-ink-raised/95 px-5 py-6 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Menu móvel">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-base font-medium text-cream hover:text-brand-light"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 pt-4 border-t border-line flex flex-col gap-2.5">
              <ButtonLink
                href="#calculadora"
                onClick={() => setMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                Calcular Preço por TV
              </ButtonLink>
              <ButtonLink
                href={SALES_CONTACT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                Pedir Teste no WhatsApp
              </ButtonLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
