import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    console.log("Starting file upload...");
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      console.error("Invalid file received:", file);
      return NextResponse.json(
        { error: "Invalid file provided" },
        { status: 400 }
      );
    }

    console.log("File received:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Convert file to base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    // Upload to Cloudinary
    console.log("Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(fileBase64, {
      folder: "properties",
      resource_type: "auto", // Add this to handle different file types
    });

    console.log("Upload successful:", result.secure_url);
    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error: any) {
    console.error("Upload error details:", {
      message: error.message,
      stack: error.stack,
    });
    return NextResponse.json(
      {
        error: error.message,
        details:
          process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
