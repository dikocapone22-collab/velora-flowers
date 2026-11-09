import { ArrowUp } from 'lucide-react'
import { navItems } from '../data/navigation'
import { Container } from './Container'
import { Logo } from './Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-paper">
      <Container className="py-14 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Авторские букеты с доставкой по Алматы. Заказ — через WhatsApp.
            </p>
          </div>
          <nav aria-label="Навигация в подвале">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-1 sm:flex sm:flex-wrap sm:gap-x-8">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-[44px] items-center text-sm text-ink/80 transition-colors hover:text-wine"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} VELORA FLOWERS. Учебный демонстрационный проект.</p>
          <a href="#home" className="inline-flex min-h-[44px] items-center gap-2 transition-colors hover:text-wine">
            Наверх <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        </div>
      </Container>
    </footer>
  )
}
