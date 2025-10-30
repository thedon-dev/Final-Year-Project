import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import MaintenanceRequest from "@/lib/models/Maintenance";
import { requireAuth, getSession } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized" } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const propertyId = searchParams.get("propertyId");
    const status = searchParams.get("status");

    const query: any = {};

    // Filter by property if specified
    if (propertyId) query.propertyId = propertyId;

    // Filter by status if specified
    if (status) query.status = status;

    // Restrict based on role
    if (session.role === "tenant") {
      query.tenantId = session.userId;
    } else if (session.role === "landlord") {
      query.landlordId = session.userId;
    }

    const requests = await MaintenanceRequest.find(query)
      .sort({ createdAt: -1 })
      .limit(100)
      .populate("propertyId", "name address")
      .populate("tenantId", "profile")
      .populate("landlordId", "profile");

    return NextResponse.json({
      success: true,
      data: requests,
    });
  } catch (error: any) {
    console.error("[v0] Error fetching maintenance requests:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const session = await requireAuth();

    const body = await request.json();
    const {
      propertyId,
      unitId,
      title,
      description,
      category,
      priority,
      images,
    } = body;

    if (!propertyId || !title || !description || !category) {
      return NextResponse.json(
        { success: false, error: { message: "Missing required fields" } },
        { status: 400 }
      );
    }

    // For now, we'll fetch property to get landlordId
    const Property = (await import("@/lib/models/Property")).default;
    const property = await Property.findById(propertyId);

    if (!property) {
      return NextResponse.json(
        { success: false, error: { message: "Property not found" } },
        { status: 404 }
      );
    }

    const requestData: any = {
      propertyId,
      tenantId: session.userId,
      landlordId: property.landlordId,
      title,
      description,
      category,
      priority: priority || "medium",
    };

    if (unitId) requestData.unitId = unitId;
    if (images) requestData.images = images;

    const maintenanceRequest = await MaintenanceRequest.create(requestData);

    return NextResponse.json(
      {
        success: true,
        data: maintenanceRequest,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[v0] Error creating maintenance request:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}
