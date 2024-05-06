import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../../db/client'; 
import MyQR from '../../../../models/MyQr'; 

export async function GET(request: NextRequest) {
  await dbConnect();
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/'); 
  const shortId = segments[3]; 
  
  if (!shortId) {
    return new NextResponse(JSON.stringify({ message: 'shortId is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const qrRecord = await MyQR.findOne({ shortId });
  if ((qrRecord?.status !== true )|| !qrRecord) {
    return new NextResponse(JSON.stringify({ message: 'Data Mising or Status is not active' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  qrRecord.scan += 1;
  await qrRecord.save();

  return NextResponse.redirect(qrRecord.originalUrl);
}
