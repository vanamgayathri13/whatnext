"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Clock, Award, BookOpen } from "lucide-react"

interface StreamPreviewProps {
  stream: "MPC" | "BiPC" | "Commerce" | "Arts"
  onComplete: (score: number) => void
}

const STREAM_DATA = {
  MPC: {
    title: "Mathematics, Physics, Chemistry",
    description: "Perfect for engineering and technical careers",
    color: "bg-blue-500",
    lessons: [
      {
        id: "1",
        title: "Calculus Fundamentals",
        type: "interactive",
        duration: 15,
        tasks: [
          { id: "1", description: "Solve derivative problems", points: 10 },
          { id: "2", description: "Graph functions", points: 15 },
        ],
      },
      {
        id: "2",
        title: "Physics Lab Simulation",
        type: "practical",
        duration: 20,
        tasks: [
          { id: "3", description: "Pendulum experiment", points: 20 },
          { id: "4", description: "Data analysis", points: 10 },
        ],
      },
    ],
  },
  BiPC: {
    title: "Biology, Physics, Chemistry",
    description: "Ideal for medical and life sciences",
    color: "bg-green-500",
    lessons: [
      {
        id: "1",
        title: "Cell Biology Basics",
        type: "video",
        duration: 12,
        tasks: [
          { id: "1", description: "Identify cell organelles", points: 15 },
          { id: "2", description: "Explain cellular processes", points: 10 },
        ],
      },
    ],
  },
  Commerce: {
    title: "Business, Economics, Accounting",
    description: "Great for business and finance careers",
    color: "bg-orange-500",
    lessons: [
      {
        id: "1",
        title: "Market Analysis",
        type: "interactive",
        duration: 18,
        tasks: [
          { id: "1", description: "Analyze market trends", points: 20 },
          { id: "2", description: "Create business plan", points: 25 },
        ],
      },
    ],
  },
  Arts: {
    title: "Literature, History, Psychology",
    description: "Perfect for creative and social careers",
    color: "bg-purple-500",
    lessons: [
      {
        id: "1",
        title: "Creative Writing Workshop",
        type: "interactive",
        duration: 25,
        tasks: [
          { id: "1", description: "Write a short story", points: 30 },
          { id: "2", description: "Peer review", points: 15 },
        ],
      },
    ],
  },
}

export function StreamPreview({ stream, onComplete }: StreamPreviewProps) {
  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<string[]>([])
  const [isSimulating, setIsSimulating] = useState(false)

  const streamData = STREAM_DATA[stream]
  const lesson = streamData.lessons[currentLesson]
  const totalTasks = streamData.lessons.reduce((acc, l) => acc + l.tasks.length, 0)
  const progress = (completedTasks.length / totalTasks) * 100

  const handleTaskComplete = (taskId: string) => {
    if (!completedTasks.includes(taskId)) {
      setCompletedTasks([...completedTasks, taskId])
    }
  }

  const handleSimulationComplete = () => {
    const totalPoints = streamData.lessons.flatMap((l) => l.tasks).reduce((acc, task) => acc + task.points, 0)

    const earnedPoints = streamData.lessons
      .flatMap((l) => l.tasks)
      .filter((task) => completedTasks.includes(task.id))
      .reduce((acc, task) => acc + task.points, 0)

    const score = (earnedPoints / totalPoints) * 100
    onComplete(score)
  }

  const startSimulation = () => {
    setIsSimulating(true)
    // Simulate task completion over time
    const tasks = streamData.lessons.flatMap((l) => l.tasks)
    tasks.forEach((task, index) => {
      setTimeout(
        () => {
          handleTaskComplete(task.id)
          if (index === tasks.length - 1) {
            setTimeout(handleSimulationComplete, 1000)
          }
        },
        (index + 1) * 2000,
      )
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${streamData.color}`} />
              {streamData.title}
            </CardTitle>
            <CardDescription>{streamData.description}</CardDescription>
          </div>
          <Badge variant="secondary">
            <Clock className="w-4 h-4 mr-1" />
            {streamData.lessons.reduce((acc, l) => acc + l.duration, 0)} min
          </Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <h3 className="font-semibold">Lessons</h3>
                  <p className="text-2xl font-bold">{streamData.lessons.length}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <h3 className="font-semibold">Tasks</h3>
                  <p className="text-2xl font-bold">{totalTasks}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                  <h3 className="font-semibold">Duration</h3>
                  <p className="text-2xl font-bold">{streamData.lessons.reduce((acc, l) => acc + l.duration, 0)}m</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="lessons" className="space-y-4">
            {streamData.lessons.map((lesson, index) => (
              <Card key={lesson.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{lesson.title}</CardTitle>
                  <div className="flex gap-2">
                    <Badge variant="outline">{lesson.type}</Badge>
                    <Badge variant="outline">{lesson.duration} min</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium">Tasks:</h4>
                    {lesson.tasks.map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <span>{task.description}</span>
                        <Badge variant={completedTasks.includes(task.id) ? "default" : "secondary"}>
                          {task.points} pts
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="simulation" className="space-y-4">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Stream Simulation</h3>
              <p className="text-muted-foreground">Experience what it's like to study {streamData.title}</p>

              {!isSimulating ? (
                <Button onClick={startSimulation} size="lg" className="gap-2">
                  <Play className="w-4 h-4" />
                  Start Simulation
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="text-lg font-medium">Simulation in Progress...</div>
                  <Progress value={progress} className="w-full" />
                  <div className="text-sm text-muted-foreground">
                    Completed {completedTasks.length} of {totalTasks} tasks
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
