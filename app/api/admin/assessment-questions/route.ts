import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerClient()

    const { data: questions, error } = await supabase
      .from("assessment_questions")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 })
    }

    return NextResponse.json({ questions })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const question = await request.json()
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("assessment_questions")
      .insert({
        question_id: `custom_${Date.now()}`,
        question_text: question.question,
        question_type: question.type,
        category: question.category,
        options: question.options,
        is_required: question.isRequired,
        weight: question.weight,
        branching_logic: question.branchingLogic,
      })
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to create question" }, { status: 500 })
    }

    return NextResponse.json({ success: true, question: data })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
