"use server";

import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { getSession } from "./auth";
import { UserQuiz } from "../../types/quiz";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function saveUserQuizToDb(quiz: UserQuiz) {
  const session = await getSession();
  const userId = session?.user?.id ? BigInt(session.user.id) : null;
  
  if (!userId) {
    return { success: false, error: "Not logged in" };
  }
  
  const quizData = quiz as any;
  
  try {
    await prisma.user_quizzes.upsert({
      where: { id: quiz.id },
      update: {
        quiz_data: quizData,
        is_public: !quiz.isDraft,
      },
      create: {
        id: quiz.id,
        user_id: userId,
        quiz_data: quizData,
        is_public: !quiz.isDraft,
      }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error saving quiz to db:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserQuizzesFromDb() {
  const session = await getSession();
  const userId = session?.user?.id ? BigInt(session.user.id) : null;
  
  if (!userId) {
    return { loggedIn: false, quizzes: [] };
  }
  
  try {
    const quizzes = await prisma.user_quizzes.findMany({
      where: { user_id: userId },
      orderBy: { updated_at: 'desc' }
    });
    
    return { loggedIn: true, quizzes: quizzes.map((q: any) => q.quiz_data as UserQuiz) };
  } catch (error) {
    console.error("Error fetching user quizzes:", error);
    return { loggedIn: true, quizzes: [] };
  }
}

export async function getPublicQuizzesFromDb() {
  try {
    const quizzes = await prisma.user_quizzes.findMany({
      where: { is_public: true },
      orderBy: { updated_at: 'desc' }
    });
    
    return quizzes.map((q: any) => q.quiz_data as UserQuiz);
  } catch (error) {
    console.error("Error fetching public quizzes:", error);
    return [];
  }
}

export async function deleteUserQuizFromDb(id: string) {
  const session = await getSession();
  const userId = session?.user?.id ? BigInt(session.user.id) : null;
  
  if (!userId) return { success: false, error: "Unauthorized" };
  
  try {
    await prisma.user_quizzes.deleteMany({
      where: { 
        id,
        user_id: userId
      }
    });
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting quiz from db:", error);
    return { success: false, error: error.message };
  }
}
