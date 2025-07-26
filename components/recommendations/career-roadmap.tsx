"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import type { CareerPath } from "@/types"
import { GraduationCap, Target, TrendingUp, Clock } from "lucide-react"

interface CareerRoadmapProps {
  careerPath: CareerPath
  currentPhase?: number
}

export function CareerRoadmap({ careerPath, currentPhase = 0 }: CareerRoadmapProps) {
  const progress = ((currentPhase + 1) / careerPath.roadmap.length) * 100

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          {careerPath.title}
        </CardTitle>
        <CardDescription>{careerPath.description}</CardDescription>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="secondary">
            <GraduationCap className="w-3 h-3 mr-1" />
            {careerPath.requiredStream}
          </Badge>
          <Badge variant="outline">
            <TrendingUp className="w-3 h-3 mr-1" />
            {careerPath.averageSalary}
          </Badge>
        </div>
        <Progress value={progress} className="w-full mt-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Key Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Entrance Exams</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1">
                {careerPath.entranceExams.map((exam, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {exam}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Degree Options</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1">
                {careerPath.degreeOptions.map((degree, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {degree}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skills Required */}
        <div>
          <h3 className="font-semibold mb-2">Skills Required</h3>
          <div className="flex flex-wrap gap-2">
            {careerPath.skillsRequired.map((skill, index) => (
              <Badge key={index} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Roadmap Timeline */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Career Roadmap
          </h3>

          <div className="space-y-4">
            {careerPath.roadmap.map((step, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < careerPath.roadmap.length - 1 && (
                  <div className="absolute left-4 top-8 w-0.5 h-16 bg-border" />
                )}

                <div className="flex gap-4">
                  {/* Phase indicator */}
                  <div
                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${index <= currentPhase ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                  `}
                  >
                    {index + 1}
                  </div>

                  {/* Phase content */}
                  <div className="flex-1 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium">{step.phase}</h4>
                      <Badge variant="outline" className="text-xs">
                        {step.timeline}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">Activities:</h5>
                        <ul className="text-sm space-y-1">
                          {step.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="flex items-start gap-2">
                              <span className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="text-sm font-medium text-muted-foreground mb-1">Milestones:</h5>
                        <div className="flex flex-wrap gap-1">
                          {step.milestones.map((milestone, milIndex) => (
                            <Badge key={milIndex} variant="outline" className="text-xs">
                              {milestone}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Prospects */}
        <div>
          <h3 className="font-semibold mb-2">Job Prospects</h3>
          <p className="text-sm text-muted-foreground">{careerPath.jobProspects}</p>
        </div>
      </CardContent>
    </Card>
  )
}
