import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Payment from "@/lib/models/Payment"
import { getSession } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const session = await getSession()

    if (!session) {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 })
    }

    const query: any = {}

    // Filter by role
    if (session.role === "landlord") {
      query.landlordId = session.userId
    } else if (session.role === "tenant") {
      query.tenantId = session.userId
    }
    // Admin sees all

    const payments = await Payment.find(query).sort({ dueDate: -1 }).limit(100)

    return NextResponse.json({
      success: true,
      data: payments,
    })
  } catch (error: any) {
    console.error("[v0] Error fetching payments:", error)
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 })
  }
}
