import { ArrowRight, Flower2, MessageCircle, Truck } from 'lucide-react'
import hero800 from '../assets/images/hero-800.webp'
import hero1200 from '../assets/images/hero-1200.webp'
import { ButtonLink } from '../components/Button'
import { Container } from '../components/Container'
import { Eyebrow } from '../components/Typography'
import { siteConfig } from '../config/site'
import { bouquets } from '../data/bouquets'
import { formatPrice } from '../lib/whatsapp'

const highlights = [
  { icon: Flower2, label: 'Авторские букеты' },
  { icon: Truck, label: 'Доставка по Алматы' },
  { icon: MessageCircle, label: 'Заказ в WhatsApp' },
]

const delay = (ms: number) => ({ animationDelay: `${ms}ms` })

export function Hero() {
  const featured = bouquets.find((bouquet) => bouquet.id === 'royal-roses')

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-20 pt-28 sm:pt-32 lg:flex lg:min-h-screen lg:items-center lg:pb-16 lg:pt-28"
    >
      {/* Мягкое свечение через radial-gradient — без дорогого filter: blur */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-48 -top-24 h-[40rem] w-[40rem] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(232,207,207,0.6), rgba(232,207,207,0))' }}
      />

      <Container className="relative grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="animate-fade-up">
            <Eyebrow>Цветочная студия · {siteConfig.city}</Eyebrow>
          </div>
          <h1
            id="hero-title"
            className="animate-fade-up mt-6 text-balance font-serif text-[2.5rem] font-medium leading-[1.04] tracking-[-0.02em] text-ink min-[380px]:text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5.25rem]"
            style={delay(100)}
          >
            Цветы, которые <em className="italic text-wine">говорят</em> за&nbsp;вас
          </h1>
          <p className="animate-fade-up mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg" style={delay(200)}>
            Создаём авторские букеты, которые превращают обычные моменты в особенные воспоминания.
          </p>
          <div className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row" style={delay(300)}>
            <ButtonLink href="#catalog" size="lg" icon={<ArrowRight className="h-4 w-4" strokeWidth={1.75} />}>
              Выбрать букет
            </ButtonLink>
            <ButtonLink href="#contacts" size="lg" variant="secondary">
              Связаться с нами
            </ButtonLink>
          </div>
          <ul className="animate-fade-up mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-line pt-6" style={delay(400)}>
            {highlights.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-ink/80">
                <Icon aria-hidden="true" className="h-4 w-4 text-wine" strokeWidth={1.75} />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-in relative mx-auto w-full max-w-md sm:max-w-lg lg:col-span-6 lg:max-w-none lg:pl-6" style={delay(150)}>
          <div className="overflow-hidden rounded-t-[999px] rounded-b-[2rem] bg-sand">
            <img
              src={hero1200}
              srcSet={`${hero800} 800w, ${hero1200} 1200w`}
              sizes="(min-width: 1024px) 46vw, (min-width: 640px) 32rem, 92vw"
              alt="Пышный авторский букет из бордовых, пудровых и кремовых роз"
              width={1200}
              height={1500}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] h-auto w-full object-cover"
            />
          </div>

          {featured ? (
            <a
              href="#catalog"
              className="group absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 rounded-2xl bg-paper/95 p-4 shadow-[0_20px_40px_-24px_rgba(37,35,33,0.5)] transition-transform duration-300 ease-soft hover:-translate-y-0.5 sm:bottom-6 sm:left-6 sm:right-auto sm:min-w-[18rem]"
            >
              <span className="min-w-0">
                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-wine">Signature</span>
                <span className="mt-1 block font-serif text-2xl leading-none text-ink">{featured.name}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="text-sm font-semibold tabular-nums text-ink">{formatPrice(featured.price)}</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-wine text-cream">
                  <ArrowRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.75} />
                </span>
              </span>
            </a>
          ) : null}
        </div>
      </Container>
    </section>
  )
}
