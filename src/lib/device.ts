type NavigatorWithHints = Navigator & {
  deviceMemory?: number
  connection?: { saveData?: boolean; effectiveType?: string }
}

/**
 * Определяет слабое устройство или медленную сеть.
 * В этом случае на <html> добавляется класс `lite`, который отключает
 * декоративные анимации (см. index.css). Контент и функции не меняются.
 */
export function applyPerformanceMode(): void {
  if (typeof navigator === 'undefined') return
  const nav = navigator as NavigatorWithHints

  const lowCpu = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency <= 2
  const lowMemory = typeof nav.deviceMemory === 'number' && nav.deviceMemory <= 2
  const saveData = nav.connection?.saveData === true
  const slowNetwork = nav.connection?.effectiveType === 'slow-2g' || nav.connection?.effectiveType === '2g'

  if (lowCpu || lowMemory || saveData || slowNetwork) {
    document.documentElement.classList.add('lite')
  }
}
