"use client"

import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-20 pb-16">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Badge */}
            <Badge variant="outline" className="mb-4">
              Contact Us
            </Badge>

            {/* Headline */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Get in Touch
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}
                  With Our Team
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Have questions about career guidance? Need help with our platform? Want to partner with us? We're here
                to help and would love to hear from you.
              </p>
            </div>

            {/* Quick Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="text-center p-6 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">support@whatnext.ai</p>
                <p className="text-gray-600 text-sm">partnerships@whatnext.ai</p>
              </div>

              <div className="text-center p-6 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm">+91 98765 43210</p>
                <p className="text-gray-600 text-sm">Mon-Fri, 9 AM - 6 PM IST</p>
              </div>

              <div className="text-center p-6 bg-white/50 rounded-lg backdrop-blur-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 text-sm">Available 24/7</p>
                <p className="text-gray-600 text-sm">Click the chat icon</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
