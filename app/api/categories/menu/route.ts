import dbConnect from "@/lib/mongoDb";
import Category from "@/models/Category";
import Menu from "@/models/Menu";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find({
      status: "active",
    })
      .sort({ name: 1 })
      .exec();
    const categoriesWithMenus = await Promise.all(
      categories.map(async (category) => {
        const items = await Menu.find({
          categoryId: category._id,
          status: "active",
        }).exec();
        return { ...category.toObject(), items };
      })
    );
    return NextResponse.json(categoriesWithMenus, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}
