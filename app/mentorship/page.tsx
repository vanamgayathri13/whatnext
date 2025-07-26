"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, MessageCircle, Send, Bot, User, Star, Clock, Award, Brain } from "lucide-react"
import Link from "next/link"

const mentors = [
  {
    id: "tech-mentor",
    name: "TechGuide AI",
    specialty: "Technology & Engineering",
    avatar: "/placeholder.svg?height=40&width=40&text=TG",
    rating: 4.9,
    sessions: 1250,
    description: "Expert in software development, AI/ML, and engineering careers",
    expertise: ["Software Engineering", "Data Science", "AI/ML", "Cybersecurity"],
    color: "from-blue-500 to-blue-600",
  },
  {
    id: "business-mentor",
    name: "BizMentor AI",
    specialty: "Business & Finance",
    avatar: "/placeholder.svg?height=40&width=40&text=BM",
    rating: 4.8,
    sessions: 980,
    description: "Specialized in business strategy, finance, and entrepreneurship",
    expertise: ["Business Strategy", "Finance", "Marketing", "Entrepreneurship"],
    color: "from-green-500 to-green-600",
  },
  {
    id: "creative-mentor",
    name: "CreativeGuide AI",
    specialty: "Arts & Design",
    avatar: "/placeholder.svg?height=40&width=40&text=CG",
    rating: 4.7,
    sessions: 750,
    description: "Guidance for creative careers in design, arts, and media",
    expertise: ["UX/UI Design", "Graphic Design", "Content Creation", "Digital Arts"],
    color: "from-purple-500 to-purple-600",
  },
  {
    id: "health-mentor",
    name: "HealthCareer AI",
    specialty: "Healthcare & Medicine",
    avatar: "/placeholder.svg?height=40&width=40&text=HC",
    rating: 4.9,
    sessions: 1100,
    description: "Expert guidance for medical and healthcare career paths",
    expertise: ["Medicine", "Nursing", "Pharmacy", "Healthcare Management"],
    color: "from-red-500 to-red-600",
  },
]

const sampleMessages = [
  {
    type: "bot",
    content:
      "Hello! I'm your AI career mentor. I'm here to help you navigate your career journey. What would you like to discuss today?",
    timestamp: "Just now",
  },
]

export default function MentorshipPage() {
  const [selectedMentor, setSelectedMentor] = useState<(typeof mentors)[0] | null>(null)
  const [messages, setMessages] = useState(sampleMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const handleMentorSelect = (mentor: (typeof mentors)[0]) => {
    setSelectedMentor(mentor)
    setMessages([
      {
        type: "bot",
        content: `Hi! I'm ${mentor.name}, your AI mentor specializing in ${mentor.specialty}. I'm excited to help you explore career opportunities in this field. What specific questions do you have?`,
        timestamp: "Just now",
      },
    ])
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !selectedMentor) return

    const userMessage = {
      type: "user" as const,
      content: inputMessage,
      timestamp: "Just now",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on your interests, I'd recommend exploring these career paths...",
        "Let me share some insights about the current job market in this field...",
        "Here are some practical steps you can take to build skills in this area...",
        "I understand your concerns. Many students face similar challenges. Here's my advice...",
        "That's an excellent career choice! Let me tell you about the growth prospects and requirements...",
      ]

      const botMessage = {
        type: "bot" as const,
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: "Just now",
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Badge variant="outline" className="px-3 py-1">
            AI Career Mentorship
          </Badge>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Connect with AI Career Mentors</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get personalized guidance from AI mentors specialized in different career fields
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Mentor Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bot className="w-5 h-5 mr-2" />
                  Choose Your Mentor
                </CardTitle>
                <CardDescription>Select an AI mentor based on your career interests</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mentors.map((mentor) => (
                  <Card
                    key={mentor.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md border-2 ${
                      selectedMentor?.id === mentor.id
                        ? "border-blue-500 shadow-md"
                        : "border-transparent hover:border-blue-200"
                    }`}
                    onClick={() => handleMentorSelect(mentor)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={mentor.avatar || "/placeholder.svg"} alt={mentor.name} />
                          <AvatarFallback className={`bg-gradient-to-r ${mentor.color} text-white`}>
                            {mentor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm">{mentor.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">{mentor.specialty}</p>

                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              <Star className="w-3 h-3 text-yellow-500 mr-1" />
                              <span className="text-xs font-medium">{mentor.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="w-3 h-3 text-gray-400 mr-1" />
                              <span className="text-xs text-gray-600">{mentor.sessions}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {mentor.expertise.slice(0, 2).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs px-1 py-0">
                                {skill}
                              </Badge>
                            ))}
                            {mentor.expertise.length > 2 && (
                              <Badge variant="secondary" className="text-xs px-1 py-0">
                                +{mentor.expertise.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                {selectedMentor ? (
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedMentor.avatar || "/placeholder.svg"} alt={selectedMentor.name} />
                      <AvatarFallback className={`bg-gradient-to-r ${selectedMentor.color} text-white`}>
                        {selectedMentor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{selectedMentor.name}</CardTitle>
                      <CardDescription>{selectedMentor.specialty}</CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                        Online
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <CardTitle>Select a Mentor to Start</CardTitle>
                    <CardDescription>
                      Choose an AI mentor from the left panel to begin your conversation
                    </CardDescription>
                  </div>
                )}
              </CardHeader>

              {selectedMentor ? (
                <>
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`flex items-start gap-2 max-w-[80%] ${
                              message.type === "user" ? "flex-row-reverse" : "flex-row"
                            }`}
                          >
                            <Avatar className="w-8 h-8">
                              {message.type === "user" ? (
                                <AvatarFallback className="bg-blue-500 text-white">
                                  <User className="w-4 h-4" />
                                </AvatarFallback>
                              ) : (
                                <AvatarFallback className={`bg-gradient-to-r ${selectedMentor.color} text-white`}>
                                  <Bot className="w-4 h-4" />
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div
                              className={`rounded-lg p-3 ${
                                message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p
                                className={`text-xs mt-1 ${
                                  message.type === "user" ? "text-blue-100" : "text-gray-500"
                                }`}
                              >
                                {message.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-start gap-2">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback className={`bg-gradient-to-r ${selectedMentor.color} text-white`}>
                                <Bot className="w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-100 rounded-lg p-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>

                  {/* Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask your mentor anything about your career..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim() || isTyping}
                        className="bg-blue-500 hover:bg-blue-600"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <p className="text-lg font-medium mb-2">Ready to Get Guidance?</p>
                    <p className="text-sm">Select an AI mentor to start your career conversation</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose AI Mentorship?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI mentors provide personalized, 24/7 guidance tailored to your career goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">24/7 Availability</h4>
                <p className="text-sm text-gray-600">Get career guidance whenever you need it, day or night</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Knowledge</h4>
                <p className="text-sm text-gray-600">Access specialized knowledge across multiple career domains</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Personalized Advice</h4>
                <p className="text-sm text-gray-600">Receive tailored recommendations based on your unique profile</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready for Comprehensive Career Guidance?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Take our AI-powered assessment to get personalized career recommendations and connect with the right
              mentor
            </p>
            <Link href="/assessment">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Brain className="w-5 h-5 mr-2" />
                Start Career Assessment
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
