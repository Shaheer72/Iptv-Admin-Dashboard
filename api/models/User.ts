import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  phoneNumber: string;
  referralName?: string | null;
  createdAt: Date;
}

const UserSchema: Schema = new Schema<IUser>({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  referralName: { type: String, default: null },
  createdAt: { type: Date, default: () => new Date() },
});

export const UserModel = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
