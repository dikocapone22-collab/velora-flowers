import { Sparkles } from 'lucide-react'
import { BouquetCard } from '../components/BouquetCard'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { DemoNote, SectionHeading } from '../components/Typography'
import { bouquets } from '../data/bouquets'
import { createWhatsAppLink, customOrderMessage } from '../lib/whatsapp'

export function Catalog() {
  return (
    <section id="catalog" aria-labelledby="catalog-title" className="bg-paper py-20 sm:py-24 lg:py-32">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading
              id="catalog-title"
              eyebrow="Каталог"
              title="Авторские букеты для любого повода"
              description="Выберите композицию и нажмите «Заказать» — мы получим сообщение в WhatsApp с названием и ценой букета."
            />
          </Reveal>
          <Reveal delay={100}>
            <DemoNote className="max-w-xs">Изображения и состав — демонстрационные. Актуальный ассортимент уточняйте при заказе.</DemoNote>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {bouquets.map((bouquet, index) => (
            <Reveal as="li" key={bouquet.id} delay={(index % 3) * 90} className="h-full">
              <BouquetCard bouquet={bouquet} />
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-16 lg:mt-20">
          <div className="flex flex-col gap-6 rounded-[1.75rem] border border-line bg-cream p-6 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush text-wine">
                <Sparkles aria-hidden="true" className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-serif text-2xl font-medium text-ink sm:text-3xl">Не нашли свой букет?</h3>
                <p className="mt-2 max-w-xl text-muted">
                  Расскажите о поводе, любимых цветах и бюджете — флорист соберёт композицию специально для вас.
                </p>
              </div>
            </div>
            <ButtonLink
              href={createWhatsAppLink(customOrderMessage)}
              external
              size="lg"
              className="w-full shrink-0 sm:w-auto"
            >
              Индивидуальный букет
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
