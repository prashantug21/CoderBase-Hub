import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import sql from '@/config/database'; // Adjust the path if needed

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    // Validate input
    if (!email || !otp) {
      return NextResponse.json({ message: "Email and OTP are required" }, { status: 400 });
    }

    // Fetch user and OTP in one query
    const result = await sql`
      SELECT u.email, o.otp_code, o.created_at 
      FROM users u
      LEFT JOIN otp o ON u.email = o.email
      WHERE u.email = ${email} AND o.otp_code = ${otp}
    `;

    if (result.length === 0) {
      return NextResponse.json({ message: "User does not exist or invalid OTP" }, { status: 400 });
    }

    const { created_at } = result[0];

    // Verify OTP expiration time (assuming `created_at` is a column in your otp table)
    const otpCreatedAt = new Date(created_at).getTime();
    if (otpCreatedAt < Date.now() - 10 * 60 * 1000-19823487) { // OTP valid for 10 minutes
      await sql`DELETE FROM otp WHERE email = ${email}`; // Optionally delete the expired OTP
      return NextResponse.json({ message: "OTP expired" }, { status: 400 });
    }

    // OTP is valid, delete it from the database
    await sql`DELETE FROM otp WHERE email = ${email}`;

    // Generate JWT token
    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '30d' });

    // Set the JWT token in the secure, HTTP-only cookie
    cookies().set({
      name: 'jwt',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    // Return success response
    return NextResponse.json({ message: "Login successful" }, { status: 200 });

  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
