/** Плавно прокручивает к разделу и обновляет якорь в адресной строке. */
export function scrollToSection(id: string): void {
  const target = document.getElementById(id)
  if (!target) return

  // На слабых устройствах (класс lite) и при «уменьшении движения» прыгаем сразу, без анимации
  const reduceMotion =
    document.documentElement.classList.contains('lite') ||
    (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  // Снимаем блокировку прокрутки, если она осталась от мобильного меню
  document.body.style.overflow = ''
  try {
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  } catch {
    // Старые браузеры без поддержки опций scrollIntoView
    target.scrollIntoView(true)
  }

  if (window.location.hash !== `#${id}`) {
    window.history.pushState(null, '', `#${id}`)
  }
}
