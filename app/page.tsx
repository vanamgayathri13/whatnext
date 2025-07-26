import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { HowItWorksSection } from "@/components/landing/how-it-works-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { CTASection } from "@/components/landing/cta-section"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ChatBot } from "@/components/chatbot/chat-bot"
import { GuestAssessmentBanner } from "@/components/layout/guest-assessment-banner"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <GuestAssessmentBanner />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}
