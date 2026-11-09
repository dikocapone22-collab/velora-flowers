import type { ReactNode } from 'react'
import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { InstagramIcon } from '../components/InstagramIcon'
import { Reveal } from '../components/Reveal'
import { DemoBadge, DemoNote, SectionHeading } from '../components/Typography'
import { siteConfig } from '../config/site'
import { createWhatsAppLink, generalOrderMessage } from '../lib/whatsapp'

interface ContactRowProps {
  icon: ReactNode
  label: string
  children: ReactNode
}

function ContactRow({ icon, label, children }: ContactRowProps) {
  return (
    <div className="flex gap-4 border-b border-line py-5 first:pt-0 last:border-b-0">
      <span aria-hidden="true" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-wine">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <dt className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          {label}
          <DemoBadge />
        </dt>
        <dd className="mt-1.5 break-words text-base text-ink">{children}</dd>
      </div>
    </div>
  )
}

const linkClass = 'inline-flex min-h-[32px] items-center transition-colors hover:text-wine'
const iconClass = 'h-5 w-5'

export function Contacts() {
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="py-20 sm:py-24 lg:py-32">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading
              id="contacts-title"
              eyebrow="Контакты"
              title="Свяжитесь с нами"
              description="Ответим на вопросы, поможем выбрать букет и согласуем детали доставки."
            />
          </Reveal>

          <Reveal delay={80} className="mt-10">
            <dl>
              <ContactRow icon={<Phone className={iconClass} strokeWidth={1.6} />} label="Телефон">
                <a href={siteConfig.phoneHref} className={linkClass}>
                  {siteConfig.phoneDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={<MessageCircle className={iconClass} strokeWidth={1.6} />} label="WhatsApp">
                <a href={createWhatsAppLink(generalOrderMessage)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {siteConfig.whatsappDisplay}
                </a>
              </ContactRow>
              <ContactRow icon={<InstagramIcon className={iconClass} />} label="Instagram">
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {siteConfig.instagramHandle}
                </a>
              </ContactRow>
              <ContactRow icon={<MapPin className={iconClass} strokeWidth={1.6} />} label="Адрес">
                {siteConfig.address}
              </ContactRow>
              <ContactRow icon={<Clock className={iconClass} strokeWidth={1.6} />} label="Время работы">
                <span className="flex flex-col gap-1">
                  {siteConfig.workingHours.map((row) => (
                    <span key={row.days} className="flex flex-wrap gap-x-3">
                      <span className="text-muted">{row.days}</span>
                      <span className="tabular-nums">{row.time}</span>
                    </span>
                  ))}
                </span>
              </ContactRow>
            </dl>
          </Reveal>

          <Reveal delay={120} className="mt-6">
            <DemoNote>Все контакты на странице — демонстрационные заглушки. Адрес и график не являются реальными.</DemoNote>
          </Reveal>
        </div>

        <Reveal delay={100} className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between gap-10 rounded-[2rem] bg-wine p-8 text-cream sm:p-10 lg:sticky lg:top-28 lg:h-auto">
            <div>
              <MessageCircle aria-hidden="true" className="h-9 w-9 text-powder" strokeWidth={1.4} />
              <h3 className="mt-6 font-serif text-3xl font-medium leading-tight sm:text-4xl">Напишите нам в WhatsApp</h3>
              <p className="mt-4 leading-relaxed text-cream/80">
                Самый быстрый способ заказать букет: флорист подскажет наличие цветов и согласует время доставки.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ButtonLink
                href={createWhatsAppLink(generalOrderMessage)}
                external
                variant="light"
                size="lg"
                fullWidth
                icon={<MessageCircle className="h-4 w-4" strokeWidth={1.75} />}
              >
                Написать в WhatsApp
              </ButtonLink>
              <ButtonLink
                href={siteConfig.phoneHref}
                variant="outlineLight"
                size="lg"
                fullWidth
                icon={<Phone className="h-4 w-4" strokeWidth={1.75} />}
              >
                Позвонить
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
