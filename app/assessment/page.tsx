"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AdaptiveAssessment } from "@/components/assessment/adaptive-assessment"
import { AssessmentResultsPage } from "@/components/assessment/results-page"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Brain, Users, Target, Clock, CheckCircle } from "lucide-react"
import type { AssessmentResponse, AssessmentResults, CareerMatch } from "@/types/assessment"

export default function AssessmentPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<"intro" | "student" | "parent" | "results">("intro")
  const [studentResponses, setStudentResponses] = useState<AssessmentResponse[]>([])
  const [parentResponses, setParentResponses] = useState<AssessmentResponse[]>([])
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleStudentAssessmentComplete = async (responses: AssessmentResponse[]) => {
    setStudentResponses(responses)
    setIsProcessing(true)

    try {
      const response = await fetch("/api/assessment/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          responses,
          userId: "guest-user", // For guest users
          type: "student",
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setAssessmentResults(data.results)
        setCurrentStep("results")
      } else {
        console.error("Failed to process assessment")
        // Fallback to mock results for demo
        setAssessmentResults(generateMockResults(responses))
        setCurrentStep("results")
      }
    } catch (error) {
      console.error("Assessment processing error:", error)
      // Fallback to mock results for demo
      setAssessmentResults(generateMockResults(responses))
      setCurrentStep("results")
    } finally {
      setIsProcessing(false)
    }
  }

  const generateMockResults = (responses: AssessmentResponse[]): AssessmentResults => {
    return {
      recommendedStream: "MPC",
      successProbability: 85,
      careerMatches: [
        {
          title: "Software Engineer",
          description: "Design and develop software applications and systems",
          matchPercentage: 92,
          averageSalary: "₹8-15 LPA",
          jobGrowth: "High",
          requiredStream: "MPC",
          skillsRequired: ["Programming", "Problem Solving", "Mathematics", "Logic"],
        },
        {
          title: "Data Scientist",
          description: "Analyze complex data to help organizations make decisions",
          matchPercentage: 88,
          averageSalary: "₹10-20 LPA",
          jobGrowth: "Very High",
          requiredStream: "MPC",
          skillsRequired: ["Statistics", "Python", "Machine Learning", "Analytics"],
        },
        {
          title: "Product Manager",
          description: "Guide the development and strategy of products",
          matchPercentage: 82,
          averageSalary: "₹12-25 LPA",
          jobGrowth: "High",
          requiredStream: "Any",
          skillsRequired: ["Leadership", "Strategy", "Communication", "Analysis"],
        },
      ],
      personalityProfile: {
        type: "Analytical Thinker",
        traits: {
          analytical: 8,
          creative: 6,
          leadership: 7,
          riskTolerance: 5,
        },
        workStyle: "Independent",
        learningStyle: "Visual",
      },
      strengthsWeaknesses: {
        strengths: [
          "Strong analytical and problem-solving skills",
          "Good with numbers and logical thinking",
          "Detail-oriented and methodical approach",
          "Quick learner with new technologies",
        ],
        weaknesses: [
          "May need to improve communication skills",
          "Could benefit from more leadership experience",
          "Sometimes overthinks simple problems",
        ],
        recommendations: [
          "Consider joining coding clubs or hackathons",
          "Practice public speaking and presentation skills",
          "Explore internships in tech companies",
          "Build a portfolio of personal projects",
        ],
      },
      parentChildAlignment: null,
    }
  }

  const handleParentAssessmentComplete = async (responses: AssessmentResponse[]) => {
    setParentResponses(responses)
    // Process parent assessment and calculate alignment
  }

  const handleViewRoadmap = (career: CareerMatch) => {
    router.push(`/roadmap?career=${encodeURIComponent(career.title)}`)
  }

  const handleTalkToMentor = () => {
    router.push("/mentorship")
  }

  const handleDownloadPDF = () => {
    console.log("Downloading PDF report...")
  }

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center space-y-4">
            <Brain className="w-12 h-12 mx-auto text-blue-500 animate-pulse" />
            <h2 className="text-xl font-semibold">Processing Your Assessment</h2>
            <p className="text-muted-foreground">
              Our AI is analyzing your responses to generate personalized career recommendations...
            </p>
            <Progress value={75} className="w-full" />
            <p className="text-sm text-muted-foreground">This may take a few moments</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentStep === "results" && assessmentResults) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <AssessmentResultsPage
          results={assessmentResults}
          studentName="Alex Johnson"
          onViewRoadmap={handleViewRoadmap}
          onTalkToMentor={handleTalkToMentor}
          onDownloadPDF={handleDownloadPDF}
        />
      </div>
    )
  }

  if (currentStep === "student") {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <AdaptiveAssessment
          type="student"
          onComplete={handleStudentAssessmentComplete}
          onProgress={setProgress}
          isGuest={true}
        />
      </div>
    )
  }

  if (currentStep === "parent") {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <AdaptiveAssessment
          type="parent"
          onComplete={handleParentAssessmentComplete}
          onProgress={setProgress}
          isGuest={true}
        />
      </div>
    )
  }

  // Intro/Welcome Screen
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <Card className="text-center bg-gradient-to-r from-blue-50 to-purple-50 border-none shadow-lg">
          <CardContent className="p-8">
            <Brain className="w-16 h-16 mx-auto text-blue-500 mb-4" />
            <h1 className="text-3xl font-bold mb-4">AI-Powered Career Assessment</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover your ideal career path through our comprehensive assessment that analyzes your interests,
              personality, and goals to provide personalized recommendations.
            </p>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <Target className="w-12 h-12 mx-auto text-green-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Personalized Results</h3>
              <p className="text-sm text-muted-foreground">
                Get tailored career recommendations based on your unique profile and interests.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-12 h-12 mx-auto text-blue-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Parent Alignment</h3>
              <p className="text-sm text-muted-foreground">
                Compare your goals with parent expectations to find common ground.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 mx-auto text-purple-500 mb-4" />
              <h3 className="font-semibold text-lg mb-2">Smart & Adaptive</h3>
              <p className="text-sm text-muted-foreground">
                Questions adapt based on your answers for a more efficient assessment.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Overview</CardTitle>
            <CardDescription>Complete both assessments for the most comprehensive career guidance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Student Assessment</h4>
                    <p className="text-sm text-muted-foreground">15-20 minutes</p>
                  </div>
                </div>
                <ul className="text-sm space-y-1 ml-11">
                  <li>• Interests & hobbies exploration</li>
                  <li>• Academic strengths analysis</li>
                  <li>• Personality & work style assessment</li>
                  <li>• Career goals & aspirations</li>
                </ul>
                <Button className="w-full ml-11 max-w-xs" onClick={() => setCurrentStep("student")}>
                  Start Student Assessment
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-green-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Parent Assessment</h4>
                    <p className="text-sm text-muted-foreground">5-10 minutes</p>
                  </div>
                </div>
                <ul className="text-sm space-y-1 ml-11">
                  <li>• Stream preferences & expectations</li>
                  <li>• Career priorities & values</li>
                  <li>• Risk tolerance & timeline</li>
                  <li>• Support & guidance approach</li>
                </ul>
                <Button
                  variant="outline"
                  className="w-full ml-11 max-w-xs bg-transparent"
                  onClick={() => setCurrentStep("parent")}
                >
                  Parent Assessment
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900">What You'll Get</h4>
                  <ul className="text-sm text-blue-800 mt-2 space-y-1">
                    <li>• Recommended academic stream with success probability</li>
                    <li>• Top 5 career matches with detailed analysis</li>
                    <li>• Personality profile and strengths assessment</li>
                    <li>• Parent-child alignment score and recommendations</li>
                    <li>• Downloadable PDF report for future reference</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
