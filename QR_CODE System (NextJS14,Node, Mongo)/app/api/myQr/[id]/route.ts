import { NextResponse } from "next/server";

import dbConnect from "../../../../db/client";
import MyQR from "../../../..//models/MyQr"; 
import mongoose from "mongoose";

// Put logic adapted for NextResponse
export const PUT = async (request: any,
  { params }: { params: {id:string} }
) => {
  const { id } = params;
  const body = await request.json();
  await dbConnect();
  try {
    const updatedTag = await MyQR.findByIdAndUpdate(id, body, { new: true });
    if (!updatedTag) {
      return NextResponse.json({ success: false, message: 'Data not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updatedTag }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
  }
};