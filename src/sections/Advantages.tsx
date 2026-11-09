import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/Typography'
import { advantages } from '../data/content'

export function Advantages() {
  return (
    <section aria-labelledby="advantages-title" className="bg-wine py-20 text-cream sm:py-24 lg:py-28">
      <Container>
        <Reveal>
          <SectionHeading
            id="advantages-title"
            eyebrow="Почему VELORA"
            title="Забота в каждой детали"
            tone="light"
          />
        </Reveal>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] bg-cream/15 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map(({ icon: Icon, title, text }, index) => (
            <Reveal as="li" key={title} delay={index * 80} className="bg-wine p-7 sm:p-8">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cream/25 text-powder">
                <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 font-serif text-2xl font-medium leading-tight">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">{text}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
