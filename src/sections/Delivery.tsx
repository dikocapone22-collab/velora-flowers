import { ArrowRight, Info, MessageCircle } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/Typography'
import { deliverySteps } from '../data/content'
import { createWhatsAppLink, generalOrderMessage } from '../lib/whatsapp'

export function Delivery() {
  return (
    <section id="delivery" aria-labelledby="delivery-title" className="bg-paper py-20 sm:py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="delivery-title"
            eyebrow="Доставка"
            title="Как проходит заказ"
            description="Четыре простых шага — от выбора букета до момента, когда он окажется в руках получателя."
          />
        </Reveal>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {deliverySteps.map(({ icon: Icon, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 80} className="h-full">
              <div className="flex h-full flex-col rounded-[1.75rem] border border-line bg-cream p-7">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl leading-none text-wine">{String(index + 1).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" className="h-6 w-6 text-ink/60" strokeWidth={1.5} />
                </div>
                <h3 className="mt-8 text-lg font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10">
          <div className="flex flex-col gap-6 rounded-[1.75rem] bg-blush p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <Info aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-wine" strokeWidth={1.75} />
              <p className="max-w-2xl text-[0.95rem] leading-relaxed text-ink/80">
                Доставка по Алматы. Время, стоимость и зона доставки согласуются индивидуально при оформлении
                заказа. Онлайн-оплаты на сайте нет — все детали обсуждаются с флористом в WhatsApp.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <ButtonLink href="#catalog" variant="secondary" icon={<ArrowRight className="h-4 w-4" strokeWidth={1.75} />}>
                К каталогу
              </ButtonLink>
              <ButtonLink
                href={createWhatsAppLink(generalOrderMessage)}
                external
                icon={<MessageCircle className="h-4 w-4" strokeWidth={1.75} />}
              >
                Уточнить детали
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
