import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import MaintenanceRequest from "@/lib/models/Maintenance";
import { requireAuth } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    await requireAuth();

    const maintenanceRequest = await MaintenanceRequest.findById(params.id)
      .populate("propertyId")
      .populate("tenantId", "profile")
      .populate("landlordId", "profile");

    if (!maintenanceRequest) {
      return NextResponse.json(
        { success: false, error: { message: "Request not found" } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: maintenanceRequest,
    });
  } catch (error: any) {
    console.error("[v0] Error fetching maintenance request:", error);
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

    const maintenanceRequest = await MaintenanceRequest.findById(params.id);

    if (!maintenanceRequest) {
      return NextResponse.json(
        { success: false, error: { message: "Request not found" } },
        { status: 404 }
      );
    }

    // Check authorization
    const canUpdate =
      session.role === "admin" ||
      session.userId === maintenanceRequest.landlordId.toString() ||
      session.userId === maintenanceRequest.tenantId.toString();

    if (!canUpdate) {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized" } },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updatedRequest = await MaintenanceRequest.findByIdAndUpdate(
      params.id,
      body,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedRequest,
    });
  } catch (error: any) {
    console.error("[v0] Error updating maintenance request:", error);
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

    const maintenanceRequest = await MaintenanceRequest.findById(params.id);

    if (!maintenanceRequest) {
      return NextResponse.json(
        { success: false, error: { message: "Request not found" } },
        { status: 404 }
      );
    }

    // Only tenant who created it or landlord can delete
    const canDelete =
      session.role === "admin" ||
      session.userId === maintenanceRequest.landlordId.toString() ||
      session.userId === maintenanceRequest.tenantId.toString();

    if (!canDelete) {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized" } },
        { status: 403 }
      );
    }

    await MaintenanceRequest.findByIdAndDelete(params.id);

    return NextResponse.json({
      success: true,
      message: "Request deleted successfully",
    });
  } catch (error: any) {
    console.error("[v0] Error deleting maintenance request:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
