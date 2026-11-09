import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { cn } from '../lib/cn'

type Variant = 'primary' | 'secondary' | 'light' | 'outlineLight'
type Size = 'md' | 'lg'

const base =
  'group inline-flex min-h-[44px] cursor-pointer select-none items-center justify-center gap-2 rounded-full text-center font-medium tracking-wide transition-colors duration-300 ease-soft active:opacity-90'

const variants: Record<Variant, string> = {
  primary: 'bg-wine text-cream shadow-[0_10px_24px_-14px_rgba(100,29,50,0.7)] hover:bg-wine-dark',
  secondary: 'border border-ink/20 bg-transparent text-ink hover:border-wine hover:text-wine',
  light: 'bg-cream text-wine hover:bg-paper',
  outlineLight: 'border border-cream/40 text-cream hover:bg-cream hover:text-wine',
}

const sizes: Record<Size, string> = {
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-[0.95rem] sm:px-8',
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  /** Открыть в новой вкладке (для WhatsApp, Instagram) */
  external?: boolean
  fullWidth?: boolean
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  icon,
  external = false,
  fullWidth = false,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      <span>{children}</span>
      {icon ? (
        <span aria-hidden="true" className="inline-flex transition-transform duration-300 ease-soft group-hover:translate-x-0.5">
          {icon}
        </span>
      ) : null}
    </a>
  )
}
