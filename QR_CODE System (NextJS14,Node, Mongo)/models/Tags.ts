import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ITag extends Document {
  folderName: string;
}

const TagSchema = new Schema<ITag>({
  folderName: { type: String, required: true },
});

const TagModel: Model<ITag> = mongoose.models.Tag || mongoose.model<ITag>('Tag', TagSchema);

export default TagModel;
