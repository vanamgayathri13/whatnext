"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Lightbulb, Shield, Target, Zap } from "lucide-react"
import { motion } from "framer-motion"

const values = [
  {
    icon: Heart,
    title: "Student-Centric",
    description: "Every decision we make is guided by what's best for students and their future success.",
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously innovate to provide cutting-edge solutions for career guidance.",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    icon: Shield,
    title: "Trust & Privacy",
    description: "We protect student data with the highest security standards and complete transparency.",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "Career guidance should be accessible to every student, regardless of background or location.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Target,
    title: "Accuracy",
    description: "We strive for the highest accuracy in our assessments and recommendations.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    icon: Zap,
    title: "Empowerment",
    description: "We empower students to make confident, informed decisions about their future.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
]

export function AboutValues() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Our Values
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              What Drives Us
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Every Day
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our core values shape everything we do, from product development to student interactions.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 ${value.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
                    >
                      <value.icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
