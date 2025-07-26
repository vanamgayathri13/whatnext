export interface Student {
  id: string
  name: string
  email: string
  grade: string
  interests: string[]
  aptitudeScores: Record<string, number>
  personalityType: string
  careerGoals: string[]
  assessmentCompleted: boolean
  streamPreference?: string
  profileCluster?: string
}

export interface Parent {
  id: string
  studentId: string
  name: string
  email: string
  expectations: string[]
  preferredStreams: string[]
  careerExpectations: string[]
  assessmentCompleted: boolean
}

export interface Assessment {
  id: string
  type: "student" | "parent"
  userId: string
  questions: AssessmentQuestion[]
  responses: AssessmentResponse[]
  completedAt?: Date
  score: number
}

export interface AssessmentQuestion {
  id: string
  type: "multiple-choice" | "rating" | "open-ended"
  question: string
  options?: string[]
  category: "interests" | "aptitude" | "personality" | "goals"
}

export interface AssessmentResponse {
  questionId: string
  answer: string | number
  confidence?: number
}

export interface StreamSimulation {
  id: string
  stream: "MPC" | "BiPC" | "Commerce" | "Arts"
  title: string
  description: string
  lessons: SimulationLesson[]
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: number
}

export interface SimulationLesson {
  id: string
  title: string
  content: string
  type: "video" | "interactive" | "quiz" | "practical"
  tasks: MicroTask[]
}

export interface MicroTask {
  id: string
  description: string
  type: "multiple-choice" | "coding" | "essay" | "calculation"
  points: number
  timeLimit?: number
}

export interface CareerRecommendation {
  id: string
  studentId: string
  recommendedStreams: string[]
  careerPaths: CareerPath[]
  successProbability: number
  reasoning: string
  confidence: number
  generatedAt: Date
}

export interface CareerPath {
  title: string
  description: string
  requiredStream: string
  entranceExams: string[]
  degreeOptions: string[]
  skillsRequired: string[]
  averageSalary: string
  jobProspects: string
  roadmap: RoadmapStep[]
}

export interface RoadmapStep {
  phase: string
  timeline: string
  activities: string[]
  milestones: string[]
}

export interface AlignmentScore {
  studentId: string
  parentId: string
  overallAlignment: number
  categoryScores: Record<string, number>
  misalignedAreas: string[]
  recommendations: string[]
  generatedAt: Date
}

export interface MotivationNudge {
  id: string
  studentId: string
  type: "reminder" | "encouragement" | "milestone" | "challenge"
  message: string
  scheduledFor: Date
  delivered: boolean
  priority: "low" | "medium" | "high"
}

export interface GapYearPlan {
  id: string
  studentId: string
  duration: number // months
  activities: GapYearActivity[]
  expectedBenefits: string[]
  clarityScore: number
  recommendationStrength: number
}

export interface GapYearActivity {
  type: "course" | "internship" | "volunteer" | "travel" | "project"
  title: string
  description: string
  duration: number
  skills: string[]
  provider?: string
  cost?: number
}

export interface MentorProfile {
  id: string
  name: string
  expertise: string[]
  experience: string
  education: string
  currentRole: string
  bio: string
  avatar: string
  specializations: string[]
}

export interface ChatMessage {
  id: string
  sessionId: string
  sender: "user" | "mentor"
  message: string
  timestamp: Date
  mentorId?: string
}
