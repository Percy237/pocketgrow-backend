import { AuthRequest } from "../middlewares/auth";
import * as userService from "../services/userService";
import { Request, Response } from "express";

export const getUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.json({
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
