import { Router } from "express";
import {
  registerProfile,
  getProfile,
  changeProfileInfo,
  getProfileByUserId,
} from "../controllers/profile.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Register a new profile
router.route("/register").post(verifyJWT, registerProfile);

// Get the current user's profile
router.route("/").get(verifyJWT, getProfile);

// Update profile information
router.route("/update").patch(verifyJWT, changeProfileInfo);

// Get profile by user ID
router.route("/:userId").get(verifyJWT, getProfileByUserId);

export default router;
