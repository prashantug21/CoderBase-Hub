import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt, { JwtPayload } from 'jsonwebtoken'; // Using jwt for token verification
import sql from '@/config/database'; // Adjust the path accordingly
import leetcode from '../component/profiles/leetcode'; // Adjust paths accordingly
import codechef from '../component/profiles/codechef';
import codeforces from '../component/profiles/codeforce';
import gfg from '../component/profiles/gfg';

interface UserProfile {
  userid: number; // Adjust type according to your database schema
  username: string;
  friends: string; // Change to appropriate type if needed
  leetdata?: any; // Define more specific types based on leetcode return structure
  codechefdata?: any; // Define more specific types based on codechef return structure
  codeforcesdata?: any; // Define more specific types based on codeforces return structure
  gfgdata?: any; // Define more specific types based on GFG return structure
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    // Extract JWT from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('jwt')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (!decoded || !decoded.email) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }

    const email = decoded.email;

    // Fetch user from the database
    const userResult = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (userResult.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const data = userResult[0];
    const responseData: UserProfile = {
      userid: data.user_id,
      username: data.user_name,
      friends: data.friends,
    };

    // Fetch data from other platforms if handles exist
    if (data.leetcode_handle && data.leetcode_handle !== '') {
      responseData.leetdata = await leetcode(data.leetcode_handle);
    }
    if (data.codechef_handle && data.codechef_handle !== '') {
      responseData.codechefdata = await codechef(data.codechef_handle);
    }
    
    if (data.codeforces_handle && data.codeforces_handle !== '') {
      responseData.codeforcesdata = await codeforces(data.codeforces_handle);
    }
    if (data.gfg_handle && data.gfg_handle !== '') {
      responseData.gfgdata = await gfg(data.gfg_handle);
    }

    // Return the aggregated response
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
