import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import sql from "../../../config/database";
import jwt from "jsonwebtoken";



export async function PUT(req: NextRequest) {
  try {

    const cookieStore = cookies();
    const token = cookieStore.get("jwt")?.value;

    // console.log(token)

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string, friends:any };

    const email = decoded.email;
    const friendData = await req.json();


        // If friends array is empty or null, initialize it as an empty array
        const updatedFriends = friendData;
        // console.log(updatedFriends);

        // Update the friends array in the database
        await sql`UPDATE users 
        SET friends =  ${JSON.stringify(updatedFriends)}
        WHERE email = ${email}`;

        return NextResponse.json({ message: "Profile updated successfully",status:200 });

  } catch (error) {
    // console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
