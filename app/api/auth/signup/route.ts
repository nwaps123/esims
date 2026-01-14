import { type NextRequest, NextResponse } from "next/server"
import { getDb } from "@/lib/db"
import { getSession, hashPassword } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const sql = getDb()

    // Check if user already exists
    const existingUsers = await sql`
      SELECT id FROM users WHERE email = ${email}
    `

    if (existingUsers.length > 0) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create new user
    const passwordHash = await hashPassword(password)
    const newUsers = await sql`
      INSERT INTO users (email, password_hash)
      VALUES (${email}, ${passwordHash})
      RETURNING id, email, created_at
    `

    const newUser = newUsers[0]

    // Create session
    const session = await getSession()
    session.userId = newUser.id
    session.email = newUser.email
    session.isLoggedIn = true
    await session.save()

    return NextResponse.json({
      success: true,
      user: { id: newUser.id, email: newUser.email },
    })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "An error occurred during signup" }, { status: 500 })
  }
}
