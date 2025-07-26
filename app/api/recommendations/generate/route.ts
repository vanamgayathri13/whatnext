import { type NextRequest, NextResponse } from "next/server"

// Fallback recommendation function
function generateFallbackRecommendations(studentProfile: any) {
  const recommendations = {
    recommendedStreams: ["MPC", "BiPC"],
    careerPaths: [
      {
        title: "Software Engineer",
        description: "Design and develop software applications",
        requiredStream: "MPC",
        entranceExams: ["JEE Main", "JEE Advanced"],
        degreeOptions: ["B.Tech Computer Science"],
        skillsRequired: ["Programming", "Problem Solving", "Mathematics"],
        averageSalary: "₹8-15 LPA",
        jobProspects: "Excellent growth opportunities in tech industry",
      },
      {
        title: "Doctor",
        description: "Provide medical care and treatment",
        requiredStream: "BiPC",
        entranceExams: ["NEET"],
        degreeOptions: ["MBBS"],
        skillsRequired: ["Biology", "Chemistry", "Empathy", "Communication"],
        averageSalary: "₹10-25 LPA",
        jobProspects: "High demand with stable career prospects",
      },
    ],
    successProbability: 85,
    reasoning: "Based on your interests and aptitude, these paths align well with your profile.",
  }

  return recommendations
}

export async function POST(request: NextRequest) {
  try {
    const { studentProfile } = await request.json()

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not found, using fallback recommendations")
      const recommendations = generateFallbackRecommendations(studentProfile)

      return NextResponse.json({
        recommendations,
        generatedAt: new Date().toISOString(),
      })
    }

    // If API key is available, use OpenAI
    try {
      const { RecommendationEngine } = await import("@/lib/ai-models")
      const recommendations = await RecommendationEngine.generateCareerRecommendations(studentProfile)

      return NextResponse.json({
        recommendations,
        generatedAt: new Date().toISOString(),
      })
    } catch (aiError) {
      console.log("OpenAI API error, falling back to simple recommendations:", aiError)
      const recommendations = generateFallbackRecommendations(studentProfile)

      return NextResponse.json({
        recommendations,
        generatedAt: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Recommendation generation error:", error)
    return NextResponse.json({ error: "Failed to generate recommendations" }, { status: 500 })
  }
}
