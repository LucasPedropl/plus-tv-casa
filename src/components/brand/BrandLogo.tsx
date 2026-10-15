import { Tv } from 'lucide-react'
import { cn } from '@/lib/cn'

interface BrandLogoProps {
  className?: string
  badgeText?: string
}

export function BrandLogo({ className, badgeText = 'Casa' }: BrandLogoProps) {
  return (
    <div className={cn('inline-flex items-center gap-2.5', className)}>
      <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-brand-dark shadow-[0_8px_20px_-6px_hsl(var(--brand)/0.7)] ring-1 ring-brand-light/30">
        <Tv className="h-5 w-5 text-ink stroke-[2.2]" aria-hidden="true" />
      </span>
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-wide text-lg sm:text-xl font-black tracking-tight text-cream whitespace-nowrap">
            TV STUDIO <span className="text-brand-light font-extrabold">CLIENT</span>
          </span>
          {badgeText && (
            <span className="rounded-md border border-brand/30 bg-brand/10 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-brand-light">
              {badgeText}
            </span>
          )}
        </div>
        <span className="text-[10px] font-medium tracking-tight text-cream-dim">
          Canais direto na sua Smart TV
        </span>
      </div>
    </div>
  )
}
