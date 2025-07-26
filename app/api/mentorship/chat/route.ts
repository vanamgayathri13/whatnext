import { type NextRequest, NextResponse } from "next/server"

// Fallback mentor responses
const MENTOR_RESPONSES = {
  career:
    "Great question about careers! Based on my experience in the tech industry, I'd recommend focusing on building strong fundamentals first. What specific field interests you most - engineering, medicine, business, or something else?",
  engineering:
    "Engineering is a fantastic field! I've seen many students succeed by focusing on math and physics fundamentals. Consider exploring different branches like Computer Science, Electronics, or Mechanical. Have you thought about what type of problems you'd like to solve?",
  programming:
    "Programming is an excellent skill to develop! Start with languages like Python or Java. Practice regularly with coding problems and build small projects. The key is consistent practice and understanding core concepts rather than just memorizing syntax.",
  college:
    "Choosing the right college is important, but remember that your effort matters more than the institution. Focus on colleges with good placement records, experienced faculty, and industry connections. What field are you considering?",
  default:
    "That's a thoughtful question! From my experience, success comes from combining passion with practical skills. Focus on understanding your strengths, exploring different options, and building relevant skills. What specific area would you like guidance on?",
}

function generateMentorResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("career") || lowerMessage.includes("job")) {
    return MENTOR_RESPONSES.career
  }
  if (lowerMessage.includes("engineering") || lowerMessage.includes("engineer")) {
    return MENTOR_RESPONSES.engineering
  }
  if (lowerMessage.includes("programming") || lowerMessage.includes("coding") || lowerMessage.includes("software")) {
    return MENTOR_RESPONSES.programming
  }
  if (lowerMessage.includes("college") || lowerMessage.includes("university")) {
    return MENTOR_RESPONSES.college
  }

  return MENTOR_RESPONSES.default
}

export async function POST(request: NextRequest) {
  try {
    const { mentorId, message, context } = await request.json()

    // Mock mentor profile
    const mentorProfile = {
      id: mentorId,
      name: "Dr. Sarah Chen",
      currentRole: "Senior Software Engineer at Google",
      expertise: ["Computer Science", "AI/ML", "Career Development"],
      bio: "PhD in Computer Science with 10+ years in tech industry. Passionate about mentoring students in STEM careers.",
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not found, using fallback mentor response")
      const response = generateMentorResponse(message)

      return NextResponse.json({
        response,
        mentorId,
        timestamp: new Date().toISOString(),
      })
    }

    // If API key is available, use OpenAI
    try {
      const { MentorshipBot } = await import("@/lib/ai-models")
      const response = await MentorshipBot.generateMentorResponse(mentorProfile, message, context || [])

      return NextResponse.json({
        response,
        mentorId,
        timestamp: new Date().toISOString(),
      })
    } catch (aiError) {
      console.log("OpenAI API error, falling back to simple mentor response:", aiError)
      const response = generateMentorResponse(message)

      return NextResponse.json({
        response,
        mentorId,
        timestamp: new Date().toISOString(),
      })
    }
  } catch (error) {
    console.error("Mentorship chat error:", error)
    return NextResponse.json({ error: "Failed to generate mentor response" }, { status: 500 })
  }
}
