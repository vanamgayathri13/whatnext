"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Brain, Target, Users, BookOpen, Clock, Star, ArrowRight } from "lucide-react"
import Link from "next/link"

const pathways = [
  {
    id: "assessment",
    title: "Smart Career Assessment",
    description: "Discover your ideal career path through AI-powered personality and interest analysis",
    icon: Brain,
    color: "from-blue-500 to-blue-600",
    duration: "10-15 minutes",
    difficulty: "Easy",
    popular: true,
    features: ["16 comprehensive questions", "AI personality analysis", "Career matching algorithm", "Instant results"],
    route: "/assessment",
  },
  {
    id: "simulation",
    title: "Career Path Simulation",
    description: "Explore different academic streams and their career outcomes interactively",
    icon: Target,
    color: "from-green-500 to-green-600",
    duration: "5-10 minutes",
    difficulty: "Easy",
    popular: false,
    features: ["Interactive stream exploration", "Career outcome predictions", "Salary insights", "Growth prospects"],
    route: "/simulation",
  },
  {
    id: "mentorship",
    title: "AI Career Mentorship",
    description: "Get personalized guidance from AI mentors specialized in various fields",
    icon: Users,
    color: "from-purple-500 to-purple-600",
    duration: "Ongoing",
    difficulty: "Medium",
    popular: false,
    features: ["24/7 AI mentor access", "Field-specific guidance", "Career roadmap creation", "Skill development tips"],
    route: "/mentorship",
  },
  {
    id: "full-access",
    title: "Complete Platform Access",
    description: "Sign up for full access to all features, progress tracking, and personalized dashboard",
    icon: BookOpen,
    color: "from-orange-500 to-orange-600",
    duration: "Lifetime",
    difficulty: "Easy",
    popular: false,
    features: ["All platform features", "Progress tracking", "Personalized dashboard", "Advanced analytics"],
    route: "/auth/login",
  },
]

export default function GetStartedPage() {
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null)
  const router = useRouter()

  const handlePathwaySelect = (pathway: (typeof pathways)[0]) => {
    setSelectedPathway(pathway.id)
    // Add a small delay for visual feedback
    setTimeout(() => {
      router.push(pathway.route)
    }, 300)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Badge variant="outline" className="px-3 py-1">
            Choose Your Path
          </Badge>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get Started with WhatNext AI</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose how you'd like to begin your career discovery journey. Each path is designed to provide valuable
            insights tailored to your needs.
          </p>
        </div>

        {/* Pathways Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {pathways.map((pathway) => {
            const Icon = pathway.icon
            const isSelected = selectedPathway === pathway.id

            return (
              <Card
                key={pathway.id}
                className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                  isSelected ? "border-blue-500 shadow-xl scale-105" : "border-transparent hover:border-blue-200"
                }`}
                onClick={() => handlePathwaySelect(pathway)}
              >
                {pathway.popular && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${pathway.color} flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                        <Clock className="w-3 h-3" />
                        {pathway.duration}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {pathway.difficulty}
                      </Badge>
                    </div>
                  </div>

                  <CardTitle className="text-xl mb-2">{pathway.title}</CardTitle>
                  <CardDescription className="text-gray-600">{pathway.description}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">What you'll get:</h4>
                      <ul className="space-y-1">
                        {pathway.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      className={`w-full bg-gradient-to-r ${pathway.color} hover:opacity-90 transition-all`}
                      disabled={isSelected}
                    >
                      {isSelected ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Starting...
                        </>
                      ) : (
                        <>
                          Start This Path
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Not sure which path to choose?</h3>
            <p className="text-gray-600 mb-6">
              We recommend starting with our Smart Career Assessment - it's quick, comprehensive, and gives you
              immediate insights into your career potential.
            </p>
            <Button
              onClick={() => handlePathwaySelect(pathways[0])}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Brain className="w-5 h-5 mr-2" />
              Start Recommended Assessment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
