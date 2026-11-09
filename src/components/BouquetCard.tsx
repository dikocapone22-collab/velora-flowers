import { ArrowUpRight } from 'lucide-react'
import type { Bouquet } from '../data/bouquets'
import { bouquetOrderMessage, createWhatsAppLink, formatPrice } from '../lib/whatsapp'
import { ButtonLink } from './Button'

export function BouquetCard({ bouquet }: { bouquet: Bouquet }) {
  const { id, name, price, description, composition, tag, image } = bouquet
  const titleId = `bouquet-${id}`

  return (
    <article aria-labelledby={titleId} className="group/card flex h-full flex-col">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-sand">
        <img
          src={image.src}
          srcSet={image.srcSet}
          sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          alt={image.alt}
          width={800}
          height={1000}
          loading="lazy"
          decoding="async"
          className="img-zoom aspect-[4/5] h-auto w-full object-cover transition-transform duration-700 ease-soft group-hover/card:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-paper/95 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-wine">
          {tag}
        </span>
      </div>

      <div className="flex flex-1 flex-col pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 id={titleId} className="font-serif text-[1.85rem] font-medium leading-tight text-ink">
            {name}
          </h3>
          <p className="text-lg font-semibold tabular-nums text-wine">
            <span className="sr-only">Цена: </span>
            {formatPrice(price)}
          </p>
        </div>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{description}</p>
        <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-ink/70">{composition}</p>

        <div className="mt-auto pt-6">
          <ButtonLink
            href={createWhatsAppLink(bouquetOrderMessage(name, price))}
            external
            variant="secondary"
            fullWidth
            aria-label={`Заказать букет ${name} за ${formatPrice(price)} в WhatsApp`}
            icon={<ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />}
            className="group-hover/card:border-wine group-hover/card:bg-wine group-hover/card:text-cream"
          >
            Заказать
          </ButtonLink>
        </div>
      </div>
    </article>
  )
}
