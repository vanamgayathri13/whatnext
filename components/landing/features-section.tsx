"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Users, Target, BookOpen, MessageCircle, Calendar, TrendingUp, Zap, Shield } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Assessments",
    description: "Smart questionnaires that analyze your interests, aptitude, and personality using advanced AI",
    badge: "Core Feature",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: BookOpen,
    title: "Stream Simulations",
    description: "Interactive previews of MPC, BiPC, Commerce, and Arts streams with real tasks",
    badge: "Interactive",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Target,
    title: "Career Roadmaps",
    description: "Visual step-by-step paths from current grade to your dream career",
    badge: "Personalized",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Users,
    title: "Parent-Child Alignment",
    description: "Compare expectations and find common ground between students and parents",
    badge: "Family Focus",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    icon: MessageCircle,
    title: "AI Mentorship",
    description: "Chat with AI mentors based on real industry professionals",
    badge: "24/7 Support",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    icon: Calendar,
    title: "Gap Year Planning",
    description: "Smart recommendations for productive gap years with skill-building activities",
    badge: "Strategic",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your career exploration journey with detailed analytics",
    badge: "Analytics",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
  },
  {
    icon: Zap,
    title: "Motivation Nudges",
    description: "Personalized reminders and micro-tasks to keep you on track",
    badge: "Engagement",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Your data is protected with enterprise-grade security measures",
    badge: "Secure",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Comprehensive Platform
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Career Success
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform provides comprehensive tools and insights to guide students through their career
            exploration journey with confidence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg ${feature.bgColor}`}>
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Discover Your Perfect Career Path?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have already found their direction with WhatNext's AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Start Free Assessment
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all"
              >
                Learn More
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
