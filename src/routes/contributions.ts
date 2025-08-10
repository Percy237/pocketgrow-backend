import express from "express";
import * as contributionController from "../controllers/contributionController";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

// Admin can create contribution for any user
router.post(
  "/",
  authenticateJWT,
  authorizeRoles("admin"),
  contributionController.createContribution
);

// Admin can update any contribution
router.patch(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  contributionController.updateContribution
);

// Admin can delete any contribution
router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  contributionController.deleteContribution
);

// Admin and colleague can get contributions (colleague gets own only)
router.get(
  "/",
  authenticateJWT,
  authorizeRoles("admin", "colleague"),
  contributionController.getContributions
);

export default router;
