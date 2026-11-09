import {
  ClipboardList,
  Flower2,
  HeartHandshake,
  Leaf,
  MessageCircle,
  Truck,
  type LucideIcon,
} from 'lucide-react'

export interface IconItem {
  icon: LucideIcon
  title: string
  text: string
}

export const advantages: IconItem[] = [
  {
    icon: Flower2,
    title: 'Авторские композиции',
    text: 'Каждый букет собирается вручную — с продуманной формой, палитрой и настроением.',
  },
  {
    icon: Leaf,
    title: 'Свежие цветы',
    text: 'Подбираем цветы с вниманием к их состоянию и собираем композицию незадолго до передачи.',
  },
  {
    icon: HeartHandshake,
    title: 'Индивидуальный подход',
    text: 'Учитываем повод, пожелания и бюджет, чтобы букет подходил именно вашему моменту.',
  },
  {
    icon: MessageCircle,
    title: 'Удобный заказ',
    text: 'Выберите букет на сайте — сообщение с названием и ценой сразу откроется в WhatsApp.',
  },
]

export const deliverySteps: IconItem[] = [
  {
    icon: Flower2,
    title: 'Выберите букет',
    text: 'Откройте каталог и выберите композицию — или опишите идею для индивидуального букета.',
  },
  {
    icon: MessageCircle,
    title: 'Напишите в WhatsApp',
    text: 'Нажмите «Заказать» — сообщение с названием и ценой букета сформируется автоматически.',
  },
  {
    icon: ClipboardList,
    title: 'Согласуйте детали',
    text: 'Менеджер уточнит наличие цветов, дату, адрес, текст открытки и способ оплаты.',
  },
  {
    icon: Truck,
    title: 'Получите букет',
    text: 'Букет доставят по указанному адресу в Алматы или передадут другим способом — по договорённости.',
  },
]

export interface Testimonial {
  name: string
  occasion: string
  text: string
}

/** ДЕМОНСТРАЦИОННЫЕ отзывы для макета — не настоящие отзывы покупателей. */
export const testimonials: Testimonial[] = [
  {
    name: 'Анна',
    occasion: 'Повод: день рождения',
    text: 'Нежные оттенки, аккуратная упаковка и очень приятное общение в WhatsApp. Букет стал главным украшением праздника.',
  },
  {
    name: 'Дмитрий',
    occasion: 'Повод: годовщина',
    text: 'Помогли быстро выбрать композицию под бюджет и настроение. Всё было аккуратно и со вкусом.',
  },
  {
    name: 'Айгерим',
    occasion: 'Повод: без повода',
    text: 'Хотелось удивить маму просто так. Флорист предложил сочетание, о котором я бы не подумала сама.',
  },
]

export const aboutPrinciples = [
  { number: '01', title: 'Повод', text: 'Начинаем с вашей истории и настроения.' },
  { number: '02', title: 'Баланс', text: 'Гармония оттенков, форм и фактур.' },
  { number: '03', title: 'Детали', text: 'Упаковка, лента и открытка — в одном стиле.' },
] as const
