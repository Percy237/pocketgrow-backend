import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "colleague";
  totalSavings: number;
  lastContribution?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "colleague"],
      required: true,
      default: "colleague",
    },
    totalSavings: { type: Number, default: 0 },
    lastContribution: { type: Date },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
