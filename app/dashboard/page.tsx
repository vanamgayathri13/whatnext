import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/signup")
  }

  // Get or create user profile
  let { data: profile, error } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  if (error && error.code === "PGRST116") {
    // Profile doesn't exist, create it
    const { data: newProfile, error: insertError } = await supabase
      .from("profiles")
      .insert({
        id: session.user.id,
        full_name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || "",
        email: session.user.email,
        role: session.user.user_metadata?.role || "student",
        grade: session.user.user_metadata?.grade || "",
        avatar_url: session.user.user_metadata?.avatar_url || "",
      })
      .select()
      .single()

    if (insertError) {
      console.error("Profile creation error:", insertError)
    } else {
      profile = newProfile
    }
  }

  return <DashboardContent user={session.user} profile={profile} />
}
