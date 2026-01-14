import { getIronSession, type IronSession } from "iron-session"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"
import { getDb } from "./db"

export interface SessionData {
  userId?: string
  email?: string
  isLoggedIn: boolean
}

const sessionOptions = {
  password: process.env.SESSION_SECRET || "complex_password_at_least_32_characters_long_for_security",
  cookieName: "voucher_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7, // 1 week
  },
}

export async function getSession(): Promise<IronSession<SessionData>> {
  const cookieStore = await cookies()
  return getIronSession<SessionData>(cookieStore, sessionOptions)
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!session.isLoggedIn || !session.userId) {
    return null
  }

  const sql = getDb()
  const users = await sql`
    SELECT id, email, created_at 
    FROM users 
    WHERE id = ${session.userId}
  `

  return users[0] || null
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}
