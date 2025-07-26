import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Chatbot API is working",
    timestamp: new Date().toISOString(),
    hasOpenAI: !!process.env.OPENAI_API_KEY,
  })
}

export async function POST() {
  return NextResponse.json({
    response: "Test response from chatbot API",
    suggestions: ["Test suggestion 1", "Test suggestion 2", "Test suggestion 3"],
  })
}
