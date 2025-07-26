import { type NextRequest, NextResponse } from "next/server"
import { AlignmentAnalyzer } from "@/lib/ai-models"

export async function POST(request: NextRequest) {
  try {
    const { studentResponses, parentResponses } = await request.json()

    const alignment = await AlignmentAnalyzer.calculateAlignment(studentResponses, parentResponses)

    return NextResponse.json({
      alignment,
      calculatedAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Alignment calculation error:", error)
    return NextResponse.json({ error: "Failed to calculate alignment" }, { status: 500 })
  }
}
