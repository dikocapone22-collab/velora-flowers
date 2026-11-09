/**
 * Центральная конфигурация сайта.
 *
 * ВСЕ КОНТАКТЫ НИЖЕ — ДЕМОНСТРАЦИОННЫЕ ЗАГЛУШКИ (PLACEHOLDER).
 * Перед передачей клиенту замените их реальными данными.
 */
export const siteConfig = {
  brand: 'VELORA FLOWERS',
  city: 'Алматы',

  /**
   * Номер WhatsApp в международном формате: только цифры, без «+», пробелов и скобок.
   * Формат для Казахстана: 7XXXXXXXXXX.
   * Сейчас указан PLACEHOLDER — это не настоящий номер.
   */
  whatsappNumber: '77000000000',
  whatsappDisplay: '+7 700 000 00 00',

  /** Телефон (PLACEHOLDER) */
  phoneDisplay: '+7 (700) 000-00-00',
  phoneHref: 'tel:+77000000000',

  /** Instagram (PLACEHOLDER) — замените ник и ссылку на профиль студии */
  instagramHandle: '@your_instagram',
  instagramUrl: 'https://www.instagram.com/',

  /** Адрес (PLACEHOLDER) — реальный адрес не указан */
  address: 'Алматы — точный адрес будет указан позже',

  /** Время работы (ДЕМО-ДАННЫЕ) */
  workingHours: [
    { days: 'Пн — Пт', time: '09:00 — 20:00' },
    { days: 'Сб — Вс', time: '10:00 — 18:00' },
  ],
} as const
