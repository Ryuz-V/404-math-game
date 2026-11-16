"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { getSupabaseServerClient } from "../../lib/supabase";

const secretKey = process.env.JWT_SECRET || "super-secret-math-key-do-not-use-in-production";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  if (!email || !password || !name) {
    return { error: "All fields are required" };
  }

  const supabase = getSupabaseServerClient();

  try {
    // 1. Check if email already registered
    const { data: existingUser, error: checkEmailErr } = await supabase
      .from("users")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (checkEmailErr) {
      console.error("Supabase check email error:", checkEmailErr);
      return { error: "Failed to connect to Supabase database. Please check your credentials." };
    }

    if (existingUser) {
      return { error: "Email is already in use" };
    }

    // 2. Check if username already registered
    const { data: existingUsername, error: checkUserErr } = await supabase
      .from("users")
      .select("id")
      .eq("username", name)
      .maybeSingle();

    if (checkUserErr) {
      console.error("Supabase check username error:", checkUserErr);
      return { error: "Failed to verify username with Supabase." };
    }

    if (existingUsername) {
      return { error: "Username is already taken, please choose another name" };
    }

    // 3. Hash password and insert user
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data: newUser, error: insertErr } = await supabase
      .from("users")
      .insert({
        email,
        password_hash: hashedPassword,
        username: name,
      })
      .select("id, username, email")
      .single();

    if (insertErr || !newUser) {
      console.error("Supabase insert user error:", insertErr);
      return { error: insertErr?.message || "Failed to create account" };
    }

    // 4. Create session token
    const session = await encrypt({
      user: {
        id: newUser.id.toString(),
        name: newUser.username,
        avatar: "👑",
        email: newUser.email,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return {
      success: true,
      user: {
        name: newUser.username,
        avatar: "👑",
        email: newUser.email,
      },
    };
  } catch (error: any) {
    return { error: error.message || "An error occurred during signup" };
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  const supabase = getSupabaseServerClient();

  try {
    // 1. Fetch user by email
    const { data: user, error: fetchErr } = await supabase
      .from("users")
      .select("id, username, email, password_hash")
      .eq("email", email)
      .maybeSingle();

    if (fetchErr) {
      console.error("Supabase fetch user error:", fetchErr);
      return { error: "Failed to connect to Supabase database. Please check your credentials." };
    }

    if (!user) {
      return { error: "Email not found" };
    }

    // 2. Compare password hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return { error: "Incorrect password" };
    }

    // 3. Buat session token
    const session = await encrypt({
      user: {
        id: user.id.toString(),
        name: user.username,
        avatar: "👑",
        email: user.email,
      },
    });

    const cookieStore = await cookies();
    cookieStore.set("session", session, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    return {
      success: true,
      user: {
        name: user.username,
        avatar: "👑",
        email: user.email,
      },
    };
  } catch (error: any) {
    return { error: error.message || "An error occurred during login" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", { httpOnly: true, expires: new Date(0) });
  return { success: true };
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;
  try {
    return await decrypt(session);
  } catch (error) {
    return null;
  }
}
