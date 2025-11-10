import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import { createToken, setAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: { message: "Email and password are required" } },
        { status: 400 },
      )
    }
    const user = await User.findOne({ email: email.toLowerCase() })
    if (!user) {
      return NextResponse.json({ success: false, error: { message: "Invalid credentials" } }, { status: 401 })
    }
    const isValidPassword = await user.comparePassword(password)
    if (!isValidPassword) {
      return NextResponse.json({ success: false, error: { message: "Invalid credentials" } }, { status: 401 })
    }
    if (user.status !== "active") {
      return NextResponse.json({ success: false, error: { message: "Account is suspended" } }, { status: 403 })
    }

    const token = await createToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    await setAuthCookie(token)

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
      },
      token,
    })
  } catch (error: any) {
    console.error("[v0] Login error:", error)
    return NextResponse.json({ success: false, error: { message: error.message || "Login failed" } }, { status: 500 })
  }
}
