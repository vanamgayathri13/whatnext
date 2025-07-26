"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import type { AssessmentQuestion, AssessmentResponse } from "@/types"

interface InteractiveAssessmentProps {
  type: "student" | "parent"
  onComplete: (responses: AssessmentResponse[]) => void
}

const SAMPLE_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "1",
    type: "multiple-choice",
    question: "Which subjects do you find most interesting?",
    options: ["Mathematics & Physics", "Biology & Chemistry", "Business & Economics", "Arts & Literature"],
    category: "interests",
  },
  {
    id: "2",
    type: "rating",
    question: "How comfortable are you with taking risks in your career?",
    category: "personality",
  },
  {
    id: "3",
    type: "open-ended",
    question: "Describe your ideal career in 5 years. What would you be doing?",
    category: "goals",
  },
  {
    id: "4",
    type: "multiple-choice",
    question: "What type of work environment appeals to you most?",
    options: ["Corporate office", "Research lab", "Creative studio", "Outdoor/field work"],
    category: "interests",
  },
  {
    id: "5",
    type: "rating",
    question: "How important is work-life balance to you?",
    category: "personality",
  },
]

export function InteractiveAssessment({ type, onComplete }: InteractiveAssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<AssessmentResponse[]>([])
  const [currentAnswer, setCurrentAnswer] = useState<string | number>("")

  const progress = ((currentQuestion + 1) / SAMPLE_QUESTIONS.length) * 100
  const question = SAMPLE_QUESTIONS[currentQuestion]

  const handleNext = () => {
    const newResponse: AssessmentResponse = {
      questionId: question.id,
      answer: currentAnswer,
      confidence: Math.random() * 0.3 + 0.7, // Mock confidence
    }

    const updatedResponses = [...responses, newResponse]
    setResponses(updatedResponses)

    if (currentQuestion < SAMPLE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setCurrentAnswer("")
    } else {
      onComplete(updatedResponses)
    }
  }

  const renderQuestionInput = () => {
    switch (question.type) {
      case "multiple-choice":
        return (
          <RadioGroup value={currentAnswer as string} onValueChange={setCurrentAnswer}>
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "rating":
        return (
          <div className="space-y-4">
            <Slider
              value={[(currentAnswer as number) || 5]}
              onValueChange={(value) => setCurrentAnswer(value[0])}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Not Important</span>
              <span>Very Important</span>
            </div>
            <p className="text-center">Rating: {currentAnswer || 5}/10</p>
          </div>
        )

      case "open-ended":
        return (
          <Textarea
            value={currentAnswer as string}
            onChange={(e) => setCurrentAnswer(e.target.value)}
            placeholder="Share your thoughts..."
            className="min-h-[100px]"
          />
        )

      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{type === "student" ? "Student Assessment" : "Parent Assessment"}</CardTitle>
        <CardDescription>
          Question {currentQuestion + 1} of {SAMPLE_QUESTIONS.length}
        </CardDescription>
        <Progress value={progress} className="w-full" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          {renderQuestionInput()}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!currentAnswer}>
            {currentQuestion === SAMPLE_QUESTIONS.length - 1 ? "Complete" : "Next"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
