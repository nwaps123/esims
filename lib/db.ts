import { neon } from "@neondatabase/serverless"

export function getDb() {
  const databaseUrl = process.env.POSTGRES_URL

  if (!databaseUrl) {
    console.error("POSTGRES_URL environment variable is not set")
    throw new Error("Database configuration error: POSTGRES_URL is required")
  }

  try {
    return neon(databaseUrl)
  } catch (error) {
    console.error("Failed to create database client:", error)
    throw new Error("Database connection error")
  }
}
