import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Standard Supabase client (Client-side & Server-side with Anon Key)
export const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: typeof window !== "undefined",
      autoRefreshToken: typeof window !== "undefined",
      detectSessionInUrl: true,
    },
  }
);

// Admin/Server client (Bypasses RLS when SUPABASE_SERVICE_ROLE_KEY is provided)
export const getSupabaseServerClient = () => {
  const key = supabaseServiceKey || supabaseAnonKey;
  if (!supabaseUrl || !key) {
    console.warn("Supabase credentials not configured in environment variables.");
  }
  return createClient(
    supabaseUrl || "https://placeholder-url.supabase.co",
    key || "placeholder-key",
    {
      auth: {
        persistSession: false,
      },
    }
  );
};

