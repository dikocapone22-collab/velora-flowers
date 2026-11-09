# VELORA FLOWERS — сайт цветочной студии

Одностраничный сайт премиальной цветочной студии в Алматы: каталог авторских букетов, заказ через WhatsApp, адаптивная вёрстка от 320 px.

> Учебный / демонстрационный проект. Контакты, адрес, график работы, отзывы и изображения букетов — **заглушки**. Перед публикацией для реального бизнеса замените их (см. раздел «Что заменить»).

## Как посмотреть сайт

- **Сайт на GitHub Pages:** https://dikocapone22-collab.github.io/velora-flowers/
  Сайт собирается автоматически (вкладка **Actions**) и публикуется в ветку `gh-pages`. Один раз нужно включить Pages: **Settings → Pages → Source: Deploy from a branch → Branch: `gh-pages`, папка `/ (root)` → Save**.
- **Онлайн-редактор StackBlitz** (запускает проект прямо в браузере): https://stackblitz.com/github/dikocapone22-collab/velora-flowers
- **Код в VS Code в браузере:** https://github.dev/dikocapone22-collab/velora-flowers (или нажмите клавишу `.` на странице репозитория)
- **Локально:** `git clone https://github.com/dikocapone22-collab/velora-flowers.git`, затем `npm install` и `npm run dev`.

При первом запуске workflow сам генерирует иллюстрации-заглушки (`scripts/generate-placeholders.py`) и добавляет их в репозиторий.

## Стек

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 3.4 (+ PostCSS, Autoprefixer)
- Lucide React (иконки)
- sharp — только для скрипта оптимизации изображений (dev-зависимость)

Framer Motion сознательно **не используется**: анимации появления сделаны на CSS + IntersectionObserver. Это заметно уменьшает размер JS и нагрузку на слабые устройства.

## Запуск

Нужен Node.js 18.18+ (рекомендуется 20 или 22).

```bash
npm install
npm run dev        # локальный сервер разработки: http://localhost:5173
npm run build      # проверка типов + production-сборка в папку dist/
npm run preview    # просмотр собранной версии
```

## Структура

```
src/
  App.tsx, main.tsx, index.css
  components/   Header, Footer, BouquetCard, Button, Reveal, Typography, Logo, FloatingWhatsApp…
  sections/     Hero, Catalog, About, Advantages, Testimonials, Delivery, Contacts
  data/         bouquets.ts (каталог), content.ts (тексты, преимущества, отзывы, шаги доставки), navigation.ts
  config/       site.ts — контакты и номер WhatsApp
  lib/          whatsapp.ts, scroll.ts, device.ts, cn.ts
  hooks/        useActiveSection, useScrolled
  assets/       images/ (готовые WebP), source/ (исходники для оптимизации)
scripts/        optimize-images.mjs, generate-placeholders.py
public/         favicon.svg, og-image.jpg, robots.txt
.github/        workflows/deploy.yml — сборка и публикация на GitHub Pages
```

## Функциональность

- Фиксированная шапка, подсветка активного раздела, мобильное меню (блокировка прокрутки, закрытие по Esc, по ссылке и при ресайзе, управление фокусом).
- Плавная прокрутка к разделам с учётом высоты шапки.
- Каталог из 6 букетов: кнопка «Заказать» открывает WhatsApp с готовым сообщением, где указаны название и цена букета.
- Кнопки «Выбрать букет» → каталог, «Связаться с нами» → контакты, «Индивидуальный букет» и плавающая кнопка WhatsApp.
- Анимации появления при прокрутке, hover-эффекты карточек.
- Онлайн-оплаты и корзины нет — заказ оформляется в переписке.
- Семантическая разметка, alt у всех изображений, skip-link, видимый фокус, контраст текста, мета-теги и Open Graph.

## Оптимизация для слабых телефонов и ПК

- **Лёгкий JS:** без Framer Motion и других тяжёлых библиотек. Иконки lucide подключаются поштучно (tree-shaking).
- **Режим `lite`:** при запуске `src/lib/device.ts` проверяет устройство. Если у него ≤ 2 ядер или ≤ 2 ГБ памяти, включено «Экономия трафика» или сеть 2G, на `<html>` вешается класс `lite`. В этом режиме отключаются анимации появления, zoom-эффекты карточек и плавная прокрутка (переход к разделу происходит мгновенно).
- **`prefers-reduced-motion`:** если в системе выбрано «уменьшить движение», анимации тоже отключаются.
- **Без дорогих эффектов:** нет `backdrop-filter: blur`, `filter: blur` и тяжёлых теней. Фоновое свечение сделано обычным `radial-gradient`.
- **Изображения:** формат WebP, `srcset` и `sizes` (телефон грузит маленькую версию), `loading="lazy"` для всего, кроме первого экрана. У главного фото `fetchpriority="high"`. Явные `width`/`height` убирают «прыжки» вёрстки.
- **Старые браузеры:** сборка под `es2019` / Chrome 70 / Safari 13 / Firefox 78. Tailwind 3 с Autoprefixer работает там, где Tailwind 4 не поддерживается. Есть запасные варианты для `overflow-x: clip` и `scrollIntoView`.
- **Шрифты** подключены с `display=swap` и preconnect: текст виден сразу системным шрифтом.
- Нужна поддержка совсем старых браузеров (Android 4.x, IE)? Добавьте `@vitejs/plugin-legacy`. Это увеличит сборку, поэтому по умолчанию плагин не подключён.

## Что заменить перед реальным запуском

1. **Контакты и WhatsApp:** `src/config/site.ts`. Номер WhatsApp задаётся только цифрами в международном формате (`77XXXXXXXXX`). Там же телефон, Instagram, адрес и график.
2. **Фотографии.** Сейчас в `src/assets/images/` лежат стилизованные иллюстрации-заглушки, а не фото. Положите реальные снимки в `src/assets/source/` с именами `hero`, `about`, `red-romance`, `pink-dream`, `white-elegance`, `summer-mood`, `royal-roses`, `tenderness` и выполните `npm run images`. Скрипт обрежет их до 4:5 и сохранит оптимизированные WebP.
3. **Букеты, цены, описания:** `src/data/bouquets.ts`.
4. **Отзывы:** `src/data/content.ts`. Сейчас там примеры для макета. Публикуйте только настоящие отзывы и с согласия клиентов, а после замены уберите пометки «Пример для макета» в `src/sections/Testimonials.tsx`.
5. **Условия доставки** (сроки, стоимость, зона): `src/data/content.ts` и `src/sections/Delivery.tsx`.
6. **SEO:** `index.html` (title, description, домен в `og:url` / `og:image`), `public/og-image.jpg` (1200×630).

## Публикация

**GitHub Pages (уже настроено):** workflow `.github/workflows/deploy.yml` на каждый push в `main` собирает проект с `--base=/velora-flowers/` и публикует `dist` в ветку `gh-pages`.

**Vercel:** «Add New Project» → выберите репозиторий. Vite определится автоматически (Build: `npm run build`, Output: `dist`).

**Netlify:** «Add new site» → «Import from Git» (Build command `npm run build`, Publish directory `dist`). Можно и без Git: выполните `npm run build` и перетащите папку `dist` в Netlify Drop.

**Любой хостинг:** после `npm run build` загрузите содержимое `dist/` в корень сайта. Это статические файлы, сервер не нужен.
