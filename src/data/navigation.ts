export const navItems = [
  { id: 'home', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'about', label: 'О нас' },
  { id: 'delivery', label: 'Доставка' },
  { id: 'contacts', label: 'Контакты' },
] as const

export type SectionId = (typeof navItems)[number]['id']

export const sectionIds: readonly SectionId[] = navItems.map((item) => item.id)
