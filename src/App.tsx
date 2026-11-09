import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { About } from './sections/About'
import { Advantages } from './sections/Advantages'
import { Catalog } from './sections/Catalog'
import { Contacts } from './sections/Contacts'
import { Delivery } from './sections/Delivery'
import { Hero } from './sections/Hero'
import { Testimonials } from './sections/Testimonials'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-wine focus:px-5 focus:py-3 focus:text-cream"
      >
        Перейти к содержанию
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Catalog />
        <About />
        <Advantages />
        <Testimonials />
        <Delivery />
        <Contacts />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  )
}
