import dbConnect from "@/lib/mongoDb";
import Category from "@/models/Category";
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/supabase";
const SUPABASE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;

export async function POST(request: Request) {
  try {
    await dbConnect();

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const image = formData.get("image") as File;

    const sanitizedCategoryName = image.name.replace(/[^a-zA-Z0-9]/g, "_");
    const imageName = `category/${sanitizedCategoryName}` as string;
    const fileName = imageName || "default.jpg";

    if (image && SUPABASE_BUCKET) {
      const { error: uploadError } = await supabase.storage
        .from(SUPABASE_BUCKET)
        .upload(fileName, image, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.log("Error uploading image:", uploadError);
        return NextResponse.json(
          { error: uploadError.message },
          { status: 500 }
        );
      }
    }

    const category = new Category({ name, status: "active", image: fileName });
    await category.save();

    return NextResponse.json(
      { message: "Category added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding category:", error);
    return NextResponse.json(
      { error: "Error adding category" },
      { status: 500 }
    );
  }
}

// GET request to fetch all categories
export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find({}).sort({ name: 1 }).exec();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}
