"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, Brain, CheckCircle } from "lucide-react"
import { assessmentQuestions } from "@/data/assessment-questions"
import type { AssessmentQuestion, AssessmentResponse } from "@/types/assessment"

interface AdaptiveAssessmentProps {
  type: "student" | "parent"
  onComplete: (responses: AssessmentResponse[]) => void
  onProgress: (progress: number) => void
  isGuest?: boolean
}

export function AdaptiveAssessment({ type, onComplete, onProgress, isGuest = false }: AdaptiveAssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState<AssessmentResponse[]>([])
  const [currentResponse, setCurrentResponse] = useState<string | string[] | number>("")
  const [questions, setQuestions] = useState<AssessmentQuestion[]>([])

  useEffect(() => {
    // Filter questions based on type
    const filteredQuestions = assessmentQuestions.filter((q) => q.category === type || q.category === "general")
    setQuestions(filteredQuestions)
  }, [type])

  useEffect(() => {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100
    onProgress(progress)
  }, [currentQuestionIndex, questions.length, onProgress])

  const currentQuestion = questions[currentQuestionIndex]

  const handleNext = () => {
    if (!currentResponse) return

    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      question: currentQuestion.question,
      answer: currentResponse,
      category: currentQuestion.category,
      weight: currentQuestion.weight || 1,
    }

    const updatedResponses = [...responses, newResponse]
    setResponses(updatedResponses)

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setCurrentResponse("")
    } else {
      onComplete(updatedResponses)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      const previousResponse = responses[currentQuestionIndex - 1]
      setCurrentResponse(previousResponse?.answer || "")
      setResponses(responses.slice(0, -1))
    }
  }

  const renderQuestionInput = () => {
    if (!currentQuestion) return null

    switch (currentQuestion.type) {
      case "multiple-choice":
        return (
          <RadioGroup value={currentResponse as string} onValueChange={setCurrentResponse} className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "rating":
        return (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Strongly Disagree</span>
              <span>Neutral</span>
              <span>Strongly Agree</span>
            </div>
            <Slider
              value={[(currentResponse as number) || 5]}
              onValueChange={(value) => setCurrentResponse(value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="text-center">
              <span className="text-lg font-semibold">{currentResponse || 5}/10</span>
            </div>
          </div>
        )

      case "multiple-select":
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`checkbox-${index}`}
                  checked={(currentResponse as string[])?.includes(option) || false}
                  onCheckedChange={(checked) => {
                    const currentArray = (currentResponse as string[]) || []
                    if (checked) {
                      setCurrentResponse([...currentArray, option])
                    } else {
                      setCurrentResponse(currentArray.filter((item) => item !== option))
                    }
                  }}
                />
                <Label htmlFor={`checkbox-${index}`} className="cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        )

      case "text":
        return (
          <Textarea
            value={currentResponse as string}
            onChange={(e) => setCurrentResponse(e.target.value)}
            placeholder="Please share your thoughts..."
            className="min-h-[100px]"
          />
        )

      case "ranking":
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Drag to reorder from most important (top) to least important (bottom)
            </p>
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="p-3 border rounded-lg cursor-move hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  {option}
                </div>
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  const isAnswered = () => {
    if (currentQuestion?.type === "multiple-select") {
      return (currentResponse as string[])?.length > 0
    }
    if (currentQuestion?.type === "rating") {
      return currentResponse !== ""
    }
    return currentResponse !== ""
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <Brain className="w-12 h-12 mx-auto text-blue-500 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Loading Assessment</h2>
            <p className="text-muted-foreground">Preparing your personalized questions...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-blue-500" />
                <div>
                  <h1 className="text-xl font-semibold">
                    {type === "student" ? "Student Assessment" : "Parent Assessment"}
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </p>
                </div>
              </div>
              {isGuest && (
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">Free Assessment</p>
                  <p className="text-xs text-muted-foreground">No signup required</p>
                </div>
              )}
            </div>
            <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
          </CardContent>
        </Card>

        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-blue-600">{currentQuestionIndex + 1}</span>
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg mb-2">{currentQuestion.question}</CardTitle>
                {currentQuestion.description && (
                  <CardDescription className="text-base">{currentQuestion.description}</CardDescription>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">{renderQuestionInput()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle className="w-4 h-4" />
            <span>
              {responses.length} of {questions.length} completed
            </span>
          </div>

          <Button onClick={handleNext} disabled={!isAnswered()} className="flex items-center gap-2">
            {currentQuestionIndex === questions.length - 1 ? "Complete Assessment" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Help Text */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900 mb-1">Assessment Tip</h4>
                <p className="text-sm text-blue-800">
                  Answer honestly for the most accurate career recommendations. There are no right or wrong answers.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
