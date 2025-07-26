import { type NextRequest, NextResponse } from "next/server"
import { GapYearPlanner } from "@/lib/ai-models"

export async function POST(request: NextRequest) {
  try {
    const { studentProfile } = await request.json()

    const plan = await GapYearPlanner.generateGapYearPlan(studentProfile)

    return NextResponse.json({
      plan,
      generatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Gap year planning error:", error)
    return NextResponse.json({ error: "Failed to generate gap year plan" }, { status: 500 })
  }
}
