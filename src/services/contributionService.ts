import { Contribution, IContribution } from "../models/Contribution";
import { Types } from "mongoose";
import { User } from "../models/User";

export const addContribution = async (
  userId: string,
  amount: number,
  date: Date
) => {
  const contribution = new Contribution({
    userId: new Types.ObjectId(userId),
    amount,
    date,
  });

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $inc: { totalSavings: amount },
      $set: { lastContribution: date },
    },
    { new: true }
  );
  await contribution.save();
  return contribution;
};

export const getAllContributions = async () => {
  return Contribution.find()
    .populate("userId", "name email role")
    .sort({ date: -1 });
};

export const getContributionsByUser = async (userId: string) => {
  return Contribution.find({ userId: new Types.ObjectId(userId) }).sort({
    date: -1,
  });
};

export const updateContribution = async (
  id: string,
  amount: number,
  date: Date
) => {
  return Contribution.findByIdAndUpdate(id, { amount, date }, { new: true });
};

export const deleteContribution = async (id: string) => {
  return Contribution.findByIdAndDelete(id);
};
