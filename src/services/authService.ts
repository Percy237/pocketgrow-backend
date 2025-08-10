import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, passwordHash });
  await newUser.save();
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");
  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) throw new Error("Invalid credentials");
  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "1d",
  });
  return { token, user };
};
