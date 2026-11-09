import { siteConfig } from '../config/site'

const WHATSAPP_BASE_URL = 'https://wa.me/'

/** Форматирует цену: 18000 → «18 000 ₸» (с неразрывными пробелами). */
export function formatPrice(value: number): string {
  const digits = Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '\u00A0')
  return digits + '\u00A0₸'
}

/** Создаёт ссылку wa.me с заранее заполненным текстом сообщения. */
export function createWhatsAppLink(message: string): string {
  const number = siteConfig.whatsappNumber.replace(/\D/g, '')
  return WHATSAPP_BASE_URL + number + '?text=' + encodeURIComponent(message)
}

/** Текст заказа конкретного букета — с названием и ценой. */
export function bouquetOrderMessage(name: string, price: number): string {
  const plainPrice = formatPrice(price).replace(/\u00A0/g, ' ')
  return [
    'Здравствуйте!',
    'Хочу заказать букет «' + name + '» — ' + plainPrice + '.',
    'Подскажите, пожалуйста, детали заказа и доставки.',
  ].join('\n')
}

export const generalOrderMessage =
  'Здравствуйте! Хочу заказать букет в VELORA FLOWERS. Подскажите, пожалуйста, варианты.'

export const customOrderMessage =
  'Здравствуйте! Хочу заказать индивидуальный букет. Повод: …, пожелания по цветам: …, бюджет: …'
