import type { MouseEvent } from 'react'
import { cn } from '../lib/cn'

interface LogoProps {
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  className?: string
}

export function Logo({ onClick, className }: LogoProps) {
  return (
    <a
      href="#home"
      onClick={onClick}
      aria-label="VELORA FLOWERS — на главную"
      className={cn('inline-flex min-h-[44px] flex-col justify-center leading-none text-ink', className)}
    >
      <span className="font-serif text-[1.6rem] font-semibold tracking-[0.18em] sm:text-[1.75rem]">VELORA</span>
      <span className="mt-1 pl-0.5 text-[0.58rem] font-semibold uppercase tracking-[0.48em] text-wine">Flowers</span>
    </a>
  )
}
