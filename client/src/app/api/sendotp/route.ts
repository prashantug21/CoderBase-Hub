import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const { email } = await req.json();

    console.log("Received email:", email);

    // Send the email data to your server
    console.log(`${process.env.Server}sendOTP`)
    const response = await fetch(`${process.env.Server}sendOTP`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email:email}),
    });

    console.log("Server response status:", response.status);

    if (response.ok) {
      return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Something went wrong" }, { status: response.status });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}