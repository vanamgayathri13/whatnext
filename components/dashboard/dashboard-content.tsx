"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Brain,
  BookOpen,
  Target,
  MessageCircle,
  TrendingUp,
  Calendar,
  Award,
  Settings,
  LogOut,
  User,
  Bell,
  ChevronRight,
  Clock,
  CheckCircle,
  ArrowRight,
  Zap,
  Users,
  BarChart3,
  Lightbulb,
} from "lucide-react"
import Link from "next/link"

interface DashboardContentProps {
  user: any
  profile: any
}

export function DashboardContent({ user, profile }: DashboardContentProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    setLoading(true)
    await supabase.auth.signOut()
    router.push("/")
  }

  const userInitials = profile?.full_name
    ? profile.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
    : user?.email?.[0]?.toUpperCase() || "U"

  const assessmentProgress = 75
  const completedAssessments = 3
  const totalAssessments = 4

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">WhatNext AI</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user?.user_metadata?.avatar_url || "/placeholder.svg"}
                        alt={profile?.full_name || "User"}
                      />
                      <AvatarFallback className="bg-blue-600 text-white">{userInitials}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.full_name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} disabled={loading}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{loading ? "Signing out..." : "Sign out"}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {profile?.full_name?.split(" ")[0] || "there"}! 👋
          </h2>
          <p className="text-gray-600 text-lg">Ready to continue your career discovery journey?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Assessment Progress</p>
                  <p className="text-2xl font-bold">{assessmentProgress}%</p>
                </div>
                <Brain className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Completed</p>
                  <p className="text-2xl font-bold">
                    {completedAssessments}/{totalAssessments}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Career Matches</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <Target className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Streak</p>
                  <p className="text-2xl font-bold">7 days</p>
                </div>
                <Zap className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
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
            <TabsTrigger value="mentorship" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Mentorship
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Progress
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-600" />
                    Continue Your Assessment
                  </CardTitle>
                  <CardDescription>Complete your career personality assessment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{assessmentProgress}%</span>
                    </div>
                    <Progress value={assessmentProgress} className="h-2" />
                  </div>
                  <Link href="/assessment">
                    <Button className="w-full">
                      Continue Assessment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-green-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm">Account created successfully</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm">Profile setup completed</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-sm">Ready to start assessment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Career Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  Top Career Recommendations
                </CardTitle>
                <CardDescription>Based on your assessment results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: "Software Engineer", match: "95%", growth: "22%" },
                    { title: "Data Scientist", match: "88%", growth: "35%" },
                    { title: "UX Designer", match: "82%", growth: "13%" },
                  ].map((career, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <h4 className="font-semibold text-gray-900">{career.title}</h4>
                      <div className="flex justify-between items-center mt-2">
                        <Badge variant="secondary">{career.match} match</Badge>
                        <span className="text-sm text-green-600">+{career.growth} growth</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Assessment Tab */}
          <TabsContent value="assessment" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Assessment Center</CardTitle>
                <CardDescription>Discover your strengths, interests, and ideal career paths</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Available Assessments</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Personality Assessment", status: "completed", score: "95%" },
                        { name: "Skills Evaluation", status: "completed", score: "88%" },
                        { name: "Interest Inventory", status: "in-progress", score: "60%" },
                        { name: "Values Assessment", status: "pending", score: null },
                      ].map((assessment, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{assessment.name}</p>
                            <p className="text-sm text-gray-600 capitalize">{assessment.status.replace("-", " ")}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {assessment.score && <Badge variant="outline">{assessment.score}</Badge>}
                            {assessment.status === "completed" && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {assessment.status === "in-progress" && <Clock className="w-5 h-5 text-yellow-500" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Assessment Insights</h3>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900">Your Personality Type</h4>
                      <p className="text-blue-700 mt-1">ENFP - The Campaigner</p>
                      <p className="text-sm text-blue-600 mt-2">
                        You're enthusiastic, creative, and sociable. You thrive in collaborative environments and enjoy
                        helping others reach their potential.
                      </p>
                    </div>
                    <Link href="/assessment">
                      <Button className="w-full">Continue Assessment</Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Simulation Tab */}
          <TabsContent value="simulation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Career Simulation Lab</CardTitle>
                <CardDescription>Experience different careers through interactive simulations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: "Software Developer",
                      description: "Build apps and solve coding challenges",
                      duration: "45 min",
                      difficulty: "Intermediate",
                    },
                    {
                      title: "Marketing Manager",
                      description: "Create campaigns and analyze market trends",
                      duration: "30 min",
                      difficulty: "Beginner",
                    },
                    {
                      title: "Financial Analyst",
                      description: "Analyze data and make investment decisions",
                      duration: "60 min",
                      difficulty: "Advanced",
                    },
                  ].map((sim, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-lg mb-2">{sim.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{sim.description}</p>
                        <div className="flex justify-between items-center mb-4">
                          <Badge variant="outline">{sim.duration}</Badge>
                          <Badge variant="secondary">{sim.difficulty}</Badge>
                        </div>
                        <Link href="/simulation">
                          <Button className="w-full">Start Simulation</Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mentorship Tab */}
          <TabsContent value="mentorship" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Career Mentorship</CardTitle>
                <CardDescription>Get personalized guidance from our AI career counselor</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Recent Conversations</h3>
                    <div className="space-y-3">
                      {[
                        { topic: "College Major Selection", time: "2 hours ago", status: "active" },
                        { topic: "Internship Opportunities", time: "1 day ago", status: "completed" },
                        { topic: "Career Path Planning", time: "3 days ago", status: "completed" },
                      ].map((chat, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{chat.topic}</p>
                            <p className="text-sm text-gray-600">{chat.time}</p>
                          </div>
                          <Badge variant={chat.status === "active" ? "default" : "secondary"}>{chat.status}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Quick Actions</h3>
                    <div className="space-y-3">
                      <Link href="/mentorship">
                        <Button className="w-full justify-start bg-transparent" variant="outline">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Start New Conversation
                        </Button>
                      </Link>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Calendar className="w-4 h-4 mr-2" />
                        Schedule Career Session
                      </Button>
                      <Button className="w-full justify-start bg-transparent" variant="outline">
                        <Users className="w-4 h-4 mr-2" />
                        Join Group Discussion
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Career Roadmap</CardTitle>
                <CardDescription>Personalized steps to achieve your career goals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      phase: "High School",
                      status: "current",
                      tasks: ["Complete career assessment", "Explore STEM courses", "Join coding club"],
                    },
                    {
                      phase: "College Preparation",
                      status: "upcoming",
                      tasks: ["Research computer science programs", "Prepare for SATs", "Build portfolio"],
                    },
                    {
                      phase: "College Years",
                      status: "future",
                      tasks: ["Major in Computer Science", "Complete internships", "Build network"],
                    },
                    {
                      phase: "Career Launch",
                      status: "future",
                      tasks: ["Apply for entry-level positions", "Continue learning", "Seek mentorship"],
                    },
                  ].map((phase, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-4 h-4 rounded-full mt-1 ${
                            phase.status === "current"
                              ? "bg-blue-500"
                              : phase.status === "upcoming"
                                ? "bg-yellow-500"
                                : "bg-gray-300"
                          }`}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{phase.phase}</h3>
                          <ul className="mt-2 space-y-1">
                            {phase.tasks.map((task, taskIndex) => (
                              <li key={taskIndex} className="text-sm text-gray-600 flex items-center gap-2">
                                <ChevronRight className="w-3 h-3" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {index < 3 && <div className="w-px h-8 bg-gray-300 ml-2 mt-2" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { skill: "Programming", progress: 75, level: "Intermediate" },
                    { skill: "Problem Solving", progress: 85, level: "Advanced" },
                    { skill: "Communication", progress: 60, level: "Beginner" },
                    { skill: "Leadership", progress: 45, level: "Beginner" },
                  ].map((skill, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.skill}</span>
                        <Badge variant="outline">{skill.level}</Badge>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                      <p className="text-sm text-gray-600">{skill.progress}% complete</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "Assessment Master", description: "Completed all personality assessments", earned: true },
                    { title: "Simulation Explorer", description: "Tried 3 different career simulations", earned: true },
                    { title: "Goal Setter", description: "Created your first career roadmap", earned: false },
                    { title: "Mentor Seeker", description: "Had 5 mentorship conversations", earned: false },
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Award className={`w-6 h-6 ${achievement.earned ? "text-yellow-500" : "text-gray-300"}`} />
                      <div>
                        <p className={`font-medium ${achievement.earned ? "text-gray-900" : "text-gray-500"}`}>
                          {achievement.title}
                        </p>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
