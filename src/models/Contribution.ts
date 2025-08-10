import { Schema, model, Document, Types } from "mongoose";

export interface IContribution extends Document {
  userId: Types.ObjectId;
  amount: number;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const contributionSchema = new Schema<IContribution>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Contribution = model<IContribution>(
  "Contribution",
  contributionSchema
);
