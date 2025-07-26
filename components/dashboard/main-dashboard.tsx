"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InteractiveAssessment } from "@/components/assessment/interactive-assessment"
import { StreamPreview } from "@/components/simulation/stream-preview"
import { CareerRoadmap } from "@/components/recommendations/career-roadmap"
import { ParentChildAlignment } from "@/components/alignment/parent-child-alignment"
import { MentorChat } from "@/components/mentorship/mentor-chat"
import {
  User,
  Brain,
  Target,
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  Award,
  BookOpen,
  Lightbulb,
  LogOut,
  Info,
} from "lucide-react"

export function MainDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [assessmentCompleted, setAssessmentCompleted] = useState(false)
  const [simulationScores, setSimulationScores] = useState<Record<string, number>>({})
  const [demoUser, setDemoUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Get demo user data
    const demoSession = localStorage.getItem("demo-session")
    if (demoSession) {
      setDemoUser(JSON.parse(demoSession))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("demo-session")
    localStorage.removeItem("demo-active")
    router.push("/")
  }

  // Mock data
  const studentProfile = {
    name: demoUser?.name || "Demo User",
    grade: "11th",
    assessmentProgress: 85,
    recommendedStreams: ["MPC", "BiPC"],
    currentStreak: 7,
    totalPoints: 1250,
  }

  const mockCareerPath = {
    title: "Software Engineer",
    description: "Design and develop software applications and systems",
    requiredStream: "MPC",
    entranceExams: ["JEE Main", "JEE Advanced", "BITSAT"],
    degreeOptions: ["B.Tech Computer Science", "B.E. Software Engineering"],
    skillsRequired: ["Programming", "Problem Solving", "Mathematics", "Logic"],
    averageSalary: "₹8-15 LPA",
    jobProspects: "Excellent growth opportunities in tech industry with high demand",
    roadmap: [
      {
        phase: "Class 11-12",
        timeline: "2 years",
        activities: ["Focus on Math & Physics", "Learn basic programming", "Prepare for JEE"],
        milestones: ["Complete syllabus", "Score 90%+", "JEE qualification"],
      },
      {
        phase: "Undergraduate",
        timeline: "4 years",
        activities: ["B.Tech in CS", "Internships", "Projects", "Competitive programming"],
        milestones: ["Degree completion", "2+ internships", "Strong portfolio"],
      },
      {
        phase: "Career Start",
        timeline: "1-2 years",
        activities: ["Job applications", "Interview prep", "Skill specialization"],
        milestones: ["First job", "Industry experience", "Professional network"],
      },
    ],
  }

  const mockAlignmentData = {
    studentId: "student-1",
    parentId: "parent-1",
    overallAlignment: 78,
    categoryScores: {
      careerGoals: 85,
      academicStreams: 70,
      riskTolerance: 60,
      timelineExpectations: 90,
    },
    misalignedAreas: ["Risk Tolerance", "Career Flexibility"],
    recommendations: [
      "Discuss the importance of taking calculated risks in career growth",
      "Explore backup career options that align with both perspectives",
      "Consider a gradual approach to career decisions with regular check-ins",
    ],
    generatedAt: new Date(),
  }

  const mockMentor = {
    id: "mentor-1",
    name: "Dr. Sarah Chen",
    expertise: ["Computer Science", "AI/ML", "Career Development"],
    experience: "10+ years",
    education: "PhD Computer Science, Stanford",
    currentRole: "Senior Software Engineer at Google",
    bio: "Passionate about mentoring students in STEM careers with expertise in AI and machine learning.",
    avatar: "/placeholder.svg?height=40&width=40",
    specializations: ["Technical Interviews", "Career Transitions", "Skill Development"],
  }

  const handleAssessmentComplete = async (responses: any[]) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAssessmentCompleted(true)
    } catch (error) {
      console.error("Assessment submission failed:", error)
    }
  }

  const handleSimulationComplete = (stream: string, score: number) => {
    setSimulationScores((prev) => ({ ...prev, [stream]: score }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4" />
            <span className="text-sm font-medium">🚀 Demo Mode - Explore all features without signing up!</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="text-white border-white hover:bg-white hover:text-green-600 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Exit Demo
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome, {studentProfile.name}!</h1>
          <p className="text-muted-foreground">Explore your personalized career guidance journey</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="assessment" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Assessment
            </TabsTrigger>
            <TabsTrigger value="simulation" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Simulation
            </TabsTrigger>
            <TabsTrigger value="recommendations" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="alignment" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Alignment
            </TabsTrigger>
            <TabsTrigger value="mentorship" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Mentorship
            </TabsTrigger>
            <TabsTrigger value="planning" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Planning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Alert>
              <Info className="w-4 h-4" />
              <AlertDescription>
                You're in demo mode! All features are fully functional. Create an account to save your progress.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Assessment Progress</p>
                      <p className="text-2xl font-bold">{studentProfile.assessmentProgress}%</p>
                    </div>
                    <Brain className="w-8 h-8 text-blue-500" />
                  </div>
                  <Progress value={studentProfile.assessmentProgress} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Current Streak</p>
                      <p className="text-2xl font-bold">{studentProfile.currentStreak} days</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Points</p>
                      <p className="text-2xl font-bold">{studentProfile.totalPoints}</p>
                    </div>
                    <Award className="w-8 h-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Recommended Streams</p>
                      <div className="flex gap-1 mt-1">
                        {studentProfile.recommendedStreams.map((stream, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {stream}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Lightbulb className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Continue your career exploration journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    className="w-full justify-start"
                    variant={assessmentCompleted ? "outline" : "default"}
                    onClick={() => setActiveTab("assessment")}
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    {assessmentCompleted ? "Retake Assessment" : "Complete Assessment"}
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("simulation")}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Try Stream Simulations
                  </Button>
                  <Button
                    className="w-full justify-start bg-transparent"
                    variant="outline"
                    onClick={() => setActiveTab("mentorship")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat with Mentor
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest achievements and progress</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">Completed MPC simulation with 85% score</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">Updated career preferences</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-sm">Received new mentor message</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="assessment" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Interactive Career Assessment</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our AI-powered assessment analyzes your interests, aptitude, and goals to provide personalized career
                recommendations.
              </p>
            </div>

            {!assessmentCompleted ? (
              <InteractiveAssessment type="student" onComplete={handleAssessmentComplete} />
            ) : (
              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-green-600">Assessment Completed!</CardTitle>
                  <CardDescription>Your responses have been analyzed using advanced AI</CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-4xl">🎉</div>
                  <p>Check out your personalized recommendations in the Roadmap tab!</p>
                  <Button onClick={() => setActiveTab("recommendations")}>View My Roadmap</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="simulation" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Stream Simulation Previews</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Experience different academic streams through interactive simulations and micro-tasks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {(["MPC", "BiPC", "Commerce", "Arts"] as const).map((stream) => (
                <Card key={stream} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold mb-2">{stream}</h3>
                    {simulationScores[stream] ? (
                      <div className="space-y-2">
                        <Badge variant="default">Completed</Badge>
                        <div className="text-2xl font-bold text-green-600">{simulationScores[stream]}%</div>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
                        Start Simulation
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <StreamPreview stream="MPC" onComplete={(score) => handleSimulationComplete("MPC", score)} />
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Your Personalized Career Roadmap</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                AI-generated career path based on your assessment results and interests.
              </p>
            </div>

            <CareerRoadmap careerPath={mockCareerPath} currentPhase={0} />
          </TabsContent>

          <TabsContent value="alignment" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Parent-Child Alignment Analysis</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Understanding how well your career goals align with your parents' expectations.
              </p>
            </div>

            <ParentChildAlignment alignmentData={mockAlignmentData} />
          </TabsContent>

          <TabsContent value="mentorship" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">AI-Powered Mentorship</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Get personalized guidance from our AI mentors based on real industry professionals.
              </p>
            </div>

            <MentorChat mentor={mockMentor} />
          </TabsContent>

          <TabsContent value="planning" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Gap Year & Future Planning</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Smart planning tools to help you make informed decisions about gap years and future steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gap Year Planner</CardTitle>
                  <CardDescription>AI-recommended activities for productive gap years</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Recommended Activities:</h4>
                    <div className="space-y-2">
                      <Badge variant="outline">Online Coding Bootcamp</Badge>
                      <Badge variant="outline">Tech Internship</Badge>
                      <Badge variant="outline">Open Source Contributions</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Expected Benefits:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Enhanced technical skills</li>
                      <li>• Industry experience</li>
                      <li>• Professional network</li>
                      <li>• Career clarity</li>
                    </ul>
                  </div>
                  <div className="pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Clarity Score:</span>
                      <span className="text-lg font-bold text-green-600">85%</span>
                    </div>
                    <Progress value={85} className="mt-1" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Motivation Tracker</CardTitle>
                  <CardDescription>Stay motivated with personalized nudges and progress tracking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Daily Challenge</p>
                        <p className="text-xs text-muted-foreground">Complete one coding problem today</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Weekly Goal</p>
                        <p className="text-xs text-muted-foreground">Research 3 engineering colleges</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">Milestone</p>
                        <p className="text-xs text-muted-foreground">Complete JEE preparation plan</p>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    View All Nudges
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
