import { Schema, model } from 'mongoose';

export interface IUser {
  userId: string;
  xp: number;
  level: number;
}

const userSchema = new Schema<IUser>({
  userId: { type: String, required: true, unique: true },
  xp: { type: Number, default: 0 },
  level: { type: Number, default: 1 }
});

export const UserModel = model<IUser>('User', userSchema);
