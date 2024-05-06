import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortId: string;
  imagePath?: string; 
  user: mongoose.Schema.Types.ObjectId;
  slug: String,
}

const UrlSchema: Schema = new Schema(
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
    filePath: {
      type: String, // File path is optional
      // required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
);

// Create a Model
const Url: Model<IUrl> =
  mongoose.models.Url || mongoose.model<IUrl>("Url", UrlSchema);

export default Url;
