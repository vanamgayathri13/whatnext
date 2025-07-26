"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Calculator, Microscope, Palette, TrendingUp, DollarSign, Star } from "lucide-react"
import Link from "next/link"

const streams = [
  {
    id: "science",
    name: "Science Stream",
    icon: Microscope,
    color: "from-blue-500 to-blue-600",
    description: "Explore careers in medicine, engineering, research, and technology",
    subjects: ["Physics", "Chemistry", "Biology", "Mathematics"],
    careers: [
      { name: "Software Engineer", salary: "₹8-25 LPA", growth: "High", demand: 95 },
      { name: "Doctor", salary: "₹6-50 LPA", growth: "Stable", demand: 90 },
      { name: "Data Scientist", salary: "₹10-30 LPA", growth: "Very High", demand: 88 },
      { name: "Biotechnologist", salary: "₹4-15 LPA", growth: "High", demand: 75 },
    ],
  },
  {
    id: "commerce",
    name: "Commerce Stream",
    icon: Calculator,
    color: "from-green-500 to-green-600",
    description: "Dive into business, finance, accounting, and entrepreneurship",
    subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics"],
    careers: [
      { name: "Chartered Accountant", salary: "₹7-25 LPA", growth: "High", demand: 85 },
      { name: "Investment Banker", salary: "₹12-40 LPA", growth: "High", demand: 80 },
      { name: "Business Analyst", salary: "₹6-20 LPA", growth: "High", demand: 82 },
      { name: "Financial Advisor", salary: "₹5-18 LPA", growth: "Stable", demand: 78 },
    ],
  },
  {
    id: "arts",
    name: "Arts/Humanities",
    icon: Palette,
    color: "from-purple-500 to-purple-600",
    description: "Discover opportunities in literature, psychology, design, and social sciences",
    subjects: ["English", "History", "Psychology", "Political Science"],
    careers: [
      { name: "UX Designer", salary: "₹5-20 LPA", growth: "Very High", demand: 85 },
      { name: "Content Writer", salary: "₹3-12 LPA", growth: "High", demand: 80 },
      { name: "Psychologist", salary: "₹4-15 LPA", growth: "High", demand: 75 },
      { name: "Journalist", salary: "₹3-18 LPA", growth: "Stable", demand: 70 },
    ],
  },
]

