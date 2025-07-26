-- Create assessments table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL CHECK (type IN ('student', 'parent')),
  responses JSONB NOT NULL,
  analysis JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create parent_child_alignments table
CREATE TABLE IF NOT EXISTS parent_child_alignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  student_responses JSONB NOT NULL,
  parent_expectations JSONB NOT NULL,
  alignment_score JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create assessment_questions table for admin management
CREATE TABLE IF NOT EXISTS assessment_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id VARCHAR(100) UNIQUE NOT NULL,
  question_text TEXT NOT NULL,
  question_type VARCHAR(20) NOT NULL,
  category VARCHAR(50) NOT NULL,
  options JSONB,
  is_required BOOLEAN DEFAULT true,
  weight INTEGER DEFAULT 1,
  branching_logic JSONB,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create career_database table
CREATE TABLE IF NOT EXISTS career_database (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  required_stream VARCHAR(50),
  average_salary VARCHAR(100),
  job_growth VARCHAR(100),
  skills_required JSONB,
  education_path JSONB,
  industry VARCHAR(100),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default assessment questions
INSERT INTO assessment_questions (question_id, question_text, question_type, category, options, is_required, weight) VALUES
('interests_1', 'Which activities do you enjoy most in your free time?', 'multiple-choice', 'interests', 
 '["Solving puzzles and brain teasers", "Drawing, painting, or creative writing", "Playing sports or outdoor activities", "Reading books or learning new topics", "Building or fixing things", "Helping friends with their problems"]', 
 true, 3),
('academic_1', 'Rate your confidence in Mathematics (1-10)', 'rating', 'academics', null, true, 3),
('academic_2', 'Rate your confidence in Science subjects (1-10)', 'rating', 'academics', null, true, 3),
('personality_1', 'In group projects, you typically:', 'multiple-choice', 'personality',
 '["Take the lead and organize everyone", "Contribute ideas and support the leader", "Focus on specific tasks assigned to you", "Prefer to work independently when possible"]',
 true, 2),
('goals_1', 'What motivates you most about your future career?', 'multiple-choice', 'goals',
 '["Making a positive impact on society", "Achieving financial success and stability", "Having creative freedom and self-expression", "Gaining recognition and professional status", "Continuous learning and intellectual growth"]',
 true, 3);

-- Insert sample career data
INSERT INTO career_database (title, description, required_stream, average_salary, job_growth, skills_required, education_path) VALUES
('Software Engineer', 'Design and develop software applications and systems', 'MPC', '₹8-15 LPA', '22% (Much faster than average)', 
 '["Programming", "Problem Solving", "Mathematics", "Logic"]', '["B.Tech Computer Science", "B.E. Software Engineering"]'),
('Data Scientist', 'Analyze complex data to help organizations make decisions', 'MPC', '₹10-20 LPA', '31% (Much faster than average)',
 '["Statistics", "Programming", "Machine Learning", "Analytics"]', '["B.Tech Data Science", "B.Sc Statistics + M.Sc Data Science"]'),
('Doctor (MBBS)', 'Diagnose and treat patients in various medical specialties', 'BiPC', '₹10-25 LPA', '7% (Faster than average)',
 '["Biology", "Chemistry", "Empathy", "Communication"]', '["MBBS", "MD/MS Specialization"]'),
('Chartered Accountant', 'Provide accounting, tax, and business advisory services', 'Commerce', '₹8-20 LPA', '10% (Faster than average)',
 '["Accounting", "Taxation", "Financial Analysis", "Business Law"]', '["B.Com + CA", "Direct CA after 12th"]');

-- Enable RLS
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_child_alignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_database ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own assessments" ON assessments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own assessments" ON assessments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own alignments" ON parent_child_alignments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own alignments" ON parent_child_alignments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Everyone can view active questions" ON assessment_questions
  FOR SELECT USING (is_active = true);

CREATE POLICY "Everyone can view active careers" ON career_database
  FOR SELECT USING (is_active = true);

-- Admin policies (assuming admin role exists)
CREATE POLICY "Admins can manage questions" ON assessment_questions
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

CREATE POLICY "Admins can manage careers" ON career_database
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );
