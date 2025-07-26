import { type NextRequest, NextResponse } from "next/server"
import type { AssessmentResponse, AssessmentResults } from "@/types/assessment"

export async function POST(request: NextRequest) {
  try {
    const { responses, userId, type } = await request.json()

    // Process the assessment responses
    const results = await processAssessment(responses, type)

    return NextResponse.json({
      success: true,
      results,
    })
  } catch (error) {
    console.error("Assessment processing error:", error)
    return NextResponse.json({ success: false, error: "Failed to process assessment" }, { status: 500 })
  }
}

async function processAssessment(
  responses: AssessmentResponse[],
  type: "student" | "parent",
): Promise<AssessmentResults> {
  // Simple ML-like processing based on responses
  const interestScores = calculateInterestScores(responses)
  const personalityTraits = calculatePersonalityTraits(responses)
  const streamRecommendation = determineStream(interestScores, personalityTraits)
  const careerMatches = generateCareerMatches(interestScores, personalityTraits, streamRecommendation)
  const strengthsWeaknesses = analyzeStrengthsWeaknesses(responses, personalityTraits)

  return {
    recommendedStream: streamRecommendation.stream,
    successProbability: streamRecommendation.probability,
    careerMatches,
    personalityProfile: {
      type: determinePersonalityType(personalityTraits),
      traits: personalityTraits,
      workStyle: determineWorkStyle(personalityTraits),
      learningStyle: determineLearningStyle(responses),
    },
    strengthsWeaknesses,
    parentChildAlignment: null, // Will be calculated when parent assessment is completed
  }
}

function calculateInterestScores(responses: AssessmentResponse[]) {
  const scores = {
    science: 0,
    technology: 0,
    arts: 0,
    business: 0,
    social: 0,
    practical: 0,
  }

  responses.forEach((response) => {
    if (response.questionId === "interests-1" && Array.isArray(response.answer)) {
      response.answer.forEach((interest) => {
        switch (interest) {
          case "Reading books and articles":
          case "Solving puzzles or brain teasers":
            scores.science += 2
            break
          case "Building or fixing things":
            scores.technology += 2
            scores.practical += 2
            break
          case "Creating art, music, or writing":
            scores.arts += 3
            break
          case "Socializing with friends":
            scores.social += 2
            break
          case "Playing video games":
            scores.technology += 1
            break
        }
      })
    }

    if (response.questionId === "academics-1" && Array.isArray(response.answer)) {
      response.answer.forEach((subject) => {
        switch (subject) {
          case "Mathematics":
          case "Physics":
          case "Chemistry":
            scores.science += 3
            break
          case "Biology":
            scores.science += 2
            break
          case "Computer Science":
            scores.technology += 3
            break
          case "English Literature":
          case "Art":
          case "Music":
            scores.arts += 3
            break
          case "Economics":
            scores.business += 2
            break
          case "Psychology":
          case "History":
            scores.social += 2
            break
        }
      })
    }
  })

  return scores
}

function calculatePersonalityTraits(responses: AssessmentResponse[]) {
  const traits = {
    analytical: 5,
    creative: 5,
    leadership: 5,
    riskTolerance: 5,
  }

  responses.forEach((response) => {
    switch (response.questionId) {
      case "personality-1": // Prefers working alone
        if (typeof response.answer === "number") {
          traits.analytical += (response.answer - 5) * 0.5
        }
        break
      case "personality-2": // Enjoys leadership
        if (typeof response.answer === "number") {
          traits.leadership += (response.answer - 5) * 0.6
        }
        break
      case "risk-tolerance-1": // Comfortable taking risks
        if (typeof response.answer === "number") {
          traits.riskTolerance += (response.answer - 5) * 0.6
        }
        break
    }
  })

  // Normalize traits to 1-10 scale
  Object.keys(traits).forEach((key) => {
    traits[key as keyof typeof traits] = Math.max(1, Math.min(10, Math.round(traits[key as keyof typeof traits])))
  })

  return traits
}

function determineStream(interestScores: any, personalityTraits: any) {
  const streamScores = {
    MPC: interestScores.science + interestScores.technology + personalityTraits.analytical * 0.5,
    BiPC: interestScores.science + interestScores.social * 0.5 + personalityTraits.analytical * 0.3,
    Commerce: interestScores.business + personalityTraits.leadership * 0.4 + personalityTraits.riskTolerance * 0.3,
    Arts: interestScores.arts + personalityTraits.creative * 0.6 + interestScores.social * 0.3,
  }

  const recommendedStream = Object.entries(streamScores).reduce((a, b) =>
    streamScores[a[0] as keyof typeof streamScores] > streamScores[b[0] as keyof typeof streamScores] ? a : b,
  )[0]

  const maxScore = Math.max(...Object.values(streamScores))
  const probability = Math.min(95, Math.max(60, Math.round((maxScore / 20) * 100)))

  return {
    stream: recommendedStream,
    probability,
  }
}

function generateCareerMatches(interestScores: any, personalityTraits: any, streamRec: any) {
  const allCareers = [
    {
      title: "Software Engineer",
      description: "Design and develop software applications and systems",
      averageSalary: "₹8-15 LPA",
      jobGrowth: "High",
      requiredStream: "MPC",
      skillsRequired: ["Programming", "Problem Solving", "Mathematics", "Logic"],
      matchFactors: { technology: 3, science: 2, analytical: 0.8 },
    },
    {
      title: "Data Scientist",
      description: "Analyze complex data to help organizations make decisions",
      averageSalary: "₹10-20 LPA",
      jobGrowth: "Very High",
      requiredStream: "MPC",
      skillsRequired: ["Statistics", "Python", "Machine Learning", "Analytics"],
      matchFactors: { science: 3, technology: 2, analytical: 0.9 },
    },
    {
      title: "Doctor",
      description: "Diagnose and treat patients in various medical specialties",
      averageSalary: "₹8-25 LPA",
      jobGrowth: "Stable",
      requiredStream: "BiPC",
      skillsRequired: ["Medical Knowledge", "Empathy", "Problem Solving", "Communication"],
      matchFactors: { science: 3, social: 2, analytical: 0.6 },
    },
    {
      title: "Business Analyst",
      description: "Analyze business processes and recommend improvements",
      averageSalary: "₹6-12 LPA",
      jobGrowth: "High",
      requiredStream: "Commerce",
      skillsRequired: ["Analysis", "Communication", "Business Acumen", "Problem Solving"],
      matchFactors: { business: 3, analytical: 0.7, social: 1 },
    },
    {
      title: "Graphic Designer",
      description: "Create visual content for digital and print media",
      averageSalary: "₹4-8 LPA",
      jobGrowth: "Medium",
      requiredStream: "Arts",
      skillsRequired: ["Creativity", "Design Software", "Visual Communication", "Artistic Skills"],
      matchFactors: { arts: 3, creative: 0.9, technology: 1 },
    },
  ]

  const careerMatches = allCareers.map((career) => {
    let matchScore = 0

    // Calculate match based on interests and personality
    Object.entries(career.matchFactors).forEach(([factor, weight]) => {
      if (factor in interestScores) {
        matchScore += interestScores[factor] * (weight as number)
      } else if (factor in personalityTraits) {
        matchScore += personalityTraits[factor] * (weight as number)
      }
    })

    // Bonus for matching stream
    if (career.requiredStream === streamRec.stream || career.requiredStream === "Any") {
      matchScore += 5
    }

    const matchPercentage = Math.min(95, Math.max(40, Math.round(matchScore * 3)))

    return {
      ...career,
      matchPercentage,
    }
  })

  return careerMatches.sort((a, b) => b.matchPercentage - a.matchPercentage)
}

function analyzeStrengthsWeaknesses(responses: AssessmentResponse[], traits: any) {
  const strengths = []
  const weaknesses = []
  const recommendations = []

  // Analyze based on personality traits
  if (traits.analytical >= 7) {
    strengths.push("Strong analytical and problem-solving skills")
    recommendations.push("Consider careers in data analysis, research, or engineering")
  } else if (traits.analytical <= 4) {
    weaknesses.push("Could benefit from developing analytical thinking skills")
    recommendations.push("Practice logical reasoning and problem-solving exercises")
  }

  if (traits.creative >= 7) {
    strengths.push("High creativity and innovative thinking")
    recommendations.push("Explore creative fields like design, writing, or arts")
  } else if (traits.creative <= 4) {
    weaknesses.push("May need to develop creative thinking abilities")
    recommendations.push("Engage in creative activities and brainstorming exercises")
  }

  if (traits.leadership >= 7) {
    strengths.push("Natural leadership and team management abilities")
    recommendations.push("Consider leadership roles and management positions")
  } else if (traits.leadership <= 4) {
    weaknesses.push("Could improve leadership and communication skills")
    recommendations.push("Join clubs, volunteer for group projects, practice public speaking")
  }

  // Add some general recommendations
  recommendations.push("Build a strong portfolio of projects in your area of interest")
  recommendations.push("Seek internships and practical experience in your chosen field")

  return {
    strengths,
    weaknesses,
    recommendations,
  }
}

function determinePersonalityType(traits: any) {
  if (traits.analytical >= 7 && traits.creative <= 5) {
    return "Analytical Thinker"
  } else if (traits.creative >= 7 && traits.analytical <= 5) {
    return "Creative Innovator"
  } else if (traits.leadership >= 7) {
    return "Natural Leader"
  } else if (traits.analytical >= 6 && traits.creative >= 6) {
    return "Balanced Problem Solver"
  } else {
    return "Adaptable Collaborator"
  }
}

function determineWorkStyle(traits: any) {
  if (traits.leadership >= 7) {
    return "Team Leader"
  } else if (traits.analytical >= 7) {
    return "Independent"
  } else if (traits.creative >= 7) {
    return "Collaborative"
  } else {
    return "Flexible"
  }
}

function determineLearningStyle(responses: AssessmentResponse[]) {
  const learningResponse = responses.find((r) => r.questionId === "learning-style-1")

  if (learningResponse && typeof learningResponse.answer === "string") {
    switch (learningResponse.answer) {
      case "Visual aids and diagrams":
        return "Visual"
      case "Hands-on practice and experiments":
        return "Kinesthetic"
      case "Reading and writing":
        return "Reading/Writing"
      case "Discussion and group work":
        return "Auditory"
      case "Audio lectures and podcasts":
        return "Auditory"
      default:
        return "Multimodal"
    }
  }

  return "Visual"
}
