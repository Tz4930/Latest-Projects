import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
