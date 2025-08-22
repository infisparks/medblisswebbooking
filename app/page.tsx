import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ServicesSection from "@/components/services-section"
import PackagesSection from "@/components/packages-section"
import OurLegacySection from "@/components/our-legacy-section"
import TestimonialsSection from "@/components/testimonials-section"
import AppDownloadSection from "@/components/app-download-section"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <PackagesSection />
      <OurLegacySection />
      <TestimonialsSection />
      <AppDownloadSection />
      <Footer />
    </main>
  )
}
