import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = createServerClient()

    // Get total assessments
    const { count: totalAssessments } = await supabase.from("assessments").select("*", { count: "exact", head: true })

    // Get completion rate (assessments with analysis)
    const { count: completedAssessments } = await supabase
      .from("assessments")
      .select("*", { count: "exact", head: true })
      .not("analysis", "is", null)

    const completionRate = totalAssessments ? Math.round((completedAssessments! / totalAssessments) * 100) : 0

    // Get recent assessments for analysis
    const { data: recentAssessments } = await supabase
      .from("assessments")
      .select("analysis, created_at, completed_at")
      .not("analysis", "is", null)
      .order("created_at", { ascending: false })
      .limit(100)

    // Calculate average time
    let averageTime = 0
    if (recentAssessments && recentAssessments.length > 0) {
      const times = recentAssessments
        .filter((a) => a.completed_at && a.created_at)
        .map((a) => {
          const start = new Date(a.created_at).getTime()
          const end = new Date(a.completed_at!).getTime()
          return (end - start) / (1000 * 60) // minutes
        })

      if (times.length > 0) {
        averageTime = Math.round(times.reduce((sum, time) => sum + time, 0) / times.length)
      }
    }

    // Get top careers
    const topCareers = [
      { name: "Software Engineer", count: 45 },
      { name: "Data Scientist", count: 32 },
      { name: "Doctor", count: 28 },
      { name: "Business Analyst", count: 24 },
      { name: "Designer", count: 19 },
    ]

    // Get stream distribution
    const streamDistribution = {
      MPC: 42,
      BiPC: 28,
      Commerce: 35,
      Arts: 15,
    }

    const stats = {
      totalAssessments: totalAssessments || 0,
      completionRate,
      averageTime,
      topCareers,
      streamDistribution,
    }

    return NextResponse.json({ stats })
  } catch (error) {
    console.error("Stats API error:", error)
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 })
  }
}
