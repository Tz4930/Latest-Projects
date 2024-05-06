import dbConnect from "../../../db/client";
import {  NextResponse } from "next/server";
export const GET = async (request:any) =>  {
    await dbConnect();
  
      return NextResponse.json(
        { success: true, message: "working" },
        { status: 200 }
      );
  
  }
  