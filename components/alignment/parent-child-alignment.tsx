"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { AlignmentScore } from "@/types"
import { Users, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react"

interface ParentChildAlignmentProps {
  alignmentData: AlignmentScore
}

export function ParentChildAlignment({ alignmentData }: ParentChildAlignmentProps) {
  const getAlignmentColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getAlignmentStatus = (score: number) => {
    if (score >= 80) return "Excellent"
    if (score >= 60) return "Good"
    return "Needs Attention"
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Parent-Child Alignment Analysis
        </CardTitle>
        <CardDescription>Understanding how well student and parent expectations align</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Alignment Score */}
        <div className="text-center space-y-4">
          <div>
            <div className={`text-4xl font-bold ${getAlignmentColor(alignmentData.overallAlignment)}`}>
              {alignmentData.overallAlignment}%
            </div>
            <div className="text-lg text-muted-foreground">
              Overall Alignment - {getAlignmentStatus(alignmentData.overallAlignment)}
            </div>
          </div>
          <Progress value={alignmentData.overallAlignment} className="w-full max-w-md mx-auto" />
        </div>

        {/* Category Breakdown */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Category Breakdown
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(alignmentData.categoryScores).map(([category, score]) => (
              <Card key={category}>
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium capitalize">{category.replace(/([A-Z])/g, " $1")}</span>
                    <span className={`font-bold ${getAlignmentColor(score)}`}>{score}%</span>
                  </div>
                  <Progress value={score} className="w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Misaligned Areas */}
        {alignmentData.misalignedAreas.length > 0 && (
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="font-medium">Areas needing attention:</div>
                <div className="flex flex-wrap gap-2">
                  {alignmentData.misalignedAreas.map((area, index) => (
                    <Badge key={index} variant="destructive">
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Recommendations */}
        <div>
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Recommendations
          </h3>

          <div className="space-y-3">
            {alignmentData.recommendations.map((recommendation, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-medium text-primary">{index + 1}</span>
                    </div>
                    <p className="text-sm">{recommendation}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Next Steps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Schedule a family discussion about career expectations</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Explore compromise options for misaligned areas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Consider professional career counseling if needed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
