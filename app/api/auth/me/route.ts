import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import User from "@/lib/models/User"
import { getSession } from "@/lib/auth"

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 })
    }

    await connectDB()

    const user = await User.findById(session.userId).select("-password")

    if (!user) {
      return NextResponse.json({ success: false, error: { message: "User not found" } }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profile: user.profile,
        status: user.status,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 })
  }
}
