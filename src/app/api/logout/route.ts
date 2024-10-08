import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {

    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    cookieStore.delete("jwt");
    return NextResponse.json({msg:"logged out"});
  } catch (error) {
    // console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
