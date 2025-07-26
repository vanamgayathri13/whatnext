import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactFAQ } from "@/components/contact/contact-faq"
import { ChatBot } from "@/components/chatbot/chat-bot"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <ContactHero />
        <div className="grid lg:grid-cols-2 gap-12 container mx-auto px-4 py-20">
          <ContactForm />
          <ContactInfo />
        </div>
        <ContactFAQ />
      </main>
      <Footer />
      <ChatBot />
    </div>
  )
}
