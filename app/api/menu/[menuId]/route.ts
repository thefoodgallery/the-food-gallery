// api/menu/[menuId]/route.ts

import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/supabase";
import Menu from "@/models/Menu";
import dbConnect from "@/lib/mongoDb";
import mongoose from "mongoose";
const SUPABASE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;

export async function PUT(
  request: Request,
  { params }: { params: { menuId: string } }
) {
  try {
    await dbConnect();
    const { menuId } = params;

    const formData = await request.formData();

    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const price = formData.get("price") as string;
    const categoryId = formData.get("categoryId") as string;
    const status = formData.get("status") as "active" | "inactive";
    // console.log(menuId);
    const menu = await Menu.findById(menuId).exec();
    // console.log(menu);
    if (!menu) {
      return NextResponse.json({ error: "Menu not found" }, { status: 404 });
    }

    if (image) {
      const sanitizedMenuName = image.name.replace(/[^a-zA-Z0-9]/g, "_");
      const imageName = `menu/${sanitizedMenuName}` as string;
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
      menu.images = JSON.stringify([{ src: fileName, alt: fileName }]);
    }

    menu.name = name || menu.name;
    menu.status = status || menu.status;
    menu.price = parseFloat(price) || menu.price;
    menu.categoryId = categoryId
      ? new mongoose.Types.ObjectId(categoryId)
      : menu.categoryId;

    await menu.save();

    return NextResponse.json(
      { message: "Menu updated successfully", data: menu },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating menu:", error);
    return NextResponse.json({ error: "Error updating menu" }, { status: 500 });
  }
}
