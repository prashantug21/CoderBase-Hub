import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const { email, otp } = await req.json();

    // console.log("Received email:", email, "otp:", otp);

    // // Send the email data to your server
    // console.log(`${process.env.Server}login`);
    const response = await fetch(`${process.env.Server}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: otp }),
      credentials: "include",
    });

    // console.log("Server response status:", response.json());


    if (response.ok) {
      // Get JWT token from response header
      const token = response.headers.get("Authorization")?.split(" ")[1];
      // console.log("token", token);

      if (token) {
        // Set the token as a secure HTTP-only cookie
        cookies().set({
          name: 'jwt',
          value: token,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          path: '/',
        });

        return NextResponse.json({ message: "Login successful" }, { status: 200 });
      } else {
        return NextResponse.json({ message: "No token received from server" }, { status: 500 });
      }
    } else {
      return NextResponse.json({ message: "Something went wrong" }, { status: response.status });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}