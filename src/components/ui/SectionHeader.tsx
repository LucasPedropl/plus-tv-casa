import { cn } from '@/lib/cn'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  titleId?: string
  description?: string
  alignment?: 'left' | 'center'
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  titleId,
  description,
  alignment = 'left',
  className,
}: SectionHeaderProps) {
  const isCenter = alignment === 'center'

  return (
    <div
      className={cn(
        'max-w-3xl',
        isCenter && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow inline-block">
          {eyebrow}
        </span>
      )}
      <h2
        id={titleId}
        className={cn(
          'font-wide mt-2 text-2xl font-black tracking-tight text-cream sm:text-3xl md:text-4xl',
          'text-balance'
        )}
      >
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-cream-dim sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}
