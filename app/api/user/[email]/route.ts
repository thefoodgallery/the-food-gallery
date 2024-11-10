import dbConnect from "@/lib/mongoDb";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    await dbConnect();
    const { email } = params;
    const users = await User.findOne({ email }).exec();

    return NextResponse.json({ id: users?._id });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
