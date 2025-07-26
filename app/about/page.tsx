import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AboutHero } from "@/components/about/about-hero"
import { AboutMission } from "@/components/about/about-mission"
import { AboutTeam } from "@/components/about/about-team"
import { AboutValues } from "@/components/about/about-values"
import { AboutStats } from "@/components/about/about-stats"
import { ChatBot } from "@/components/chatbot/chat-bot"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutStats />
        <AboutTeam />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}
