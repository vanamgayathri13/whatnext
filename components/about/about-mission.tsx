"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Heart, Lightbulb, Shield } from "lucide-react"
import { motion } from "framer-motion"

export function AboutMission() {
  return (
    <section className="py-20 bg-white">
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
              Our Mission
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Bridging the Gap Between
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {" "}
                Dreams and Reality
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We believe every student deserves personalized career guidance that considers their unique strengths,
              interests, and the realities of the modern job market.
            </p>
          </motion.div>

          {/* Mission Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <Brain className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To democratize access to high-quality career guidance by leveraging artificial intelligence and
                    making personalized career counseling available to every student, regardless of their background or
                    location. We aim to reduce career confusion and help students make informed decisions about their
                    future.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To create a world where every student has clarity about their career path and the confidence to
                    pursue it. We envision a future where career decisions are made based on data-driven insights,
                    personal strengths, and market realities, leading to more fulfilling and successful careers.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* The Problem We Solve */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Problem We're Solving</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                In India, millions of students face career confusion every year, leading to poor academic choices,
                unfulfilling careers, and wasted potential.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">70%</div>
                <p className="text-sm text-gray-600">Students are confused about career choices</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">60%</div>
                <p className="text-sm text-gray-600">Make decisions based on peer pressure</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">45%</div>
                <p className="text-sm text-gray-600">End up in careers they don't enjoy</p>
              </div>
            </div>
          </motion.div>

          {/* Our Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Approach</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">AI-Powered Analysis</h4>
                <p className="text-sm text-gray-600">
                  Advanced algorithms analyze personality, interests, and aptitude
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold mb-2">Personalized Insights</h4>
                <p className="text-sm text-gray-600">Tailored recommendations based on individual profiles</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold mb-2">Holistic Guidance</h4>
                <p className="text-sm text-gray-600">Considering family expectations and market realities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-semibold mb-2">Continuous Support</h4>
                <p className="text-sm text-gray-600">Ongoing mentorship and progress tracking</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
