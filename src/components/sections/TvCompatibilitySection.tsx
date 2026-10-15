import { Check, Cpu, Laptop, Smartphone, Tv } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SECTION_IDS } from '@/content/site'

const PLATFORMS = [
  {
    name: 'Samsung Smart TV',
    system: 'Sistema Tizen',
    detail: 'Navegador Internet nativo da Samsung',
    icon: Tv,
  },
  {
    name: 'LG Smart TV',
    system: 'Sistema webOS',
    detail: 'Navegador LG Web Browser',
    icon: Tv,
  },
  {
    name: 'Android TV / Google TV',
    system: 'TCL, Philips, Sony, Xiaomi',
    detail: 'Google Chrome ou TV Bro Browser',
    icon: Tv,
  },
  {
    name: 'Amazon Fire TV Stick',
    system: 'Fire OS',
    detail: 'Navegador Amazon Silk',
    icon: Cpu,
  },
  {
    name: 'Roku TV & AOC',
    system: 'Roku OS',
    detail: 'Navegador Web / Cast compatível',
    icon: Tv,
  },
  {
    name: 'TV Box / Chromecast',
    system: 'Qualquer modelo',
    detail: 'Reprodução direta em tela cheia',
    icon: Cpu,
  },
  {
    name: 'Computador & Notebook',
    system: 'Windows / Mac / Linux',
    detail: 'Chrome, Edge, Firefox, Safari',
    icon: Laptop,
  },
  {
    name: 'Celular & Tablet',
    system: 'Android & iOS',
    detail: 'Assista também no smartphone ou iPad',
    icon: Smartphone,
  },
]

export function TvCompatibilitySection() {
  return (
    <section
      id={SECTION_IDS.compatibility}
      className="relative overflow-hidden border-t border-line bg-ink py-16 sm:py-24"
    >
      <div className="relative mx-auto max-w-site px-5 sm:px-8">
        <SectionHeader
          eyebrow="Compatibilidade Garantida"
          titleId="compatibility-title"
          title="Funciona na sua TV atual sem precisar comprar nada novo"
          description="Se a sua TV tem acesso à internet e um navegador, o Tv Studio Client roda perfeitamente nela."
          alignment="center"
        />

        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
          {PLATFORMS.map((plat) => {
            const Icon = plat.icon
            return (
              <div
                key={plat.name}
                className="group flex flex-col justify-between rounded-2xl border border-line bg-ink-raised/70 p-4 transition-all duration-300 hover:border-brand/40 hover:bg-ink-sunken"
              >
                <div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand-light transition-transform duration-200 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h4 className="font-semibold text-sm text-cream mt-3">
                    {plat.name}
                  </h4>
                  <p className="font-mono text-[10px] text-brand-light mt-0.5">
                    {plat.system}
                  </p>
                  <p className="text-xs text-cream-dim mt-2 leading-relaxed">
                    {plat.detail}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-signal border-t border-line/60 pt-2.5">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                  <span>100% Compatível</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
