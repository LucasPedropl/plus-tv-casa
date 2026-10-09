import { SiteHeader } from '@/components/layout/SiteHeader'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { FloatingWhatsAppButton } from '@/components/ui/FloatingWhatsAppButton'
import { HeroHomeTv } from '@/components/sections/hero/HeroHomeTv'
import { PlansCalculatorSection } from '@/components/sections/plans/PlansCalculatorSection'
import { ChannelsShowcaseSection } from '@/components/sections/ChannelsShowcaseSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { TvCompatibilitySection } from '@/components/sections/TvCompatibilitySection'
import { HomeFaqSection } from '@/components/sections/HomeFaqSection'
import { CtaFinalHomeSection } from '@/components/sections/CtaFinalHomeSection'

export function App() {
  return (
    <div className="flex min-h-screen flex-col bg-ink text-cream selection:bg-brand/30 selection:text-cream">
      <a
        href="#conteudo-principal"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo-principal" className="flex-1">
        <HeroHomeTv />
        <PlansCalculatorSection />
        <ChannelsShowcaseSection />
        <HowItWorksSection />
        <TvCompatibilitySection />
        <HomeFaqSection />
        <CtaFinalHomeSection />
      </main>
      <SiteFooter />
      <FloatingWhatsAppButton />
    </div>
  )
}
