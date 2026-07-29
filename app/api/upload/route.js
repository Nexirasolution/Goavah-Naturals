import { NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/cloudinary";

export async function POST(req) {
  try {
    const { image, folder } = await req.json();

    if (!image) {
      return NextResponse.json({ error: "No image provided." }, { status: 400 });
    }

    const result = await uploadImageToCloudinary(image, folder || "kmc-products");
    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Image upload failed." }, { status: 500 });
  }
}
