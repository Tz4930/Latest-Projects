// models/ImageModel.ts
import mongoose, { Document, Model, Schema } from 'mongoose';

interface IImage extends Document {
  filename: string;
  path: string;
}

const ImageSchema = new Schema<IImage>({
  filename: { type: String, required: true },
  path: { type: String, required: true },
});

const ImageModel: Model<IImage> = mongoose.models.Image || mongoose.model('Image', ImageSchema);

export default ImageModel;
