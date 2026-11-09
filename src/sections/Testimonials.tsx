import { Quote } from 'lucide-react'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { DemoBadge, DemoNote, SectionHeading } from '../components/Typography'
import { testimonials } from '../data/content'

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="py-20 sm:py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            id="testimonials-title"
            eyebrow="Отзывы"
            title="Место для ваших историй"
            align="center"
          />
        </Reveal>
        <Reveal delay={80} className="mt-6 flex justify-center">
          <DemoNote className="max-w-xl">
            Это примеры для макета, а не настоящие отзывы покупателей. Перед запуском замените их реальными отзывами с разрешения клиентов.
          </DemoNote>
        </Reveal>

        <ul className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal as="li" key={item.name} delay={index * 90} className="h-full">
              <figure className="flex h-full flex-col rounded-[1.75rem] border border-line bg-paper p-7 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <Quote aria-hidden="true" className="h-7 w-7 text-powder" strokeWidth={1.5} />
                  <DemoBadge>Пример для макета</DemoBadge>
                </div>
                <blockquote className="mt-6 flex-1 font-serif text-xl leading-snug text-ink sm:text-[1.35rem]">
                  «{item.text}»
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-5">
                  <span className="block font-semibold text-ink">{item.name}</span>
                  <span className="mt-0.5 block text-sm text-muted">{item.occasion}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
