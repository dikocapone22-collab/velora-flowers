import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { ArrowRight, Menu, MessageCircle, X } from 'lucide-react'
import { siteConfig } from '../config/site'
import { navItems, sectionIds, type SectionId } from '../data/navigation'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import { cn } from '../lib/cn'
import { scrollToSection } from '../lib/scroll'
import { createWhatsAppLink, generalOrderMessage } from '../lib/whatsapp'
import { ButtonLink } from './Button'
import { Container } from './Container'
import { Logo } from './Logo'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const scrolled = useScrolled(16)
  const activeId = useActiveSection(sectionIds)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)

  // Мобильное меню: блокировка прокрутки, Esc, автозакрытие на десктопе, фокус
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [isOpen])

  const navigate = (id: SectionId) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    setIsOpen(false)
    // Даём меню закрыться и снять блокировку прокрутки перед скроллом
    window.setTimeout(() => scrollToSection(id), 10)
  }

  const solid = scrolled || isOpen

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
          solid ? 'border-line bg-cream/95 shadow-[0_8px_24px_-20px_rgba(37,35,33,0.45)]' : 'border-transparent bg-transparent',
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Logo onClick={navigate('home')} />

          <nav aria-label="Основная навигация" className="hidden lg:block">
            <ul className="flex items-center gap-8 xl:gap-10">
              {navItems.map((item) => {
                const active = activeId === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={navigate(item.id)}
                      aria-current={active ? 'true' : undefined}
                      className={cn(
                        'relative inline-flex min-h-[44px] items-center text-[0.92rem] font-medium transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:bg-wine after:transition-transform after:duration-300 hover:text-wine',
                        active ? 'text-wine after:scale-x-100' : 'text-ink/80 after:scale-x-0 hover:after:scale-x-100',
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink
              href="#catalog"
              onClick={navigate('catalog')}
              className="hidden sm:inline-flex"
              icon={<ArrowRight className="h-4 w-4" strokeWidth={1.75} />}
            >
              Заказать букет
            </ButtonLink>
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-wine hover:text-wine lg:hidden"
            >
              {isOpen ? <X className="h-5 w-5" strokeWidth={1.75} /> : <Menu className="h-5 w-5" strokeWidth={1.75} />}
            </button>
          </div>
        </Container>
      </header>

      {isOpen ? (
        <div
          id="mobile-menu"
          className="animate-menu-in fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto overscroll-contain bg-cream lg:hidden"
        >
          <Container className="flex min-h-full flex-col py-6">
            <nav aria-label="Мобильная навигация">
              <ul className="flex flex-col">
                {navItems.map((item, index) => {
                  const active = activeId === item.id
                  return (
                    <li key={item.id} className="border-b border-line">
                      <a
                        ref={index === 0 ? firstLinkRef : undefined}
                        href={`#${item.id}`}
                        onClick={navigate(item.id)}
                        aria-current={active ? 'true' : undefined}
                        className={cn(
                          'flex min-h-[60px] items-center justify-between py-3 font-serif text-[2rem] leading-none transition-colors',
                          active ? 'text-wine' : 'text-ink hover:text-wine',
                        )}
                      >
                        {item.label}
                        <ArrowRight aria-hidden="true" className="h-5 w-5 opacity-50" strokeWidth={1.5} />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="mt-auto flex flex-col gap-3 pt-10">
              <ButtonLink href="#catalog" onClick={navigate('catalog')} size="lg" fullWidth>
                Заказать букет
              </ButtonLink>
              <ButtonLink
                href={createWhatsAppLink(generalOrderMessage)}
                external
                variant="secondary"
                size="lg"
                fullWidth
                icon={<MessageCircle className="h-4 w-4" strokeWidth={1.75} />}
              >
                Написать в WhatsApp
              </ButtonLink>
              <p className="pt-2 text-center text-sm text-muted">{siteConfig.phoneDisplay} · демо-номер</p>
            </div>
          </Container>
        </div>
      ) : null}
    </>
  )
}
