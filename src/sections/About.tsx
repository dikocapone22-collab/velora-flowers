import about800 from '../assets/images/about-800.webp'
import about1200 from '../assets/images/about-1200.webp'
import { Container } from '../components/Container'
import { Reveal } from '../components/Reveal'
import { SectionHeading } from '../components/Typography'
import { aboutPrinciples } from '../data/content'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-24 lg:py-32">
      <Container className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative mx-auto w-full max-w-md sm:max-w-lg lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="absolute -bottom-4 -left-4 right-6 top-6 rounded-[2rem] border border-wine/25 sm:-bottom-5 sm:-left-5" />
          <div className="relative overflow-hidden rounded-[2rem] bg-sand">
            <img
              src={about1200}
              srcSet={`${about800} 800w, ${about1200} 1200w`}
              sizes="(min-width: 1024px) 38vw, (min-width: 640px) 32rem, 92vw"
              alt="Флористическая композиция в низкой вазе на рабочем столе мастерской"
              width={1200}
              height={1500}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
            <span className="absolute bottom-4 left-4 rounded-full bg-paper/95 px-4 py-2 text-xs font-medium text-ink">
              Флористическая мастерская
            </span>
          </div>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading id="about-title" eyebrow="О нас" title="Искусство дарить эмоции" />
          </Reveal>
          <Reveal delay={100} className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              VELORA FLOWERS — цветочная студия, для которой букет — это не набор цветов, а способ сказать то, что сложно
              выразить словами. Мы собираем композиции в спокойной европейской эстетике: без лишнего декора, с
              вниманием к цвету, форме и фактуре.
            </p>
            <p>
              Каждый заказ начинается с разговора: кому предназначен букет, какой повод и настроение. Так мы подбираем
              сочетание, которое подходит именно вашей истории — от классических роз до смелых авторских решений.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-3">
            {aboutPrinciples.map((item, index) => (
              <Reveal as="li" key={item.number} delay={index * 90}>
                <span className="font-serif text-3xl text-wine">{item.number}</span>
                <h3 className="mt-2 text-base font-semibold text-ink">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
