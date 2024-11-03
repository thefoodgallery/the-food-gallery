// update category /api/categories/[categoryId]/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/supabase";
import Category from "@/models/Category";
import dbConnect from "@/lib/mongoDb";
const SUPABASE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;

export async function PUT(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    await dbConnect();
    const { categoryId } = params;

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const status = formData.get("status") as string;

    const category = await Category.findById(categoryId).exec();
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }

    if (image) {
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
      category.image = fileName;
    }

    category.name = name || category.name;
    category.status = status || category.status;
    await category.save();

    return NextResponse.json(
      { message: "Category updated successfully", data: category },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Error updating category" },
      { status: 500 }
    );
  }
}
