import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/lib/models/Property";
import { getSession, requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const session = await getSession();

    const property = await Property.findById(params.id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: { message: "Property not found" } },
        { status: 404 }
      );
    }

    // Check authorization
    if (
      property.status !== "approved" &&
      session?.role !== "landlord" &&
      session?.role !== "admin"
    ) {
      if (session?.userId !== property._id.toString()) {
        return NextResponse.json(
          { success: false, error: { message: "Unauthorized" } },
          { status: 403 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: property,
    });
  } catch (error: any) {
    console.error("[v0] Error fetching property:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const session = await requireAuth();

    const property = await Property.findById(params.id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: { message: "Property not found" } },
        { status: 404 }
      );
    }

    // Check authorization - only landlord or admin can update
    if (
      session.role !== "admin" &&
      property._id.toString() !== session.userId
    ) {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized" } },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updatedProperty = await Property.findByIdAndUpdate(params.id, body, {
      new: true,
    });

    return NextResponse.json({
      success: true,
      data: updatedProperty,
    });
  } catch (error: any) {
    console.error("[v0] Error updating property:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const session = await requireAuth();

    const property = await Property.findById(params.id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: { message: "Property not found" } },
        { status: 404 }
      );
    }

    // Check authorization - only landlord or admin can delete
    if (
      session.role !== "admin" &&
      property._id.toString() !== session.userId
    ) {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized" } },
        { status: 403 }
      );
    }

    await Property.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error: any) {
    console.error("[v0] Error deleting property:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
