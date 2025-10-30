import { type NextRequest, NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Property from "@/lib/models/Property"
import { getSession } from "@/lib/auth"

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB()
    const session = await getSession()

    if (!session || session.role !== "admin") {
      return NextResponse.json({ success: false, error: { message: "Unauthorized" } }, { status: 401 })
    }

    const { id } = await params

    const property = await Property.findByIdAndUpdate(
      id,
      {
        status: "rejected",
      },
      { new: true },
    )

    if (!property) {
      return NextResponse.json({ success: false, error: { message: "Property not found" } }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: property,
    })
  } catch (error: any) {
    console.error("[v0] Error rejecting property:", error)
    return NextResponse.json({ success: false, error: { message: error.message } }, { status: 500 })
  }
}
