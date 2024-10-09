import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import sql from '@/config/database'
import jwt from "jsonwebtoken";

export async function PUT(req: NextRequest) {
  try {

    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
    const email = decoded.email;
    const {leetcode,codechef,codeforces,gfg} = await req.json();

    await sql`UPDATE users SET leetcode_handle = ${leetcode}, codechef_handle = ${codechef}, codeforces_handle = ${codeforces}, gfg_handle = ${gfg} WHERE email = ${email}`;
    return NextResponse.json({message:"Profile updated successfully",status:200});
  } catch (error) {
    // console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
