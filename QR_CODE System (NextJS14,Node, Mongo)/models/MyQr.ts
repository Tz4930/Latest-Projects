import mongoose, { Document, Model, Schema } from "mongoose";

interface IMyQR extends Document {
  title: string;
  originalUrl: string;
  shortId: string;
  filePath?: string;
  user: mongoose.Schema.Types.ObjectId;
  status: boolean;
  scan: number;
  medium?: string; // Updated field for medium
  campaignStart?: Date; // Updated field for campaignStart
  campaignEnd?: Date; // Updated field for campaignEnd
  tag?: mongoose.Schema.Types.ObjectId; // Updated field for tag
}

const MyQRSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    originalUrl: {
      type: String,
      required: true,
    },
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    filePath: { // Ensuring this matches what you've defined in your interface.
      type: String, // Keeping it optional as you might not always have a file.
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    status: {
      type: Boolean,
      default: true,
    },
    scan: {
      type: Number,
      default: 0,
    },
    medium: {
      type: String,
    },
    campaignStart: {
      type: Date,
    },
    campaignEnd: {
      type: Date,
    },
    tag: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tag", // Assuming the reference model is called "Tag"
    },
  },
  {
    timestamps: true, // Enables createdAt and updatedAt fields automatically.
  }
);

// Avoid creating the model multiple times in hot-reload environments.
const MyQR: Model<IMyQR> = mongoose.models.MyQR || mongoose.model<IMyQR>("MyQR", MyQRSchema);

export default MyQR;
