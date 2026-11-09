import type { ReactNode } from 'react'
import { Info } from 'lucide-react'
import { cn } from '../lib/cn'

type Tone = 'dark' | 'light'

export function Eyebrow({ children, tone = 'dark' }: { children: ReactNode; tone?: Tone }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em]',
        tone === 'light' ? 'text-powder' : 'text-wine',
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current" />
      {children}
    </p>
  )
}

interface SectionHeadingProps {
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: Tone
}

export function SectionHeading({ id, eyebrow, title, description, align = 'left', tone = 'dark' }: SectionHeadingProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          'mt-4 text-balance font-serif text-[2.25rem] font-medium leading-[1.08] tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem]',
          tone === 'light' ? 'text-cream' : 'text-ink',
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn('mt-5 text-base leading-relaxed sm:text-lg', tone === 'light' ? 'text-cream/80' : 'text-muted')}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

/** Пометка «демо» для вымышленных данных */
export function DemoBadge({ children = 'Демо' }: { children?: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-full border border-wine/25 bg-blush px-2.5 py-0.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-wine">
      {children}
    </span>
  )
}

export function DemoNote({ children, className, tone = 'dark' }: { children: ReactNode; className?: string; tone?: Tone }) {
  return (
    <p className={cn('flex items-start gap-2.5 text-sm leading-relaxed', tone === 'light' ? 'text-cream/75' : 'text-muted', className)}>
      <Info aria-hidden="true" className={cn('mt-0.5 h-4 w-4 shrink-0', tone === 'light' ? 'text-powder' : 'text-wine')} strokeWidth={1.75} />
      <span>{children}</span>
    </p>
  )
}
