import redRomance480 from '../assets/images/red-romance-480.webp'
import redRomance800 from '../assets/images/red-romance-800.webp'
import pinkDream480 from '../assets/images/pink-dream-480.webp'
import pinkDream800 from '../assets/images/pink-dream-800.webp'
import whiteElegance480 from '../assets/images/white-elegance-480.webp'
import whiteElegance800 from '../assets/images/white-elegance-800.webp'
import summerMood480 from '../assets/images/summer-mood-480.webp'
import summerMood800 from '../assets/images/summer-mood-800.webp'
import royalRoses480 from '../assets/images/royal-roses-480.webp'
import royalRoses800 from '../assets/images/royal-roses-800.webp'
import tenderness480 from '../assets/images/tenderness-480.webp'
import tenderness800 from '../assets/images/tenderness-800.webp'

export interface BouquetImage {
  src: string
  srcSet: string
  alt: string
}

export interface Bouquet {
  id: string
  name: string
  /** Цена в тенге */
  price: number
  description: string
  composition: string
  tag: string
  image: BouquetImage
}

const picture = (small: string, large: string, alt: string): BouquetImage => ({
  src: large,
  srcSet: `${small} 480w, ${large} 800w`,
  alt,
})

export const bouquets: Bouquet[] = [
  {
    id: 'red-romance',
    name: 'Red Romance',
    price: 18000,
    description:
      'Классика чувств: алые розы в лаконичной упаковке. Для признаний, свиданий и важных слов.',
    composition: 'Красные розы · эвкалипт',
    tag: 'Классика',
    image: picture(redRomance480, redRomance800, 'Букет Red Romance: алые розы с зеленью в светлой упаковке'),
  },
  {
    id: 'pink-dream',
    name: 'Pink Dream',
    price: 22000,
    description:
      'Воздушная композиция в розовой гамме — нежная, лёгкая и с настроением весны.',
    composition: 'Розовые розы · кустовые розы · гипсофила',
    tag: 'Нежность',
    image: picture(pinkDream480, pinkDream800, 'Букет Pink Dream: розовые розы и гипсофила в нежной упаковке'),
  },
  {
    id: 'white-elegance',
    name: 'White Elegance',
    price: 25000,
    description:
      'Белоснежный букет с благородной зеленью — сдержанная элегантность для особых событий.',
    composition: 'Белые розы · зелень',
    tag: 'Монохром',
    image: picture(whiteElegance480, whiteElegance800, 'Букет White Elegance: белые розы с зелёными листьями'),
  },
  {
    id: 'summer-mood',
    name: 'Summer Mood',
    price: 15000,
    description:
      'Солнечный микс ярких сезонных цветов, который поднимает настроение с первого взгляда.',
    composition: 'Сезонные цветы в тёплых оттенках · ромашки',
    tag: 'Яркий',
    image: picture(summerMood480, summerMood800, 'Букет Summer Mood: жёлтые и оранжевые цветы с ромашками в крафтовой бумаге'),
  },
  {
    id: 'royal-roses',
    name: 'Royal Roses',
    price: 35000,
    description:
      'Пышный букет из глубоких бордовых роз — щедрый жест для самых значимых поводов.',
    composition: 'Бордовые розы · тёмная дизайнерская упаковка',
    tag: 'Signature',
    image: picture(royalRoses480, royalRoses800, 'Букет Royal Roses: пышные бордовые розы в тёмной упаковке с золотистой лентой'),
  },
  {
    id: 'tenderness',
    name: 'Tenderness',
    price: 20000,
    description:
      'Пудровые и кремовые оттенки в мягкой композиции — для мамы, подруги или просто без повода.',
    composition: 'Пудровые розы · кремовые розы · гипсофила',
    tag: 'Пастель',
    image: picture(tenderness480, tenderness800, 'Букет Tenderness: пудровые и кремовые розы с гипсофилой'),
  },
]
