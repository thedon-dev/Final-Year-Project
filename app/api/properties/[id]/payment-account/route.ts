import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/lib/models/Property";
import { requireAuth } from "@/lib/auth";

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

    // Check authorization - only landlord or admin can update payment account
    if (
      session.role !== "admin" &&
      property.landlordId.toString() !== session.userId
    ) {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized" } },
        { status: 403 }
      );
    }

    const { accountNumber, accountName, bankName } = await request.json();

    if (!accountNumber || !accountName || !bankName) {
      return NextResponse.json(
        {
          success: false,
          error: { message: "All payment account fields are required" },
        },
        { status: 400 }
      );
    }

    property.paymentAccount = {
      accountNumber,
      accountName,
      bankName,
    };

    await property.save();

    return NextResponse.json({
      success: true,
      data: property,
    });
  } catch (error: any) {
    console.error("[v0] Error updating payment account:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
