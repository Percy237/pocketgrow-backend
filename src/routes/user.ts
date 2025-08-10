import express from "express";
import * as userController from "../controllers/userController";
import { authenticateJWT, authorizeRoles } from "../middlewares/auth";

const router = express.Router();

router.get(
  "/",
  authenticateJWT,
  authorizeRoles("admin"),
  userController.getUsers
);

export default router;
