import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import { createToken, setAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { email, password, firstName, lastName, phone, role } = body

    // Validate required fields
    if (!email || !password || !firstName || !lastName || !phone || !role) {
      return NextResponse.json({ success: false, error: { message: "All fields are required" } }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ success: false, error: { message: "Email already registered" } }, { status: 409 })
    }

    // Create new user
    const user = await User.create({
      email: email.toLowerCase(),
      password,
      role,
      profile: {
        firstName,
        lastName,
        phone,
      },
    })

    // Create JWT token
    const token = await createToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })

    // Set cookie
    await setAuthCookie(token)

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          profile: user.profile,
        },
        token,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json(
      { success: false, error: { message: error.message || "Registration failed" } },
      { status: 500 },
    )
  }
}
