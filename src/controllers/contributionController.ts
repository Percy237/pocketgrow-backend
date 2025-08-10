import { Request, Response } from "express";
import * as contributionService from "../services/contributionService";
import { AuthRequest } from "../middlewares/auth.js";

export const createContribution = async (req: AuthRequest, res: Response) => {
  try {
    const { userId, amount, date } = req.body;
    if (!userId || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Missing fields", success: false });
    }
    const contribution = await contributionService.addContribution(
      userId,
      amount,
      new Date(date)
    );
    res.status(201).json(contribution);
  } catch (error) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getContributions = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user?.role === "admin") {
      const contributions = await contributionService.getAllContributions();
      return res.json({
        data: contributions,
        message: "contributions retrieved successfully",
      });
    } else if (req.user) {
      const contributions = await contributionService.getContributionsByUser(
        req.user.userId
      );
      return res.json({
        message: "Contributions retrieved successfully",
        data: contributions,
      });
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateContribution = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { amount, date } = req.body;
    if (!amount || !date) {
      return res.status(400).json({ message: "Missing fields" });
    }
    const updated = await contributionService.updateContribution(
      id,
      amount,
      new Date(date)
    );
    if (!updated)
      return res.status(404).json({ message: "Contribution not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteContribution = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await contributionService.deleteContribution(id);
    if (!deleted)
      return res.status(404).json({ message: "Contribution not found" });
    res.json({ message: "Contribution deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
