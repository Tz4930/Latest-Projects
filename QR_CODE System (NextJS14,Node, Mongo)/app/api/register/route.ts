import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dbConnect from '../../../db/client';
import User from '../../../models/User';
const JWT_SECRET="k18fepvWSIMyNHU+ZJDDQUci1hbAK8NQVBSuURlR/yVYuw+YxYVE4+lN8Jq3/N5Obmh+AsKV54kI/wvnEDkBbg=="

export const POST = async (request:any) =>  {
    try {
        if (!request.headers.get('content-type')?.includes('application/json')) {
          return NextResponse.json({ message: 'Content-Type must be application/json' }, { status: 415 });
        }
         let email, password;
        try {
          const body = await request.json();
          email = body.email;
          password = body.password;
        } catch (error) {
          return NextResponse.json({ message: 'Error parsing JSON body' }, { status: 400 });
        }
    if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
      }
  
      await dbConnect();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({ message: 'User already exists' }, { status: 409 });
      }
    
      const hashedPassword = await bcrypt.hash(password, 10);
    
      const user = new User({
        email,
        password: hashedPassword,
      });
    
      await user.save();
    
      const token = jwt.sign({ userId: user._id.toString() }, JWT_SECRET, {
        expiresIn: '2h',
      });
    
    
      
      return NextResponse.json({ message: 'User created successfully' , token  }, { status: 201 }); // Adjust accordingly
  
    } catch (error) {
      console.error('Error in POST:', error); // Log the error for debugging purposes
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
    
  }

  // export default async function handler(request: NextRequest): Promise<NextResponse> {
  //   switch (request.method) {
  //     case 'POST':
  //       return POST(request);
  //     default:
  //       return NextResponse.json({ success: false, message: 'Method not allowed' }, { status: 405 });
  //   }
  // }