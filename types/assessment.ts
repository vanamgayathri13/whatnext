export enum QuestionType {
  MULTIPLE_CHOICE = "multiple_choice",
  RATING_SCALE = "rating_scale",
  MULTIPLE_SELECT = "multiple_select",
  OPEN_ENDED = "open_ended",
  RANKING = "ranking",
}

export interface AssessmentQuestion {
  id: string
  question: string
  description?: string
  type: "multiple-choice" | "rating" | "text" | "multiple-select" | "ranking"
  options?: string[]
  category: "student" | "parent" | "general"
  weight?: number
  required: boolean
}

export interface AssessmentResponse {
  questionId: string
  question: string
  answer: string | string[] | number
  category: string
  weight: number
}

export interface StudentAssessment {
  id: string
  userId: string
  responses: AssessmentResponse[]
  completionPercentage: number
  startedAt: Date
  completedAt?: Date
  results?: AssessmentResults
}

export interface ParentAssessment {
  id: string
  parentId: string
  studentId: string
  responses: AssessmentResponse[]
  completedAt?: Date
  expectations: ParentExpectations
}

export interface ParentExpectations {
  preferredStreams: string[]
  careerPriorities: string[]
  riskTolerance: number
  timelineExpectations: string
  supportLevel: string
}

export interface AssessmentResults {
  recommendedStream: string
  successProbability: number
  careerMatches: CareerMatch[]
  personalityProfile: PersonalityProfile
  strengthsWeaknesses: StrengthsWeaknesses
  parentChildAlignment: ParentChildAlignment | null
}

export interface CareerMatch {
  title: string
  description: string
  matchPercentage: number
  averageSalary: string
  jobGrowth: string
  requiredStream: string
  skillsRequired: string[]
}

export interface StreamRecommendation {
  stream: string
  suitability: number
  careers: string[]
  successProbability: number
}

export interface PersonalityProfile {
  type: string
  traits: {
    analytical: number
    creative: number
    leadership: number
    riskTolerance: number
  }
  workStyle: string
  learningStyle: string
}

export interface StrengthsWeaknesses {
  strengths: string[]
  weaknesses: string[]
  recommendations: string[]
}

export interface ParentChildAlignment {
  overallScore: number
  categoryScores: {
    [category: string]: number
  }
  misalignedAreas: string[]
}
