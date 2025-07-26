import { type NextRequest, NextResponse } from "next/server"

const CAREER_CONTEXT = `You are a helpful AI career counselor for WhatNext, an AI-powered career guidance platform for Indian students. You help students and parents with:

1. Career path recommendations
2. Academic stream selection (MPC, BiPC, Commerce, Arts)
3. College and entrance exam guidance
4. Study abroad options
5. Gap year planning
6. Skill development advice

Keep responses:
- Conversational and encouraging
- Specific to Indian education system
- Under 150 words
- Include actionable advice when possible
- Suggest using WhatNext's assessment tools when relevant

Common topics:
- Engineering (JEE, NEET, BITSAT)
- Medical careers (NEET, AIIMS)
- Commerce (CA, CS, MBA)
- Arts and humanities
- Emerging fields (AI, Data Science, Digital Marketing)
`

const QUICK_SUGGESTIONS = [
  "Tell me about engineering careers",
  "How to choose between science streams?",
  "What are good commerce career options?",
  "Should I consider studying abroad?",
  "How to prepare for competitive exams?",
  "What skills are in demand today?",
]

// Enhanced fallback responses with more variety
const FALLBACK_RESPONSES = {
  greeting: [
    "Hello! I'm here to help you with career guidance. What would you like to explore today?",
    "Hi there! I'm your AI career counselor. How can I assist you with your career planning?",
    "Welcome! I'm excited to help you discover your perfect career path. What's on your mind?",
  ],
  career: [
    "There are many exciting career paths available! For engineering, consider streams like Computer Science, Electronics, or Mechanical. For medical careers, focus on Biology and Chemistry. Commerce opens doors to CA, CS, and MBA programs. What specific field interests you most?",
    "Career choices can be overwhelming, but that's what I'm here for! Let's start by understanding your interests. Are you more drawn to technical fields like engineering, healthcare like medicine, business like commerce, or creative fields like arts?",
    "Great question about careers! The key is finding something that matches your interests and strengths. Would you like to explore specific fields like technology, healthcare, business, or creative arts?",
  ],
  stream: [
    "Choosing the right stream is crucial! MPC (Math, Physics, Chemistry) is great for engineering. BiPC (Biology, Physics, Chemistry) leads to medical careers. Commerce suits business-minded students. Arts offers creative and humanities options. Take our assessment to find your perfect match!",
    "Stream selection is one of the most important decisions! Each stream opens different doors: MPC for engineering and tech, BiPC for medical and life sciences, Commerce for business and finance, Arts for creative and social fields. What are your natural strengths?",
    "The right stream depends on your interests and career goals. Science streams (MPC/BiPC) are great for technical and medical fields, Commerce for business careers, and Arts for creative and social sciences. Have you taken our career assessment yet?",
  ],
  engineering: [
    "Engineering offers diverse opportunities! Popular branches include Computer Science (software development), Electronics (hardware/embedded systems), Mechanical (manufacturing/automotive), and Civil (construction/infrastructure). Focus on JEE preparation and consider your interests in math and physics.",
    "Engineering is fantastic! With branches like CSE, ECE, Mechanical, Civil, and newer fields like AI/ML, there's something for everyone. Strong math and physics foundation is key. Are you interested in any specific engineering branch?",
    "The engineering field is booming in India! From traditional branches like Mechanical and Civil to modern ones like Computer Science and AI, opportunities are endless. JEE is your gateway. What type of problems do you enjoy solving?",
  ],
  medical: [
    "Medical careers are rewarding! MBBS leads to becoming a doctor, while other options include pharmacy, physiotherapy, nursing, and medical research. Strong foundation in Biology and Chemistry is essential. NEET is the main entrance exam to focus on.",
    "Healthcare offers many fulfilling career paths! Beyond MBBS, consider BDS (dentistry), pharmacy, physiotherapy, or medical research. All require strong science background and NEET qualification. What aspect of healthcare interests you?",
    "Medical field is noble and rewarding! Options include doctor (MBBS), dentist (BDS), pharmacist, physiotherapist, or medical researcher. Biology and Chemistry are crucial subjects. Have you started NEET preparation?",
  ],
  commerce: [
    "Commerce opens many doors! You can pursue CA (Chartered Accountancy), CS (Company Secretary), CMA (Cost Management), or MBA. Other options include banking, finance, marketing, and entrepreneurship. Strong analytical and communication skills are valuable.",
    "Business and commerce have excellent prospects! CA and CS are prestigious options, while MBA opens management roles. Banking, finance, marketing, and entrepreneurship are also great paths. What interests you more - numbers or people?",
    "Commerce stream leads to exciting business careers! From traditional CA/CS to modern digital marketing and fintech, opportunities are growing. Strong analytical skills and business acumen are key. Are you interested in finance or marketing?",
  ],
  exams: [
    "Competitive exams are gateways to great careers! JEE for engineering, NEET for medical, CLAT for law, and various others. The key is consistent preparation, understanding concepts, and regular practice. Which exam are you targeting?",
    "Entrance exams can seem daunting, but with right preparation, you can crack them! Focus on understanding concepts rather than rote learning. Create a study schedule and stick to it. Which competitive exam interests you?",
    "Success in competitive exams requires strategy and dedication. Start early, understand the pattern, practice regularly, and take mock tests. Remember, these exams test your understanding, not just memory. Need help with any specific exam?",
  ],
  skills: [
    "Today's job market values both technical and soft skills! For tech careers, learn programming, data analysis, and AI/ML. For all careers, develop communication, problem-solving, and leadership skills. What field are you interested in?",
    "Future-ready skills include digital literacy, critical thinking, creativity, and adaptability. Technical skills like coding, data analysis are in high demand. Soft skills like communication and teamwork are equally important. What skills would you like to develop?",
    "The job market is evolving rapidly! In-demand skills include programming, data science, digital marketing, and AI/ML. Don't forget soft skills like communication, leadership, and emotional intelligence. Which area interests you most?",
  ],
  default: [
    "That's a great question! Career planning is important and I'm here to help. Consider taking our comprehensive assessment to discover your interests and strengths. You can also explore our stream simulations to get hands-on experience. What specific aspect of career planning would you like to discuss?",
    "I'm here to guide you through your career journey! Whether it's choosing streams, preparing for exams, or exploring career options, I can help. Our platform offers assessments, simulations, and personalized recommendations. What would you like to explore first?",
    "Career decisions can be challenging, but you're not alone! I can help you explore different paths, understand entrance requirements, and plan your academic journey. Have you tried our career assessment tool yet? What's your main concern right now?",
  ],
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)]
}

function getKeywordResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  // Greeting detection
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return getRandomResponse(FALLBACK_RESPONSES.greeting)
  }

  // Career-related keywords
  if (lowerMessage.includes("career") || lowerMessage.includes("job") || lowerMessage.includes("profession")) {
    return getRandomResponse(FALLBACK_RESPONSES.career)
  }

  // Stream-related keywords
  if (
    lowerMessage.includes("stream") ||
    lowerMessage.includes("subject") ||
    lowerMessage.includes("mpc") ||
    lowerMessage.includes("bipc") ||
    lowerMessage.includes("commerce") ||
    lowerMessage.includes("arts")
  ) {
    return getRandomResponse(FALLBACK_RESPONSES.stream)
  }

  // Engineering keywords
  if (
    lowerMessage.includes("engineering") ||
    lowerMessage.includes("engineer") ||
    lowerMessage.includes("jee") ||
    lowerMessage.includes("iit")
  ) {
    return getRandomResponse(FALLBACK_RESPONSES.engineering)
  }

  // Medical keywords
  if (
    lowerMessage.includes("medical") ||
    lowerMessage.includes("doctor") ||
    lowerMessage.includes("neet") ||
    lowerMessage.includes("mbbs") ||
    lowerMessage.includes("medicine")
  ) {
    return getRandomResponse(FALLBACK_RESPONSES.medical)
  }

  // Commerce keywords
  if (
    lowerMessage.includes("business") ||
    lowerMessage.includes("ca") ||
    lowerMessage.includes("cs") ||
    lowerMessage.includes("mba") ||
    lowerMessage.includes("finance")
  ) {
    return getRandomResponse(FALLBACK_RESPONSES.commerce)
  }

  // Exam keywords
  if (
    lowerMessage.includes("exam") ||
    lowerMessage.includes("preparation") ||
    lowerMessage.includes("entrance") ||
    lowerMessage.includes("competitive")
  ) {
    return getRandomResponse(FALLBACK_RESPONSES.exams)
  }

  // Skills keywords
  if (
    lowerMessage.includes("skill") ||
    lowerMessage.includes("learn") ||
    lowerMessage.includes("programming") ||
    lowerMessage.includes("coding")
  ) {
    return getRandomResponse(FALLBACK_RESPONSES.skills)
  }

  return getRandomResponse(FALLBACK_RESPONSES.default)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context } = body

    if (!message || typeof message !== "string") {
      return NextResponse.json({
        response: "I didn't receive your message properly. Could you please try again?",
        suggestions: QUICK_SUGGESTIONS.slice(0, 3),
      })
    }

    // Check if OpenAI API key is available
    if (!process.env.OPENAI_API_KEY) {
      console.log("OpenAI API key not found, using enhanced fallback response")

      const response = getKeywordResponse(message)
      const suggestions = QUICK_SUGGESTIONS.sort(() => Math.random() - 0.5).slice(0, 3)

      return NextResponse.json({
        response,
        suggestions,
      })
    }

    // If API key is available, try to use OpenAI
    try {
      const { generateText } = await import("ai")
      const { openai } = await import("@ai-sdk/openai")

      const contextMessages = Array.isArray(context)
        ? context.map((msg: any) => `${msg.sender}: ${msg.content}`).join("\n")
        : ""

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: `${CAREER_CONTEXT}

Previous conversation:
${contextMessages}

User: ${message}

Respond as a helpful career counselor. Be encouraging and provide specific, actionable advice.`,
        maxTokens: 200,
      })

      const suggestions = QUICK_SUGGESTIONS.sort(() => Math.random() - 0.5).slice(0, 3)

      return NextResponse.json({
        response: text.trim(),
        suggestions,
      })
    } catch (aiError) {
      console.log("OpenAI API error, falling back to enhanced keyword response:", aiError)

      const response = getKeywordResponse(message)
      const suggestions = QUICK_SUGGESTIONS.sort(() => Math.random() - 0.5).slice(0, 3)

      return NextResponse.json({
        response,
        suggestions,
      })
    }
  } catch (error) {
    console.error("Chatbot API error:", error)

    return NextResponse.json({
      response:
        "I'm having some technical difficulties right now, but I'm still here to help! You can explore our career assessment tools or ask me about different career paths. What would you like to know?",
      suggestions: [
        "Tell me about engineering careers",
        "How do I choose the right stream?",
        "What are popular career options?",
      ],
    })
  }
}
