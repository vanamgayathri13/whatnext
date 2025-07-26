"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Target,
  TrendingUp,
  Users,
  Download,
  Share2,
  MessageCircle,
  Award,
  BookOpen,
  DollarSign,
  Clock,
  ArrowRight,
} from "lucide-react"
import type { AssessmentResult } from "@/types/assessment"

interface AssessmentResultsPageProps {
  results: AssessmentResult
}

export default function AssessmentResultsPage({ results }: AssessmentResultsPageProps) {
  const [activeTab, setActiveTab] = useState("careers")

  const handleDownloadPDF = () => {
    // Simulate PDF download
    alert("PDF download feature coming soon!")
  }

  const handleShareResults = () => {
    // Simulate sharing
    alert("Sharing feature coming soon!")
  }

  const handleConnectMentor = () => {
    window.location.href = "/mentorship"
  }

  const handleViewRoadmap = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Career Assessment Results</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Based on your responses, we've analyzed your personality, interests, and goals to provide personalized
            career guidance
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{results.careerMatches.length}</h3>
              <p className="text-sm text-gray-600">Career Matches</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{results.confidence}%</h3>
              <p className="text-sm text-gray-600">Match Confidence</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{results.personalityProfile.dominantTrait}</h3>
              <p className="text-sm text-gray-600">Personality Type</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{results.streamRecommendation}</h3>
              <p className="text-sm text-gray-600">Recommended Stream</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Results */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Detailed Analysis</CardTitle>
                <CardDescription>Explore your personalized career insights</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleDownloadPDF}>
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
                <Button variant="outline" onClick={handleShareResults}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="careers">Career Matches</TabsTrigger>
                <TabsTrigger value="personality">Personality</TabsTrigger>
                <TabsTrigger value="strengths">Strengths</TabsTrigger>
                <TabsTrigger value="alignment">Parent Alignment</TabsTrigger>
              </TabsList>

              <TabsContent value="careers" className="space-y-6 mt-6">
                <div className="grid gap-6">
                  {results.careerMatches.map((career, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">{career.title}</h3>
                            <p className="text-gray-600 mb-3">{career.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {career.skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600 mb-1">{career.matchPercentage}%</div>
                            <p className="text-sm text-gray-500">Match</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                            <div>
                              <p className="text-sm text-gray-600">Salary Range</p>
                              <p className="font-medium">{career.salaryRange}</p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                            <div>
                              <p className="text-sm text-gray-600">Growth Potential</p>
                              <p className="font-medium">{career.growthPotential}</p>
                            </div>
                          </div>

                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-purple-500" />
                            <div>
                              <p className="text-sm text-gray-600">Education Required</p>
                              <p className="font-medium">{career.educationLevel}</p>
                            </div>
                          </div>
                        </div>

                        <Progress value={career.matchPercentage} className="mb-4" />

                        <div className="flex gap-2">
                          <Button size="sm" onClick={handleViewRoadmap}>
                            <BookOpen className="w-4 h-4 mr-2" />
                            View Roadmap
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleConnectMentor}>
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Connect Mentor
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="personality" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      Personality Profile Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl font-bold text-white">
                            {results.personalityProfile.dominantTrait.charAt(0)}
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {results.personalityProfile.dominantTrait} Personality
                        </h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">{results.personalityProfile.description}</p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(results.personalityProfile.traits).map(([trait, score]) => (
                          <div key={trait} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium capitalize">{trait}</span>
                              <span className="text-sm text-gray-600">{score}%</span>
                            </div>
                            <Progress value={score} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="strengths" className="space-y-6 mt-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-green-600">
                        <Award className="w-5 h-5 mr-2" />
                        Your Strengths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {results.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-gray-900">{strength.area}</h4>
                              <p className="text-sm text-gray-600">{strength.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center text-orange-600">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Areas for Growth
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {results.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                            <div>
                              <h4 className="font-medium text-gray-900">{weakness.area}</h4>
                              <p className="text-sm text-gray-600">{weakness.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="alignment" className="space-y-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      Parent-Child Career Alignment
                    </CardTitle>
                    <CardDescription>
                      How well your career preferences align with typical parent expectations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{results.parentAlignment}%</div>
                      <p className="text-gray-600">Overall Alignment Score</p>
                    </div>

                    <Progress value={results.parentAlignment} className="mb-6" />

                    <div className="space-y-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">High Alignment Areas</h4>
                        <p className="text-sm text-blue-700">
                          Your career interests in technology and analytical thinking align well with common parent
                          expectations for stable, high-growth careers.
                        </p>
                      </div>

                      <div className="p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-medium text-yellow-900 mb-2">Discussion Points</h4>
                        <p className="text-sm text-yellow-700">
                          Consider discussing your creative interests with parents to help them understand the growing
                          opportunities in creative-tech hybrid roles.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Your Next Steps</CardTitle>
            <CardDescription>Recommended actions to advance your career journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-blue-200 bg-blue-50">
                <CardContent className="p-6 text-center">
                  <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Create Your Roadmap</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get a personalized step-by-step plan for your chosen career path
                  </p>
                  <Button onClick={handleViewRoadmap} className="w-full">
                    View Roadmap
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-green-200 bg-green-50">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Connect with Mentors</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get guidance from AI mentors specialized in your field of interest
                  </p>
                  <Button
                    onClick={handleConnectMentor}
                    variant="outline"
                    className="w-full border-green-200 text-green-600 hover:bg-green-100 bg-transparent"
                  >
                    Find Mentors
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 bg-purple-50">
                <CardContent className="p-6 text-center">
                  <Share2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Share & Discuss</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Share your results with parents and counselors for additional insights
                  </p>
                  <Button
                    onClick={handleShareResults}
                    variant="outline"
                    className="w-full border-purple-200 text-purple-600 hover:bg-purple-100 bg-transparent"
                  >
                    Share Results
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export { AssessmentResultsPage }
