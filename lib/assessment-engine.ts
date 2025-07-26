import type {
  AssessmentResponse,
  AssessmentResult,
  PersonalityProfile,
  CareerMatch,
  StreamRecommendation,
} from "@/types/assessment"

// ML-based personality clustering
const personalityTypes = [
  {
    type: "Innovator",
    description: "Creative problem-solver who thrives on new challenges and innovative solutions",
    traits: { openness: 9, conscientiousness: 7, extraversion: 6, agreeableness: 6, neuroticism: 4 },
  },
  {
    type: "Analyst",
    description: "Logical thinker who excels at data analysis and systematic problem-solving",
    traits: { openness: 7, conscientiousness: 9, extraversion: 4, agreeableness: 5, neuroticism: 3 },
  },
  {
    type: "Helper",
    description: "Empathetic individual focused on supporting and developing others",
    traits: { openness: 6, conscientiousness: 8, extraversion: 7, agreeableness: 9, neuroticism: 4 },
  },
  {
    type: "Leader",
    description: "Natural leader who excels at organizing teams and driving results",
    traits: { openness: 7, conscientiousness: 8, extraversion: 9, agreeableness: 7, neuroticism: 3 },
  },
  {
    type: "Explorer",
    description: "Curious and adaptable individual who enjoys learning and new experiences",
    traits: { openness: 9, conscientiousness: 6, extraversion: 6, agreeableness: 7, neuroticism: 5 },
  },
]

const careerDatabase: CareerMatch[] = [
  {
    title: "Software Engineer",
    match: 0,
    description: "Design and develop software applications and systems",
    salaryRange: "₹6-20 LPA",
    growthPotential: "Very High",
    educationPath: "Computer Science/IT Engineering",
    skills: ["Programming", "Problem Solving", "Logic", "Mathematics"],
  },
  {
    title: "Data Scientist",
    match: 0,
    description: "Analyze complex data to extract insights and drive business decisions",
    salaryRange: "₹8-25 LPA",
    growthPotential: "Very High",
    educationPath: "Statistics/Mathematics/Computer Science",
    skills: ["Statistics", "Programming", "Machine Learning", "Analytics"],
  },
  {
    title: "Doctor",
    match: 0,
    description: "Diagnose and treat patients to improve health outcomes",
    salaryRange: "₹8-30 LPA",
    growthPotential: "High",
    educationPath: "MBBS + Specialization",
    skills: ["Biology", "Chemistry", "Empathy", "Problem Solving"],
  },
  {
    title: "Mechanical Engineer",
    match: 0,
    description: "Design and develop mechanical systems and products",
    salaryRange: "₹5-18 LPA",
    growthPotential: "High",
    educationPath: "Mechanical Engineering",
    skills: ["Physics", "Mathematics", "Design", "Problem Solving"],
  },
  {
    title: "Financial Analyst",
    match: 0,
    description: "Analyze financial data and market trends for investment decisions",
    salaryRange: "₹6-22 LPA",
    growthPotential: "High",
    educationPath: "Commerce/Economics/Finance",
    skills: ["Mathematics", "Economics", "Analytics", "Communication"],
  },
  {
    title: "Graphic Designer",
    match: 0,
    description: "Create visual content for digital and print media",
    salaryRange: "₹3-12 LPA",
    growthPotential: "Medium",
    educationPath: "Fine Arts/Design",
    skills: ["Creativity", "Design Software", "Visual Arts", "Communication"],
  },
  {
    title: "Teacher",
    match: 0,
    description: "Educate and inspire students in academic subjects",
    salaryRange: "₹3-10 LPA",
    growthPotential: "Medium",
    educationPath: "Subject Specialization + B.Ed",
    skills: ["Communication", "Patience", "Subject Knowledge", "Leadership"],
  },
  {
    title: "Marketing Manager",
    match: 0,
    description: "Develop and execute marketing strategies to promote products/services",
    salaryRange: "₹5-18 LPA",
    growthPotential: "High",
    educationPath: "Marketing/Business Administration",
    skills: ["Communication", "Creativity", "Analytics", "Leadership"],
  },
]

export async function processAssessment(responses: AssessmentResponse[]): Promise<AssessmentResult> {
  try {
    // Calculate personality profile using ML clustering
    const personalityProfile = calculatePersonalityProfile(responses)

    // Generate career matches using weighted scoring
    const careerMatches = calculateCareerMatches(responses, personalityProfile)

    // Recommend academic streams
    const streamRecommendations = calculateStreamRecommendations(responses)

    // Extract strengths and improvement areas
    const { strengths, improvements } = analyzeStrengthsAndImprovements(responses)

    // Calculate overall confidence score
    const confidence = calculateConfidenceScore(responses)

    return {
      personalityProfile,
      careerMatches: careerMatches.slice(0, 5), // Top 5 matches
      streamRecommendations,
      strengths,
      improvements,
      confidence,
    }
  } catch (error) {
    console.error("Assessment processing error:", error)
    throw error
  }
}

