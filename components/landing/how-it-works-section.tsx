"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Brain, Target, Users, TrendingUp, ArrowRight, Play } from "lucide-react"

const steps = [
  {
    id: 1,
    title: "Take Smart Assessment",
    description: "Answer personalized questions about your interests, strengths, and goals",
    icon: Brain,
    color: "bg-blue-500",
    route: "/assessment",
    duration: "10 min",
    features: ["AI-powered questions", "Personality analysis", "Interest mapping"],
  },
  {
    id: 2,
    title: "Explore Career Paths",
    description: "Discover careers tailored to your profile with detailed insights",
    icon: Target,
    color: "bg-green-500",
    route: "/simulation",
    duration: "5 min",
    features: ["Career matching", "Salary insights", "Growth prospects"],
  },
  {
    id: 3,
    title: "Get Personalized Roadmap",
    description: "Receive step-by-step guidance for your chosen career path",
    icon: TrendingUp,
    color: "bg-purple-500",
    route: "/dashboard",
    duration: "Always available",
    features: ["Custom roadmap", "Milestone tracking", "Resource library"],
  },
  {
    id: 4,
    title: "Connect with AI Mentor",
    description: "Chat with AI mentors specialized in your field of interest",
    icon: Users,
    color: "bg-orange-500",
    route: "/mentorship",
    duration: "24/7 support",
    features: ["Expert guidance", "Career advice", "Skill development"],
  },
]

export default function HowItWorksSection() {
  const router = useRouter()

  const handleTryStep = (route: string) => {
    router.push(route)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            How It Works
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Journey to Career Clarity</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform guides you through a comprehensive career discovery process
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <Card
                key={step.id}
                className="relative group hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <CardContent className="p-6">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full border-4 border-blue-500 flex items-center justify-center text-sm font-bold text-blue-500">
                    {step.id}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${step.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  {/* Duration Badge */}
                  <Badge variant="secondary" className="mb-3 text-xs">
                    {step.duration}
                  </Badge>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{step.description}</p>

                  {/* Features */}
                  <ul className="space-y-1 mb-4">
                    {step.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-gray-500 flex items-center">
                        <div className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Try Button */}
                  <Button
                    onClick={() => handleTryStep(step.route)}
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 transition-colors"
                  >
                    <Play className="w-3 h-3 mr-2" />
                    Try Step {step.id}
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of students who have discovered their perfect career path with our AI-powered guidance
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => handleTryStep("/assessment")}
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100"
              >
                Start Free Assessment
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                onClick={() => handleTryStep("/get-started")}
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-blue-600"
              >
                Explore All Features
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HowItWorksSection }
