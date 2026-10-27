import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { folder } = await request.json();
    const timestamp = Math.round(new Date().getTime() / 1000);
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
    const apiKey = process.env.CLOUDINARY_API_KEY || "demo_key";

    // In production with real Cloudinary credentials, generate signature using crypto.
    // For free unsigned presets or client uploads, upload preset can be used directly.
    return NextResponse.json({
      timestamp,
      cloudName,
      apiKey,
      folder: folder || "school_web_assets",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
