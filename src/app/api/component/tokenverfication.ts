import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function middleware(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization');
    const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Optionally, attach the user data to the request (if needed)
    // req.user = decoded;

    // Proceed with the request
    return NextResponse.next();

  } catch (err) {
    console.error('Token verification error:', err);
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
  }
}
