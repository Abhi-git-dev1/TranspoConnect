import { Navbar } from '@/components/landing/navbar'
import { HeroSection } from '@/components/landing/hero-section'
import { ServicesSection } from '@/components/landing/services-section'
import { Testimonials } from '@/components/landing/testimonials'
import { Footer } from '@/components/landing/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <Testimonials />
      <Footer />
    </main>
  )
}
