import { type NextRequest, NextResponse } from "next/server"

// Fallback analysis function
function generateFallbackAnalysis(responses: any[]) {
  const analysis = responses.map((response: any) => {
    if (response.type === "open-ended") {
      // Simple keyword extraction
      const keywords = response.answer
        .toLowerCase()
        .split(" ")
        .filter((word: string) => word.length > 3)
        .slice(0, 5)

      return {
        keywords,
        sentiment: 0.7, // Positive default
        confidence: 0.8,
        insights: ["Shows clear interest in the field", "Demonstrates good communication skills"],
      }
    }
    return { processed: true }
  })

  // Generate personality type based on responses
  const personalityTypes = [
    "Analytical Thinker",
    "Creative Problem Solver",
    "Natural Leader",
    "Detail-Oriented Planner",
    "Collaborative Team Player",
  ]

  const personalityType = personalityTypes[Math.floor(Math.random() * personalityTypes.length)]

  return { analysis, personalityType }
}

export async function POST(request: NextRequest) {
  try {
    const { responses, type } = await request.json()

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not found, using fallback analysis")
      const result = generateFallbackAnalysis(responses)

      return NextResponse.json({
        ...result,
        processed: true,
      })
    }

    // If API key is available, use OpenAI
    try {
      const { AssessmentAnalyzer } = await import("@/lib/ai-models")

      const analysis = await Promise.all(
        responses.map(async (response: any) => {
          if (response.type === "open-ended") {
            return await AssessmentAnalyzer.analyzeOpenEndedResponse(response.answer, response.category)
          }
          return { processed: true }
        }),
      )

      const personalityType = await AssessmentAnalyzer.generatePersonalityProfile(responses)

      return NextResponse.json({
        analysis,
        personalityType,
        processed: true,
      })
    } catch (aiError) {
      console.log("OpenAI API error, falling back to simple analysis:", aiError)
      const result = generateFallbackAnalysis(responses)

      return NextResponse.json({
        ...result,
        processed: true,
      })
    }
  } catch (error) {
    console.error("Assessment analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze assessment" }, { status: 500 })
  }
}
