import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '../lib/cn'

interface RevealProps {
  children: ReactNode
  /** Задержка в миллисекундах */
  delay?: number
  className?: string
  as?: 'div' | 'li'
}

/**
 * Лёгкая анимация появления при прокрутке: IntersectionObserver + CSS-transition.
 * Без сторонних библиотек, анимируются только opacity и transform.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement & HTMLLIElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const props = {
    ref,
    'data-visible': visible,
    className: cn('reveal', className),
    style: delay ? { transitionDelay: `${delay}ms` } : undefined,
  }

  return as === 'li' ? <li {...props}>{children}</li> : <div {...props}>{children}</div>
}
