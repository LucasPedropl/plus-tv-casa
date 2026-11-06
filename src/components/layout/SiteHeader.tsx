import { useState, useEffect } from 'react'
import { Menu, X, Tv, LogIn } from 'lucide-react'
import { BrandLogo } from '@/components/brand/BrandLogo'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { NAV_ITEMS, PLUS_WEB_URL } from '@/content/site'
import { useSignUpModal } from '@/components/signup/SignUpModalContext'
import { cn } from '@/lib/cn'

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openSignUp } = useSignUpModal()

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
        <a href="#inicio" aria-label="Página inicial do Tv Studio Client" className="focus-visible:outline-none">
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
          <a
            href={`${PLUS_WEB_URL}/login`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-ink-raised px-3.5 py-1.5 text-xs font-semibold text-cream hover:border-brand/40 hover:text-brand-light transition-colors"
          >
            <LogIn className="h-3.5 w-3.5 text-cream-dim" />
            <span>Entrar</span>
          </a>
          <button
            type="button"
            onClick={() => openSignUp()}
            className="inline-flex items-center justify-center rounded-lg bg-brand px-3.5 py-1.5 text-xs font-semibold text-ink shadow-[0_12px_28px_-10px_hsl(var(--brand)/0.6)] hover:bg-brand-light active:scale-[0.98] transition-all gap-1.5 cursor-pointer"
          >
            <Tv className="h-3.5 w-3.5" />
            <span>Assinar para Minha TV</span>
          </button>
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
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  openSignUp()
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 px-4 text-sm font-semibold text-ink shadow-[0_12px_28px_-10px_hsl(var(--brand)/0.6)] hover:bg-brand-light transition-colors cursor-pointer"
              >
                <Tv className="h-4 w-4" />
                <span>Assinar para Minha TV</span>
              </button>
              <a
                href={`${PLUS_WEB_URL}/login`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-ink-sunken py-2.5 px-4 text-sm font-semibold text-cream hover:border-brand/40 hover:text-brand-light transition-colors"
              >
                <LogIn className="h-4 w-4 text-cream-dim" />
                <span>Entrar na Minha Conta</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
