import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import sql from "../../../config/database";
import jwt from "jsonwebtoken";

interface SignupRequestBody {
  userid: string;
  name: string;
  email: string;
  otp_code: string;
}

/**
 * Handles user sign up
 * @param {NextRequest} req - The Next request object
 * @returns {NextResponse} - The Next response object
 * @throws {Error} - If there is an internal server error
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the JSON body
    const { userid, name, email, otp_code }: SignupRequestBody = await req.json();
    console.log(userid, name, email, otp_code);
    // Combine email check and OTP validation in one query
    const rs = await sql`
SELECT * 
FROM users 
FULL OUTER JOIN otp 
ON users.email = otp.email 
WHERE (users.email = ${email}) 
OR (otp.email = ${email} AND otp.otp_code = ${otp_code} AND otp.created_at >= now() - interval '100 minutes');

    `;

    // Check if the email already exists in the users table
    console.log(rs);
    if (rs.some(row => row.user_id)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    // Check if a valid OTP was returned
    if (!rs.some(row => row.otp_code)) {
      return NextResponse.json({ error: "Invalid or expired OTP" }, { status: 400 });
    }

    // Delete the OTP after validation
    await sql`DELETE FROM otp WHERE email = ${email}`;

    // Insert new user
    await sql`INSERT INTO users (user_id, email, user_name) VALUES (${userid}, ${email}, ${name})`;

    // Generate JWT token
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET as string, { expiresIn: '30d' });

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

      return NextResponse.json({ message: "Sign Up successful" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "No token received from server" }, { status: 500 });
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
