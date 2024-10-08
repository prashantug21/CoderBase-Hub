import { NextRequest, NextResponse } from "next/server";
import  otp  from "../component/otp";

export async function POST(req: NextRequest) {
  try {
    // Parse the JSON body
    const { email } = await req.json();

    console.log("Received email:", email);

    const otps=await otp(email)
    if(otps==="success"){
        return  NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });
    }

        return  NextResponse.json({ message: "Something went wrong" }, { status: 400 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}