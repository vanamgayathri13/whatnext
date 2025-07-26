export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          role: "student" | "parent" | "mentor" | "admin"
          avatar_url?: string
          phone?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          role: "student" | "parent" | "mentor" | "admin"
          avatar_url?: string
          phone?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          role?: "student" | "parent" | "mentor" | "admin"
          avatar_url?: string
          phone?: string
          updated_at?: string
        }
      }
      student_profiles: {
        Row: {
          id: string
          user_id: string
          grade: string
          school: string
          interests: string[]
          aptitude_scores: Record<string, number>
          personality_type?: string
          career_goals: string[]
          parent_id?: string
          assessment_completed: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          grade: string
          school: string
          interests?: string[]
          aptitude_scores?: Record<string, number>
          personality_type?: string
          career_goals?: string[]
          parent_id?: string
          assessment_completed?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          grade?: string
          school?: string
          interests?: string[]
          aptitude_scores?: Record<string, number>
          personality_type?: string
          career_goals?: string[]
          parent_id?: string
          assessment_completed?: boolean
          updated_at?: string
        }
      }
      assessments: {
        Row: {
          id: string
          user_id: string
          type: "student" | "parent"
          questions: any[]
          responses: any[]
          analysis: any
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: "student" | "parent"
          questions: any[]
          responses: any[]
          analysis?: any
          completed_at?: string
          created_at?: string
        }
        Update: {
          questions?: any[]
          responses?: any[]
          analysis?: any
          completed_at?: string
        }
      }
      recommendations: {
        Row: {
          id: string
          student_id: string
          recommended_streams: string[]
          career_paths: any[]
          success_probability: number
          reasoning: string
          confidence: number
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          recommended_streams: string[]
          career_paths: any[]
          success_probability: number
          reasoning: string
          confidence: number
          created_at?: string
        }
        Update: {
          recommended_streams?: string[]
          career_paths?: any[]
          success_probability?: number
          reasoning?: string
          confidence?: number
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          mentor_id?: string
          messages: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          mentor_id?: string
          messages?: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          messages?: any[]
          updated_at?: string
        }
      }
    }
  }
}
