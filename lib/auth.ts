import { jwtVerify, SignJWT } from "jose"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key-change-in-production")

export interface JWTPayload {
  userId: string
  email: string
  role: "tenant" | "landlord" | "admin"
}

export async function createToken(payload: JWTPayload): Promise<string> {
  return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as JWTPayload
  } catch (error) {
    return null
  }
}

export async function getSession(): Promise<JWTPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get("auth-token")

  if (!token) return null

  return verifyToken(token.value)
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
}

export async function requireAuth(request?: NextRequest): Promise<JWTPayload> {
  const session = await getSession()

  if (!session) {
    throw new Error("Unauthorized")
  }

  return session
}

export async function requireRole(role: "tenant" | "landlord" | "admin"): Promise<JWTPayload> {
  const session = await requireAuth()

  if (session.role !== role && session.role !== "admin") {
    throw new Error("Forbidden")
  }

  return session
}
