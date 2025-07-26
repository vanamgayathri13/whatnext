"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Users, Target, TrendingUp, FileText, Settings } from "lucide-react"
import type { AssessmentQuestion } from "@/types/assessment"

interface AssessmentStats {
  totalAssessments: number
  completionRate: number
  averageTime: number
  topCareers: Array<{ name: string; count: number }>
  streamDistribution: Record<string, number>
}

export function AssessmentAdmin() {
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([])
  const [stats, setStats] = useState<AssessmentStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [editingQuestion, setEditingQuestion] = useState<AssessmentQuestion | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [newQuestion, setNewQuestion] = useState<Partial<AssessmentQuestion>>({
    question: "",
    type: "multiple-choice",
    category: "interests",
    options: [],
    isRequired: true,
    weight: 1,
  })

  useEffect(() => {
    fetchQuestions()
    fetchStats()
  }, [])

  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/admin/assessment-questions")
      if (response.ok) {
        const data = await response.json()
        setQuestions(data.questions)
      }
    } catch (error) {
      console.error("Failed to fetch questions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/assessment-stats")
      if (response.ok) {
        const data = await response.json()
        setStats(data.stats)
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    }
  }

  const handleSaveQuestion = async () => {
    try {
      const method = editingQuestion ? "PUT" : "POST"
      const url = editingQuestion
        ? `/api/admin/assessment-questions/${editingQuestion.id}`
        : "/api/admin/assessment-questions"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingQuestion || newQuestion),
      })

      if (response.ok) {
        await fetchQuestions()
        setIsDialogOpen(false)
        setEditingQuestion(null)
        setNewQuestion({
          question: "",
          type: "multiple-choice",
          category: "interests",
          options: [],
          isRequired: true,
          weight: 1,
        })
      }
    } catch (error) {
      console.error("Failed to save question:", error)
    }
  }

  const handleDeleteQuestion = async (questionId: string) => {
    if (!confirm("Are you sure you want to delete this question?")) return

    try {
      const response = await fetch(`/api/admin/assessment-questions/${questionId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchQuestions()
      }
    } catch (error) {
      console.error("Failed to delete question:", error)
    }
  }

  const handleToggleActive = async (questionId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/assessment-questions/${questionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      })

      if (response.ok) {
        await fetchQuestions()
      }
    } catch (error) {
      console.error("Failed to update question:", error)
    }
  }

  const renderQuestionForm = (question: Partial<AssessmentQuestion>) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="question">Question Text</Label>
        <Textarea
          id="question"
          value={question.question || ""}
          onChange={(e) => {
            if (editingQuestion) {
              setEditingQuestion({ ...editingQuestion, question: e.target.value })
            } else {
              setNewQuestion({ ...newQuestion, question: e.target.value })
            }
          }}
          placeholder="Enter the question text..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type">Question Type</Label>
          <Select
            value={question.type}
            onValueChange={(value) => {
              if (editingQuestion) {
                setEditingQuestion({ ...editingQuestion, type: value as any })
              } else {
                setNewQuestion({ ...newQuestion, type: value as any })
              }
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
              <SelectItem value="rating">Rating Scale</SelectItem>
              <SelectItem value="open-ended">Open Ended</SelectItem>
              <SelectItem value="ranking">Ranking</SelectItem>
              <SelectItem value="yes-no">Yes/No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={question.category}
            onValueChange={(value) => {
              if (editingQuestion) {
                setEditingQuestion({ ...editingQuestion, category: value })
              } else {
                setNewQuestion({ ...newQuestion, category: value })
              }
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="interests">Interests</SelectItem>
              <SelectItem value="academics">Academics</SelectItem>
              <SelectItem value="personality">Personality</SelectItem>
              <SelectItem value="work-style">Work Style</SelectItem>
              <SelectItem value="goals">Goals</SelectItem>
              <SelectItem value="skills">Skills</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {(question.type === "multiple-choice" || question.type === "ranking") && (
        <div>
          <Label>Options (one per line)</Label>
          <Textarea
            value={question.options?.join("\n") || ""}
            onChange={(e) => {
              const options = e.target.value.split("\n").filter((opt) => opt.trim())
              if (editingQuestion) {
                setEditingQuestion({ ...editingQuestion, options })
              } else {
                setNewQuestion({ ...newQuestion, options })
              }
            }}
            placeholder="Option 1&#10;Option 2&#10;Option 3"
          />
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="weight">Weight (1-5)</Label>
          <Input
            id="weight"
            type="number"
            min="1"
            max="5"
            value={question.weight || 1}
            onChange={(e) => {
              const weight = Number.parseInt(e.target.value)
              if (editingQuestion) {
                setEditingQuestion({ ...editingQuestion, weight })
              } else {
                setNewQuestion({ ...newQuestion, weight })
              }
            }}
          />
        </div>

        <div className="flex items-center space-x-2 mt-6">
          <Switch
            id="required"
            checked={question.isRequired || false}
            onCheckedChange={(checked) => {
              if (editingQuestion) {
                setEditingQuestion({ ...editingQuestion, isRequired: checked })
              } else {
                setNewQuestion({ ...newQuestion, isRequired: checked })
              }
            }}
          />
          <Label htmlFor="required">Required Question</Label>
        </div>
      </div>
    </div>
  )

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Assessment Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingQuestion(null)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Question
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingQuestion ? "Edit Question" : "Add New Question"}</DialogTitle>
            </DialogHeader>
            {renderQuestionForm(editingQuestion || newQuestion)}
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleSaveQuestion}>{editingQuestion ? "Update" : "Create"} Question</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                  <div className="text-2xl font-bold">{stats.totalAssessments}</div>
                  <div className="text-sm text-muted-foreground">Total Assessments</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Target className="w-8 h-8 mx-auto text-green-500 mb-2" />
                  <div className="text-2xl font-bold">{stats.completionRate}%</div>
                  <div className="text-sm text-muted-foreground">Completion Rate</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                  <div className="text-2xl font-bold">{stats.averageTime}m</div>
                  <div className="text-sm text-muted-foreground">Avg. Time</div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <FileText className="w-8 h-8 mx-auto text-orange-500 mb-2" />
                  <div className="text-2xl font-bold">{questions.length}</div>
                  <div className="text-sm text-muted-foreground">Active Questions</div>
                </CardContent>
              </Card>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Career Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                {stats?.topCareers.map((career, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span>{career.name}</span>
                    <Badge variant="secondary">{career.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Stream Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                {stats &&
                  Object.entries(stats.streamDistribution).map(([stream, count]) => (
                    <div key={stream} className="flex justify-between items-center py-2">
                      <span>{stream}</span>
                      <Badge variant="outline">{count}</Badge>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Question</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Weight</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {questions.map((question) => (
                    <TableRow key={question.id}>
                      <TableCell className="max-w-xs truncate">{question.question}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{question.type}</Badge>
                      </TableCell>
                      <TableCell>{question.category}</TableCell>
                      <TableCell>{question.weight}</TableCell>
                      <TableCell>
                        <Switch
                          checked={true} // Assuming active by default
                          onCheckedChange={(checked) => handleToggleActive(question.id, checked)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setEditingQuestion(question)
                              setIsDialogOpen(true)
                            }}
                            className="bg-transparent"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteQuestion(question.id)}
                            className="bg-transparent text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {questions.slice(0, 5).map((question, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="truncate max-w-xs">{question.question}</span>
                        <span>85% completion</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Response Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Average Response Time</span>
                    <span>45 seconds</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Skip Rate</span>
                    <span>12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revision Rate</span>
                    <span>8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completion Rate</span>
                    <span>87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Assessment Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="minQuestions">Minimum Questions Required</Label>
                  <Input id="minQuestions" type="number" defaultValue="10" />
                </div>
                <div>
                  <Label htmlFor="maxTime">Maximum Time Limit (minutes)</Label>
                  <Input id="maxTime" type="number" defaultValue="30" />
                </div>
                <div>
                  <Label htmlFor="passThreshold">Pass Threshold (%)</Label>
                  <Input id="passThreshold" type="number" defaultValue="70" />
                </div>
                <div>
                  <Label htmlFor="retakeDelay">Retake Delay (days)</Label>
                  <Input id="retakeDelay" type="number" defaultValue="7" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="adaptiveMode" defaultChecked />
                  <Label htmlFor="adaptiveMode">Enable Adaptive Questioning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="parentAlignment" defaultChecked />
                  <Label htmlFor="parentAlignment">Enable Parent-Child Alignment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="aiAnalysis" defaultChecked />
                  <Label htmlFor="aiAnalysis">Enable AI-Powered Analysis</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="pdfReports" defaultChecked />
                  <Label htmlFor="pdfReports">Enable PDF Report Generation</Label>
                </div>
              </div>

              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
