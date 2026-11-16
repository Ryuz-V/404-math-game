"use server";

import { getSession } from "./auth";
import { UserQuiz } from "../../types/quiz";
import { getSupabaseServerClient } from "../../lib/supabase";

export async function saveUserQuizToDb(quiz: UserQuiz) {
  const session = await getSession();
  const userId = session?.user?.id ? session.user.id : null;
  
  if (!userId) {
    return { success: false, error: "Not logged in" };
  }
  
  const quizData = quiz as any;
  const supabase = getSupabaseServerClient();
  
  try {
    const { error } = await supabase
      .from("user_quizzes")
      .upsert({
        id: quiz.id,
        user_id: userId,
        quiz_data: quizData,
        is_public: !quiz.isDraft,
        updated_at: new Date().toISOString(),
      });

    if (error) {
      console.error("Error saving quiz to Supabase:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error saving quiz to db:", error);
    return { success: false, error: error.message };
  }
}

export async function getUserQuizzesFromDb() {
  const session = await getSession();
  const userId = session?.user?.id ? session.user.id : null;
  
  if (!userId) {
    return { loggedIn: false, quizzes: [] };
  }

  const supabase = getSupabaseServerClient();
  
  try {
    const { data: quizzes, error } = await supabase
      .from("user_quizzes")
      .select("quiz_data")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching user quizzes from Supabase:", error);
      return { loggedIn: true, quizzes: [] };
    }
    
    return {
      loggedIn: true,
      quizzes: (quizzes || []).map((q: any) => q.quiz_data as UserQuiz),
    };
  } catch (error) {
    console.error("Error fetching user quizzes:", error);
    return { loggedIn: true, quizzes: [] };
  }
}

export async function getPublicQuizzesFromDb() {
  const supabase = getSupabaseServerClient();
  try {
    const { data: quizzes, error } = await supabase
      .from("user_quizzes")
      .select("quiz_data")
      .eq("is_public", true)
      .order("updated_at", { ascending: false });

    if (error) {
      console.error("Error fetching public quizzes from Supabase:", error);
      return [];
    }
    
    return (quizzes || []).map((q: any) => q.quiz_data as UserQuiz);
  } catch (error) {
    console.error("Error fetching public quizzes:", error);
    return [];
  }
}

export async function deleteUserQuizFromDb(id: string) {
  const session = await getSession();
  const userId = session?.user?.id ? session.user.id : null;
  
  if (!userId) return { success: false, error: "Unauthorized" };

  const supabase = getSupabaseServerClient();
  
  try {
    const { error } = await supabase
      .from("user_quizzes")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) {
      console.error("Error deleting quiz from Supabase:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting quiz from db:", error);
    return { success: false, error: error.message };
  }
}
