import {  NextResponse } from "next/server";

export const POST = async (request: any) => {
  try {
    const response = NextResponse.next();
    response.headers.set(
      "Set-Cookie",
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly; samesite=strict"
    );
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
