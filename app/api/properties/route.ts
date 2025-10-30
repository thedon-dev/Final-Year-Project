import { type NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/lib/models/Property";
import { getSession } from "@/lib/auth";
import QRCode from "qrcode";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const session = await getSession();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const city = searchParams.get("city");

    const query: any = {};

    // Filter by landlord if not admin
    if (session && session.role === "landlord") {
      query.landlordId = session.userId;
    }

    // Only show approved properties for public/tenant view
    if (!session || session.role === "tenant") {
      query.status = "approved";
    }

    if (status) query.status = status;
    if (city) query["address.city"] = new RegExp(city, "i");

    const properties = await Property.find(query)
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json({
      success: true,
      data: properties,
    });
  } catch (error: any) {
    console.error("[v0] Error fetching properties:", error);
    return NextResponse.json(
      { success: false, error: { message: error.message } },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const session = await getSession();

    if (!session || (session.role !== "landlord" && session.role !== "admin")) {
      return NextResponse.json(
        { success: false, error: { message: "Unauthorized" } },
        { status: 401 }
      );
    }

    const body = await request.json();
    console.log("Received property data:", body);

    const { name, type, description, address, amenities, images } = body;

    if (images && !Array.isArray(images)) {
      return NextResponse.json(
        { success: false, error: { message: "Images must be an array" } },
        { status: 400 }
      );
    }

    if (!name || !type || !description || !address) {
      return NextResponse.json(
        { success: false, error: { message: "Missing required fields" } },
        { status: 400 }
      );
    }

    const qrCodeData = `${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/property/${name.toLowerCase().replace(/\s+/g, "-")}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    const property = await Property.create({
      landlordId: session.userId,
      name,
      type,
      description,
      address,
      amenities: amenities || [],
      images: images || [],
      status: "pending",
      qrCode,
    });

    return NextResponse.json(
      {
        success: true,
        data: property,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[v0] Error creating property:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message,
          details:
            process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
      },
      { status: 500 }
    );
  }
}
