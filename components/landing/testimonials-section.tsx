"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Class 12 Student",
    location: "Mumbai",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "WhatNext helped me realize that I'm perfect for computer science! The AI assessment was so accurate, and the MPC simulation gave me confidence in my choice. Now I'm preparing for JEE with a clear goal.",
    highlight: "95% career match accuracy",
    stream: "MPC → Engineering",
  },
  {
    name: "Rajesh Kumar",
    role: "Parent",
    location: "Delhi",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "As a parent, I was worried about my son's career choices. WhatNext's parent-child alignment feature helped us understand each other better and find common ground. Excellent platform!",
    highlight: "Improved family communication",
    stream: "Parent Perspective",
  },
  {
    name: "Anita Patel",
    role: "Class 11 Student",
    location: "Bangalore",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "I was confused between BiPC and Commerce. The stream simulations were amazing! I could actually experience what studying each stream would be like. Chose BiPC and loving it!",
    highlight: "Clear stream selection",
    stream: "BiPC → Medical",
  },
  {
    name: "Vikram Singh",
    role: "Class 12 Student",
    location: "Pune",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The AI mentor feature is incredible! It's like having a personal career counselor available 24/7. Got great advice on college applications and entrance exam preparation.",
    highlight: "24/7 AI mentorship",
    stream: "Commerce → CA",
  },
  {
    name: "Meera Reddy",
    role: "Parent",
    location: "Hyderabad",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "My daughter was interested in arts, but I had concerns. WhatNext showed us amazing career opportunities in creative fields with good prospects. We're both happy with her choice now!",
    highlight: "Discovered new opportunities",
    stream: "Arts → Design",
  },
  {
    name: "Arjun Mehta",
    role: "Class 11 Student",
    location: "Chennai",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "The career roadmap feature is fantastic! It shows exactly what I need to do from Class 11 to my dream job. Having a clear plan makes me feel so much more confident about my future.",
    highlight: "Clear career roadmap",
    stream: "MPC → Data Science",
  },
]

export function TestimonialsSection() {
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
            Success Stories
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Students & Parents
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              Say About Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of students and families who have found clarity and confidence in their career decisions with
            WhatNext's AI-powered guidance.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Quote Icon */}
                    <Quote className="w-8 h-8 text-blue-500 opacity-50" />

                    {/* Rating */}
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 leading-relaxed">"{testimonial.text}"</p>

                    {/* Highlight */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-700">✨ {testimonial.highlight}</p>
                    </div>

                    {/* User Info */}
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                        <div className="text-xs text-gray-500">{testimonial.location}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {testimonial.stream}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10,000+</div>
              <div className="text-sm text-gray-600">Students Guided</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
              <div className="text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-sm text-gray-600">Career Paths</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
              <div className="text-sm text-gray-600">AI Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
