import { Request, Response } from "express";
import * as authService from "../services/authService";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Missing fields", success: false });
    }
    const user = await authService.registerUser(name, email, password);
    res
      .status(201)
      .json({ message: "User created", userId: user._id, success: true });
  } catch (error: any) {
    if (error.message === "User already exists") {
      return res.status(409).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Missing fields", success: false });
    }
    const { token, user } = await authService.loginUser(email, password);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(401).json({ message: error.message, success: false });
  }
};
