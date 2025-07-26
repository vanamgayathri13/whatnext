"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Users, Brain, TrendingUp, MessageCircle, Download, Eye, BarChart3, Award } from "lucide-react"

interface AdminDashboardProps {
  user: User
  profile: any
}

export function AdminDashboard({ user, profile }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeStudents: 892,
    completedAssessments: 634,
    totalSessions: 3421,
    avgEngagement: 78,
    monthlyGrowth: 23,
  })

  // Mock data for charts and analytics
  const userGrowthData = [
    { month: "Jan", users: 120 },
    { month: "Feb", users: 180 },
    { month: "Mar", users: 250 },
    { month: "Apr", users: 320 },
    { month: "May", users: 450 },
    { month: "Jun", users: 580 },
  ]

  const engagementData = [
    { feature: "Assessments", usage: 85 },
    { feature: "Simulations", usage: 72 },
    { feature: "Mentorship", usage: 68 },
    { feature: "Roadmaps", usage: 91 },
    { feature: "Chatbot", usage: 76 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} profile={profile} />

      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Monitor platform performance and user engagement</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+{stats.monthlyGrowth}% this month</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Students</p>
                      <p className="text-2xl font-bold">{stats.activeStudents.toLocaleString()}</p>
                      <p className="text-xs text-green-600">+15% this week</p>
                    </div>
                    <Brain className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Assessments</p>
                      <p className="text-2xl font-bold">{stats.completedAssessments.toLocaleString()}</p>
                      <p className="text-xs text-blue-600">71% completion rate</p>
                    </div>
                    <Award className="w-8 h-8 text-purple-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg Engagement</p>
                      <p className="text-2xl font-bold">{stats.avgEngagement}%</p>
                      <p className="text-xs text-green-600">+5% vs last month</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent User Activity</CardTitle>
                  <CardDescription>Latest user registrations and activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New student registration</p>
                          <p className="text-xs text-muted-foreground">Priya Sharma - Grade 11</p>
                        </div>
                      </div>
                      <Badge variant="outline">2m ago</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <Brain className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Assessment completed</p>
                          <p className="text-xs text-muted-foreground">Rahul Kumar - 89% score</p>
                        </div>
                      </div>
                      <Badge variant="outline">5m ago</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Mentor chat session</p>
                          <p className="text-xs text-muted-foreground">Anita Patel - 25 min session</p>
                        </div>
                      </div>
                      <Badge variant="outline">12m ago</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Health</CardTitle>
                  <CardDescription>Platform performance and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">API Response Time</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600">142ms</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <Progress value={95} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Database Performance</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600">98%</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <Progress value={98} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">AI Model Accuracy</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600">94%</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <Progress value={94} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Uptime</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-green-600">99.9%</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                    </div>
                    <Progress value={99.9} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage platform users and their activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View All Users
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Data
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">Students: 892</Badge>
                      <Badge variant="secondary">Parents: 445</Badge>
                      <Badge variant="secondary">Mentors: 23</Badge>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <p className="text-center text-muted-foreground">
                      User management interface would be implemented here with tables, filters, and actions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Analytics</CardTitle>
                <CardDescription>Detailed insights into user behavior and platform performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Feature Usage</h3>
                      <div className="space-y-3">
                        {engagementData.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <span className="text-sm">{item.feature}</span>
                            <div className="flex items-center gap-2 w-32">
                              <Progress value={item.usage} className="flex-1" />
                              <span className="text-sm font-medium w-8">{item.usage}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                      <div className="border rounded-lg p-4 h-48 flex items-center justify-center">
                        <p className="text-muted-foreground">Chart visualization would be implemented here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
                <CardDescription>Manage assessments, simulations, and mentor profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Brain className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <h3 className="font-semibold">Assessments</h3>
                      <p className="text-2xl font-bold">24</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Manage
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <h3 className="font-semibold">Simulations</h3>
                      <p className="text-2xl font-bold">16</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Manage
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                      <h3 className="font-semibold">Mentors</h3>
                      <p className="text-2xl font-bold">23</p>
                      <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                        Manage
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Exports</CardTitle>
                <CardDescription>Generate and download platform reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Available Reports</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        User Activity Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Assessment Analytics
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Engagement Metrics
                      </Button>
                      <Button variant="outline" className="w-full justify-start bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        Revenue Report
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Today's Signups</span>
                        <Badge>23</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Active Sessions</span>
                        <Badge>156</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Completed Assessments</span>
                        <Badge>89</Badge>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <span className="text-sm">Support Tickets</span>
                        <Badge variant="destructive">3</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
