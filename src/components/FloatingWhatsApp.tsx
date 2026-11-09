import { MessageCircle } from 'lucide-react'
import { useScrolled } from '../hooks/useScrolled'
import { cn } from '../lib/cn'
import { createWhatsAppLink, generalOrderMessage } from '../lib/whatsapp'

/** Плавающая кнопка WhatsApp — появляется после первого экрана. */
export function FloatingWhatsApp() {
  const visible = useScrolled(640)

  return (
    <a
      href={createWhatsAppLink(generalOrderMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Написать в WhatsApp"
      aria-hidden={visible ? undefined : true}
      tabIndex={visible ? undefined : -1}
      style={{ bottom: 'max(1rem, env(safe-area-inset-bottom))' }}
      className={cn(
        'fixed right-4 z-30 inline-flex h-14 w-14 items-center justify-center rounded-full bg-wine text-cream shadow-[0_14px_30px_-12px_rgba(100,29,50,0.7)] transition-[opacity,transform,background-color] duration-300 ease-soft hover:bg-wine-dark sm:right-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
      )}
    >
      <MessageCircle aria-hidden="true" className="h-6 w-6" strokeWidth={1.75} />
    </a>
  )
}
