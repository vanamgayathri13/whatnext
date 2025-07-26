import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export class AssessmentAnalyzer {
  static async analyzeOpenEndedResponse(
    response: string,
    category: string,
  ): Promise<{
    keywords: string[]
    sentiment: number
    confidence: number
    insights: string[]
  }> {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Analyze this ${category} response from a student career assessment: "${response}"
      
      Extract:
      1. Key interests/skills/goals mentioned
      2. Sentiment score (-1 to 1)
      3. Confidence level (0 to 1)
      4. Career insights
      
      Return as JSON with keywords, sentiment, confidence, and insights arrays.`,
    })

    try {
      return JSON.parse(text)
    } catch {
      return {
        keywords: [],
        sentiment: 0,
        confidence: 0.5,
        insights: [],
      }
    }
  }

  static async generatePersonalityProfile(responses: any[]): Promise<string> {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Based on these assessment responses, determine the student's personality type:
      ${JSON.stringify(responses)}
      
      Consider traits like:
      - Introversion vs Extraversion
      - Analytical vs Creative thinking
      - Risk tolerance
      - Leadership style
      - Learning preferences
      
      Return a concise personality type (e.g., "Analytical Introvert", "Creative Leader", etc.)`,
    })

    return text.trim()
  }
}

export class RecommendationEngine {
  static async clusterStudents(students: any[]): Promise<Record<string, string[]>> {
    // Simplified clustering algorithm
    const clusters: Record<string, string[]> = {
      "STEM-Oriented": [],
      "Creative-Artistic": [],
      "Business-Leadership": [],
      "Social-Service": [],
      "Technical-Practical": [],
    }

    for (const student of students) {
      const cluster = await this.determineCluster(student)
      clusters[cluster].push(student.id)
    }

    return clusters
  }

  private static async determineCluster(student: any): Promise<string> {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Classify this student into one of these clusters based on their profile:
      - STEM-Oriented
      - Creative-Artistic  
      - Business-Leadership
      - Social-Service
      - Technical-Practical
      
      Student profile: ${JSON.stringify(student)}
      
      Return only the cluster name.`,
    })

    return text.trim()
  }

  static async generateCareerRecommendations(studentProfile: any): Promise<any> {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate career recommendations for this student:
      ${JSON.stringify(studentProfile)}
      
      Include:
      1. Recommended academic streams (MPC, BiPC, Commerce, Arts)
      2. Top 3 career paths with details
      3. Success probability (0-100)
      4. Reasoning
      
      Return as JSON with recommendedStreams, careerPaths, successProbability, and reasoning.`,
    })

    try {
      return JSON.parse(text)
    } catch {
      return {
        recommendedStreams: ["MPC"],
        careerPaths: [],
        successProbability: 70,
        reasoning: "Based on general assessment patterns",
      }
    }
  }
}

export class AlignmentAnalyzer {
  static async calculateAlignment(studentResponses: any[], parentResponses: any[]): Promise<any> {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Calculate alignment between student and parent expectations:
      
      Student responses: ${JSON.stringify(studentResponses)}
      Parent responses: ${JSON.stringify(parentResponses)}
      
      Analyze alignment in categories:
      - Career goals
      - Academic streams
      - Risk tolerance
      - Timeline expectations
      
      Return JSON with overallAlignment (0-100), categoryScores, misalignedAreas, and recommendations.`,
    })

    try {
      return JSON.parse(text)
    } catch {
      return {
        overallAlignment: 75,
        categoryScores: {},
        misalignedAreas: [],
        recommendations: [],
      }
    }
  }
}

export class MotivationEngine {
  static async generatePersonalizedNudge(studentProfile: any, progressData: any): Promise<string> {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Generate a personalized motivational message for this student:
      
      Profile: ${JSON.stringify(studentProfile)}
      Progress: ${JSON.stringify(progressData)}
      
      Create an encouraging, specific message that:
      - Acknowledges their progress
      - Provides actionable next steps
      - Maintains motivation
      - Is age-appropriate and inspiring
      
      Keep it under 100 words.`,
    })

    return text.trim()
  }
}

export class GapYearPlanner {
  static async generateGapYearPlan(studentProfile: any): Promise<any> {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `Create a gap year plan for this student:
      ${JSON.stringify(studentProfile)}
      
      Include:
      1. Recommended activities (courses, internships, volunteering)
      2. Timeline and duration
      3. Expected benefits
      4. Clarity score (how much it will help with career clarity)
      
      Return as JSON with activities array, expectedBenefits, and clarityScore.`,
    })

    try {
      return JSON.parse(text)
    } catch {
      return {
        activities: [],
        expectedBenefits: [],
        clarityScore: 70,
      }
    }
  }
}

export class MentorshipBot {
  static async generateMentorResponse(mentorProfile: any, userMessage: string, context: string[]): Promise<string> {
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are ${mentorProfile.name}, a ${mentorProfile.currentRole} with expertise in ${mentorProfile.expertise.join(", ")}.
      
      Background: ${mentorProfile.bio}
      
      Previous context: ${context.join("\n")}
      
      Student question: "${userMessage}"
      
      Respond as this mentor would, providing:
      - Practical advice based on your experience
      - Specific examples from your career
      - Actionable next steps
      - Encouraging but realistic tone
      
      Keep response conversational and under 200 words.`,
    })

    return text.trim()
  }
}