function calculatePersonalityProfile(responses: AssessmentResponse[]): PersonalityProfile {
  // Extract personality-related responses
  const personalityResponses = responses.filter((r) => r.questionId.includes("personality"))

  // Calculate Big Five traits based on responses
  const traits = {
    openness: 5,
    conscientiousness: 5,
    extraversion: 5,
    agreeableness: 5,
    neuroticism: 5,
  }

  // Analyze responses to adjust traits
  responses.forEach((response) => {
    if (response.questionId === "personality_1") {
      // Team collaboration affects extraversion and agreeableness
      const score = Number.parseInt(response.response as string) || 5
      traits.extraversion += (score - 5) * 0.3
      traits.agreeableness += (score - 5) * 0.2
    }

    if (response.questionId === "personality_2") {
      // Challenge approach affects conscientiousness and openness
      const approach = response.response as string
      if (approach?.includes("Plan carefully")) {
        traits.conscientiousness += 1
      } else if (approach?.includes("Jump in")) {
        traits.openness += 1
        traits.neuroticism += 0.5
      }
    }

    if (response.questionId === "personality_3") {
      // Risk tolerance affects openness and neuroticism
      const score = Number.parseInt(response.response as string) || 5
      traits.openness += (score - 5) * 0.2
      traits.neuroticism -= (score - 5) * 0.2
    }

    if (response.questionId === "personality_4") {
      // Leadership affects extraversion and conscientiousness
      const score = Number.parseInt(response.response as string) || 5
      traits.extraversion += (score - 5) * 0.3
      traits.conscientiousness += (score - 5) * 0.1
    }
  })

  // Normalize traits to 1-10 scale
  Object.keys(traits).forEach((key) => {
    traits[key as keyof typeof traits] = Math.max(1, Math.min(10, traits[key as keyof typeof traits]))
  })

  // Find best matching personality type
  let bestMatch = personalityTypes[0]
  let bestScore = 0

  personalityTypes.forEach((type) => {
    const score = calculatePersonalityMatch(traits, type.traits)
    if (score > bestScore) {
      bestScore = score
      bestMatch = type
    }
  })

  return {
    type: bestMatch.type,
    traits,
    description: bestMatch.description,
  }
}

function calculatePersonalityMatch(userTraits: any, typeTraits: any): number {
  let totalDifference = 0
  Object.keys(userTraits).forEach((trait) => {
    totalDifference += Math.abs(userTraits[trait] - typeTraits[trait])
  })
  return 50 - totalDifference // Higher score = better match
}

function calculateCareerMatches(responses: AssessmentResponse[], personality: PersonalityProfile): CareerMatch[] {
  const matches = careerDatabase.map((career) => {
    let matchScore = 50 // Base score

    // Analyze interests
    const interestResponses = responses.filter((r) => r.questionId.includes("interests"))
    interestResponses.forEach((response) => {
      if (Array.isArray(response.response)) {
        response.response.forEach((interest) => {
          if (
            career.skills.some(
              (skill) =>
                skill.toLowerCase().includes(interest.toLowerCase()) ||
                interest.toLowerCase().includes(skill.toLowerCase()),
            )
          ) {
            matchScore += 5
          }
        })
      }
    })

    // Analyze academic strengths
    const academicResponses = responses.filter((r) => r.questionId.includes("academics"))
    academicResponses.forEach((response) => {
      if (Array.isArray(response.response)) {
        response.response.forEach((subject) => {
          if (
            career.skills.some(
              (skill) =>
                skill.toLowerCase().includes(subject.toLowerCase()) ||
                subject.toLowerCase().includes(skill.toLowerCase()),
            )
          ) {
            matchScore += 8
          }
        })
      }
    })

    // Personality alignment
    if (personality.type === "Analyst" && career.title.includes("Data")) matchScore += 15
    if (personality.type === "Helper" && (career.title.includes("Doctor") || career.title.includes("Teacher")))
      matchScore += 15
    if (personality.type === "Innovator" && career.title.includes("Engineer")) matchScore += 15
    if (personality.type === "Leader" && career.title.includes("Manager")) matchScore += 15

    return {
      ...career,
      match: Math.min(95, Math.max(20, matchScore)),
    }
  })

  return matches.sort((a, b) => b.match - a.match)
}