export default function SimulationPage() {
  const [selectedStream, setSelectedStream] = useState("science")
  const [simulationStep, setSimulationStep] = useState(0)

  const currentStream = streams.find((s) => s.id === selectedStream)!
  const Icon = currentStream.icon

  const handleStartSimulation = () => {
    setSimulationStep(1)
  }

  const handleNextStep = () => {
    if (simulationStep < 3) {
      setSimulationStep(simulationStep + 1)
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
            Career Path Simulation
          </Badge>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Your Academic Stream</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what each academic stream offers and simulate your potential career journey
          </p>
        </div>

        {simulationStep === 0 && (
          <>
            {/* Stream Selection */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {streams.map((stream) => {
                const StreamIcon = stream.icon
                const isSelected = selectedStream === stream.id

                return (
                  <Card
                    key={stream.id}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                      isSelected ? "border-blue-500 shadow-xl" : "border-transparent hover:border-blue-200"
                    }`}
                    onClick={() => setSelectedStream(stream.id)}
                  >
                    <CardHeader className="text-center">
                      <div
                        className={`w-16 h-16 mx-auto rounded-lg bg-gradient-to-r ${stream.color} flex items-center justify-center mb-4`}
                      >
                        <StreamIcon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{stream.name}</CardTitle>
                      <CardDescription>{stream.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900">Core Subjects:</h4>
                        <div className="flex flex-wrap gap-1">
                          {stream.subjects.map((subject, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Selected Stream Details */}
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-r ${currentStream.color} flex items-center justify-center`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{currentStream.name}</CardTitle>
                    <CardDescription>Career opportunities and growth prospects</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentStream.careers.map((career, index) => (
                    <Card key={index} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">{career.name}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Salary:</span>
                            <span className="font-medium">{career.salary}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-600">Growth:</span>
                            <Badge
                              variant={career.growth === "Very High" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {career.growth}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600">Demand:</span>
                              <span className="font-medium">{career.demand}%</span>
                            </div>
                            <Progress value={career.demand} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button
                onClick={handleStartSimulation}
                size="lg"
                className={`bg-gradient-to-r ${currentStream.color} hover:opacity-90`}
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Start Career Simulation
              </Button>
            </div>
          </>
        )}

        {simulationStep > 0 && (
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Career Simulation - {currentStream.name}</CardTitle>
                <Badge variant="outline">Step {simulationStep} of 3</Badge>
              </div>
              <Progress value={(simulationStep / 3) * 100} className="mt-4" />
            </CardHeader>
            <CardContent>
              <Tabs value={`step-${simulationStep}`} className="w-full">
                <TabsContent value="step-1" className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Academic Journey</h3>
                    <p className="text-gray-600 mb-6">
                      You've chosen {currentStream.name}. Here's what your academic path looks like:
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Years 11-12 (Higher Secondary)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {currentStream.subjects.map((subject, index) => (
                            <li key={index} className="flex items-center">
                              <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
                              {subject}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Undergraduate Options</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {selectedStream === "science" && (
                            <>
                              <li>• B.Tech/B.E. (Engineering)</li>
                              <li>• MBBS (Medicine)</li>
                              <li>• B.Sc. (Science)</li>
                              <li>• B.Pharm (Pharmacy)</li>
                            </>
                          )}
                          {selectedStream === "commerce" && (
                            <>
                              <li>• B.Com (Commerce)</li>
                              <li>• BBA (Business Administration)</li>
                              <li>• B.Econ (Economics)</li>
                              <li>• CA Foundation</li>
                            </>
                          )}
                          {selectedStream === "arts" && (
                            <>
                              <li>• BA (Arts)</li>
                              <li>• B.Des (Design)</li>
                              <li>• BFA (Fine Arts)</li>
                              <li>• B.Psych (Psychology)</li>
                            </>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="text-center">
                    <Button onClick={handleNextStep} size="lg">
                      Continue to Career Outcomes
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="step-2" className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Career Outcomes</h3>
                    <p className="text-gray-600 mb-6">
                      Based on your stream choice, here are the potential career paths and their prospects:
                    </p>
                  </div>

                  <div className="grid gap-4">
                    {currentStream.careers.map((career, index) => (
                      <Card key={index} className="border-l-4 border-l-green-500">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold">{career.name}</h4>
                            <Badge className="bg-green-100 text-green-800">{career.demand}% Market Demand</Badge>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-2 text-green-500" />
                              <div>
                                <p className="text-sm text-gray-600">Salary Range</p>
                                <p className="font-medium">{career.salary}</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <TrendingUp className="w-4 h-4 mr-2 text-blue-500" />
                              <div>
                                <p className="text-sm text-gray-600">Growth Potential</p>
                                <p className="font-medium">{career.growth}</p>
                              </div>
                            </div>

                            <div className="flex items-center">
                              <Star className="w-4 h-4 mr-2 text-yellow-500" />
                              <div>
                                <p className="text-sm text-gray-600">Job Satisfaction</p>
                                <p className="font-medium">High</p>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center">
                    <Button onClick={handleNextStep} size="lg">
                      View Success Timeline
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="step-3" className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Your Success Timeline</h3>
                    <p className="text-gray-600 mb-6">
                      Here's a projected timeline for achieving success in {currentStream.name}:
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Years 0-4: Foundation Building</h4>
                        <p className="text-sm text-gray-600">
                          Complete your undergraduate degree with strong academics
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-green-50 rounded-lg">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Years 4-6: Early Career</h4>
                        <p className="text-sm text-gray-600">Land your first job and gain practical experience</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                      <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Years 6-10: Growth Phase</h4>
                        <p className="text-sm text-gray-600">
                          Advance to senior positions and specialize in your field
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-yellow-50 rounded-lg">
                      <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold">Years 10+: Leadership & Expertise</h4>
                        <p className="text-sm text-gray-600">Become a leader in your field or start your own venture</p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
                      <h4 className="text-lg font-semibold mb-2">Ready to Start Your Journey?</h4>
                      <p className="text-blue-100 mb-4">
                        Take our comprehensive assessment to get personalized guidance for your chosen path
                      </p>
                      <Link href="/assessment">
                        <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                          Take Career Assessment
                        </Button>
                      </Link>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
