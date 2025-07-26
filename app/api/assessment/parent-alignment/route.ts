import { type NextRequest, NextResponse } from "next/server"
import { AssessmentEngine } from "@/lib/assessment-engine"
import { createServerClient } from "@/lib/supabase/server"
import type { AssessmentResponse, ParentExpectations } from "@/types/assessment"

export async function POST(request: NextRequest) {
  try {
    const { studentResponses, parentExpectations, userId } = await request.json()

    if (!studentResponses || !parentExpectations || !userId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Calculate parent-child alignment
    const alignmentScore = await AssessmentEngine.calculateParentChildAlignment(
      studentResponses as AssessmentResponse[],
      parentExpectations as ParentExpectations,
    )

    // Save alignment data to database
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("parent_child_alignments")
      .insert({
        user_id: userId,
        student_responses: studentResponses,
        parent_expectations: parentExpectations,
        alignment_score: alignmentScore,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save alignment data" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      alignmentId: data.id,
      alignmentScore: alignmentScore,
    })
  } catch (error) {
    console.error("Parent alignment calculation error:", error)
    return NextResponse.json({ error: "Failed to calculate alignment" }, { status: 500 })
  }
}
