import { NextResponse } from 'next/server';
import dbConnect from '../../../db/client';
import TagModel, { ITag } from '../../../models/Tags';

export const POST = async (request: any) => {
  try {
    let folderName;
    try {
      const body = await request.json();
      folderName = body.folderName;
    } catch (error) {
      return NextResponse.json({ message: 'Error parsing JSON body' }, { status: 400 });
    }
    if (!folderName) {
      return NextResponse.json({ message: 'folderName is required' }, { status: 400 });
    }

    await dbConnect();

    const existingFolder = await TagModel.findOne({ folderName });
    if (existingFolder) {
      return NextResponse.json({ message: 'Folder Name already exists' }, { status: 409 });
    }

    const newFolder: ITag = new TagModel({ folderName });
    await newFolder.save();
    return NextResponse.json({ message: 'Folder Name successfully created' }, { status: 200 });

  } catch (error) {
    console.error('Error in POST:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
};

export const GET = async (request: any) => {
  await dbConnect();
  try {
    const tags = await TagModel.find();

    return NextResponse.json(
      {
        success: true,
        data: tags,
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