import dbConnect from "@/lib/mongoDb";
import Menu from "@/models/Menu";
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/supabase";
const SUPABASE_BUCKET = process.env.NEXT_PUBLIC_SUPABASE_BUCKET;

export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const image = formData.get("image") as File;
    const price = formData.get("price") as string;
    const categoryId = formData.get("categoryId") as string;

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

    const menu = new Menu({
      name,
      status: "active",
      images: JSON.stringify([{ src: fileName, alt: fileName }]),
      price: parseFloat(price),
      categoryId,
    });
    await menu.save();

    return NextResponse.json(
      { message: "Menu added successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding menu:", error);
    return NextResponse.json({ error: "Error adding menu" }, { status: 500 });
  }
}

// GET request to fetch all menus
export async function GET() {
  try {
    await dbConnect();

    const menus = await Menu.find({}).sort({ name: 1 }).exec();
    return NextResponse.json(menus, { status: 200 });
  } catch (error) {
    console.error("Error fetching menus:", error);
    return NextResponse.json(
      { error: "Error fetching menus" },
      { status: 500 }
    );
  }
}
