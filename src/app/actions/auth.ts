"use server";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });
const secretKey = "super-secret-math-key-do-not-use-in-production";
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
    return { error: "Semua bidang harus diisi" };
  }

  try {
    const existingUser = await prisma.users.findUnique({ where: { email } });
    if (existingUser) {
      return { error: "Email sudah digunakan" };
    }
    
    const existingUsername = await prisma.users.findUnique({ where: { username: name } });
    if (existingUsername) {
      return { error: "Username sudah digunakan, silakan pilih nama lain" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        email,
        password_hash: hashedPassword,
        username: name,
      },
    });

    const session = await encrypt({ user: { id: user.id.toString(), name: user.username, avatar: "👑", email: user.email } });
    const cookieStore = await cookies();
    cookieStore.set("session", session, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });

    return { success: true, user: { name: user.username, avatar: "👑", email: user.email } };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email dan password harus diisi" };
  }

  try {
    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return { error: "Email tidak ditemukan" };
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return { error: "Password salah" };
    }

    const session = await encrypt({ user: { id: user.id.toString(), name: user.username, avatar: "👑", email: user.email } });
    const cookieStore = await cookies();
    cookieStore.set("session", session, { httpOnly: true, expires: new Date(Date.now() + 24 * 60 * 60 * 1000) });

    return { success: true, user: { name: user.username, avatar: "👑", email: user.email } };
  } catch (error: any) {
    return { error: error.message };
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
