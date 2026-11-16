-- ==============================================================================
-- 404 MATH - SUPABASE DATABASE SCHEMA MIGRATION
-- Jalankan seluruh script SQL ini di: Supabase Dashboard -> SQL Editor -> New Query -> Run
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. USER QUIZZES TABLE (Custom Quizzes & Community Shared)
CREATE TABLE IF NOT EXISTS public.user_quizzes (
    id TEXT PRIMARY KEY,
    user_id BIGINT REFERENCES public.users(id) ON DELETE CASCADE,
    quiz_data JSONB NOT NULL,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. COURSES TABLE
CREATE TABLE IF NOT EXISTS public.courses (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    level VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. LESSONS TABLE
CREATE TABLE IF NOT EXISTS public.lessons (
    id BIGSERIAL PRIMARY KEY,
    course_id BIGINT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    content TEXT,
    sequence_number INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ACTIVITIES TABLE
CREATE TABLE IF NOT EXISTS public.activities (
    id BIGSERIAL PRIMARY KEY,
    lesson_id BIGINT REFERENCES public.lessons(id) ON DELETE CASCADE,
    creator_id BIGINT REFERENCES public.users(id) ON DELETE SET NULL,
    title VARCHAR(150) NOT NULL,
    activity_type VARCHAR(20) DEFAULT 'quiz',
    passing_score INT DEFAULT 70,
    source_document_url TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. QUESTIONS TABLE
CREATE TABLE IF NOT EXISTS public.questions (
    id BIGSERIAL PRIMARY KEY,
    activity_id BIGINT NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) DEFAULT 'multiple_choice',
    points INT DEFAULT 10
);

-- 8. ANSWER OPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.answer_options (
    id BIGSERIAL PRIMARY KEY,
    question_id BIGINT NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    answer_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE
);

-- 9. ACTIVITY SCORES TABLE
CREATE TABLE IF NOT EXISTS public.activity_scores (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    activity_id BIGINT NOT NULL REFERENCES public.activities(id) ON DELETE CASCADE,
    score INT DEFAULT 0,
    passed BOOLEAN DEFAULT FALSE,
    played_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. USER PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.user_progress (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    lesson_id BIGINT NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    progress INT DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT user_lesson_unique UNIQUE (user_id, lesson_id)
);

-- ==============================================================================
-- INDEXES UNTUK PERFORMA QUERY
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON public.users(username);
CREATE INDEX IF NOT EXISTS idx_user_quizzes_user_id ON public.user_quizzes(user_id);
CREATE INDEX IF NOT EXISTS idx_user_quizzes_is_public ON public.user_quizzes(is_public);
CREATE INDEX IF NOT EXISTS idx_lessons_course_id ON public.lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_activities_lesson_id ON public.activities(lesson_id);
CREATE INDEX IF NOT EXISTS idx_questions_activity_id ON public.questions(activity_id);
CREATE INDEX IF NOT EXISTS idx_answer_options_question_id ON public.answer_options(question_id);
CREATE INDEX IF NOT EXISTS idx_activity_scores_user ON public.activity_scores(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_user ON public.user_progress(user_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answer_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;

-- Izinkan Service Role bypass semua RLS (Server Actions Next.js dengan service_role / anon key)
-- Kebijakan akses umum untuk tabel:
DO $$
BEGIN
    -- users
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Allow server/service full access on users') THEN
        CREATE POLICY "Allow server/service full access on users" ON public.users FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- user_quizzes: izinkan semua orang membaca quiz yang is_public = true, dan full access untuk server action
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_quizzes' AND policyname = 'Allow access to user_quizzes') THEN
        CREATE POLICY "Allow access to user_quizzes" ON public.user_quizzes FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- courses
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'courses' AND policyname = 'Allow read courses') THEN
        CREATE POLICY "Allow read courses" ON public.courses FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- lessons
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'lessons' AND policyname = 'Allow read lessons') THEN
        CREATE POLICY "Allow read lessons" ON public.lessons FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- activities
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'activities' AND policyname = 'Allow access activities') THEN
        CREATE POLICY "Allow access activities" ON public.activities FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- questions
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'questions' AND policyname = 'Allow access questions') THEN
        CREATE POLICY "Allow access questions" ON public.questions FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- answer_options
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'answer_options' AND policyname = 'Allow access answer_options') THEN
        CREATE POLICY "Allow access answer_options" ON public.answer_options FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- activity_scores
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'activity_scores' AND policyname = 'Allow access activity_scores') THEN
        CREATE POLICY "Allow access activity_scores" ON public.activity_scores FOR ALL USING (true) WITH CHECK (true);
    END IF;

    -- user_progress
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'user_progress' AND policyname = 'Allow access user_progress') THEN
        CREATE POLICY "Allow access user_progress" ON public.user_progress FOR ALL USING (true) WITH CHECK (true);
    END IF;
END $$;