function calculateStreamRecommendations(responses: AssessmentResponse[]): StreamRecommendation[] {
  const streams = [
    {
      stream: "MPC (Math, Physics, Chemistry)",
      suitability: 50,
      careers: ["Engineering", "Research", "Technology", "Architecture"],
      successProbability: 50,
    },
    {
      stream: "BiPC (Biology, Physics, Chemistry)",
      suitability: 50,
      careers: ["Medicine", "Pharmacy", "Biotechnology", "Research"],
      successProbability: 50,
    },
    {
      stream: "Commerce",
      suitability: 50,
      careers: ["Business", "Finance", "Accounting", "Economics"],
      successProbability: 50,
    },
    {
      stream: "Arts/Humanities",
      suitability: 50,
      careers: ["Literature", "Psychology", "Social Work", "Journalism"],
      successProbability: 50,
    },
  ]

  // Analyze academic preferences
  const academicResponse = responses.find((r) => r.questionId === "academics_1")
  if (academicResponse && Array.isArray(academicResponse.response)) {
    const subjects = academicResponse.response

    // MPC scoring
    if (subjects.includes("Mathematics") || subjects.includes("Physics") || subjects.includes("Chemistry")) {
      streams[0].suitability += 20
      streams[0].successProbability += 15
    }

    // BiPC scoring
    if (subjects.includes("Biology") || subjects.includes("Chemistry") || subjects.includes("Physics")) {
      streams[1].suitability += 20
      streams[1].successProbability += 15
    }

    // Commerce scoring
    if (subjects.includes("Economics") || subjects.includes("Mathematics")) {
      streams[2].suitability += 15
      streams[2].successProbability += 12
    }

    // Arts scoring
    if (subjects.includes("English") || subjects.includes("History") || subjects.includes("Languages")) {
      streams[3].suitability += 15
      streams[3].successProbability += 12
    }
  }

  return streams
    .map((stream) => ({
      ...stream,
      suitability: Math.min(95, stream.suitability),
      successProbability: Math.min(90, stream.successProbability),
    }))
    .sort((a, b) => b.suitability - a.suitability)
}

function analyzeStrengthsAndImprovements(responses: AssessmentResponse[]): {
  strengths: string[]
  improvements: string[]
} {
  const strengths: string[] = []
  const improvements: string[] = []

  // Analyze based on responses
  responses.forEach((response) => {
    if (response.questionId === "personality_1") {
      const score = Number.parseInt(response.response as string) || 5
      if (score >= 7) {
        strengths.push("Team collaboration")
      } else if (score <= 4) {
        improvements.push("Teamwork skills")
      }
    }

    if (response.questionId === "academics_2") {
      const score = Number.parseInt(response.response as string) || 5
      if (score >= 7) {
        strengths.push("Numerical aptitude")
      } else if (score <= 4) {
        improvements.push("Mathematical skills")
      }
    }

    if (response.questionId === "personality_4") {
      const score = Number.parseInt(response.response as string) || 5
      if (score >= 7) {
        strengths.push("Leadership potential")
      } else if (score <= 4) {
        improvements.push("Leadership skills")
      }
    }
  })

  // Add default strengths and improvements if none identified
  if (strengths.length === 0) {
    strengths.push("Analytical thinking", "Problem solving", "Adaptability")
  }

  if (improvements.length === 0) {
    improvements.push("Communication skills", "Time management", "Technical skills")
  }

  return { strengths: strengths.slice(0, 5), improvements: improvements.slice(0, 3) }
}

function calculateConfidenceScore(responses: AssessmentResponse[]): number {
  let confidence = 70 // Base confidence

  // Higher confidence for more complete responses
  const completeResponses = responses.filter((r) => {
    if (Array.isArray(r.response)) {
      return r.response.length > 0
    }
    return r.response && r.response.toString().trim().length > 0
  })

  confidence += (completeResponses.length / responses.length) * 20

  // Adjust based on response consistency
  const ratingResponses = responses.filter(
    (r) => !Array.isArray(r.response) && !isNaN(Number.parseInt(r.response as string)),
  )

  if (ratingResponses.length > 0) {
    const ratings = ratingResponses.map((r) => Number.parseInt(r.response as string))
    const variance = calculateVariance(ratings)

    // Lower variance = more consistent = higher confidence
    if (variance < 2) confidence += 10
    else if (variance > 6) confidence -= 5
  }

  return Math.max(60, Math.min(95, Math.round(confidence)))
}

function calculateVariance(numbers: number[]): number {
  const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length
  const squaredDiffs = numbers.map((num) => Math.pow(num - mean, 2))
  return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / numbers.length
}
