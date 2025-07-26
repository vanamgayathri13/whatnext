"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Brain, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"

export function GuestAssessmentBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative max-w-7xl mx-auto px-4 py-4">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">Free AI Career Assessment</h3>
                      <Badge variant="secondary" className="bg-yellow-400 text-yellow-900 text-xs">
                        <Sparkles className="w-3 h-3 mr-1" />
                        No Signup Required
                      </Badge>
                    </div>
                    <p className="text-white/90 text-sm">
                      Discover your ideal career path in just 15 minutes with our AI-powered assessment
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link href="/assessment">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 font-semibold shadow-lg">
                    Start Free Assessment
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
