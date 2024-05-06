import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import dbConnect from "../../../db/client";
import MyQR from "../../../models/MyQr"; // Ensure this is typed correctly
import mongoose from "mongoose";

// POST logic adapted for NextResponse
export const POST = async (request: any) => {
  const data = await request.formData();
  const file = data.get("file") as unknown as File | null;
  const originalUrl = data.get("originalUrl") as string;
  const title = data.get("title") as string;
  const shortId = data.get("shortId") as string;
  const user = data.get("userId") as string;
  if (!file || !originalUrl || !user) {
    return NextResponse.json(
      { success: false, message: "Missing required fields" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const directoryPath = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(directoryPath, file.name);

  await mkdir(directoryPath, { recursive: true });
  await writeFile(filePath, buffer);
  await dbConnect();

  const defaultMedium: string | null = null;
  const defaultCampaignStart: Date | null = null;
  const defaultCampaignEnd: Date | null = null;
  const defaultTag: string | null = null;

  const newMyQR = await MyQR.create({
    title,
    originalUrl,
    shortId,
    filePath: filePath.replace(/^.*[\\\/]/, ""),
    user,
    status: true, // Set default status to true
    scan: 0, // Here you are setting scan to 0 by default when creating the document
    medium: defaultMedium,
    campaignStart: defaultCampaignStart,
    campaignEnd: defaultCampaignEnd,
    tag: defaultTag,
  });

  return NextResponse.json(
    {
      message: "File uploaded and URL shortened",
      shortId,
      originalUrl,
      filePath: filePath.replace(/^.*[\\\/]/, ""),
      title,
      user,
      scan: newMyQR.scan, // Include the scan value in the response
      medium: defaultMedium,
      campaignStart: defaultCampaignStart,
      campaignEnd: defaultCampaignEnd,
      tag: defaultTag,
    },
    { status: 201 }
  );
};
// ===================================== GET QR CODE FROM DATABASE =======================================

// GET logic adapted for NextResponse
export const GET = async (request: any) => {
  await dbConnect();

  const urlSearchParams = new URL(request.url).searchParams;
  const userId = urlSearchParams.get("userId");
  const shortId = urlSearchParams.get("shortId");
  const statusString = urlSearchParams.get("status"); // New
  const search = urlSearchParams.get("search"); // New

  try {
    let urlData;

    const query: any = { user: userId };

    if (shortId) {
      urlData = await MyQR.findOne({ shortId });
      if (!urlData) {
        return NextResponse.json(
          { success: false, message: "QR code not found" },
          { status: 404 }
        );
      }
    } else {
      // Modify query to handle status and search
      if (statusString) {
        const status = statusString.toLowerCase() === "true"; // Interpret as boolean
        query.status = status ? "true" : "false"; // Map to actual status value
      }

      if (search && typeof search === "string") {
        query.title = new RegExp(search, "i");
      }

      urlData = await MyQR.find(query);

      if (!urlData.length) {
        return NextResponse.json(
          { success: false, message: "No URLs found for this user" },
          { status: 404 }
        );
      }
    }

    return NextResponse.json(
      {
        success: true,
        data: urlData,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching URLs:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
};
