import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Profile } from "../models/profile.model.js";

// Register a new profile
const registerProfile = asyncHandler(async (req, res) => {
  const { githubUrl, linkedinUrl, links, experience, education } = req.body;

  if (!githubUrl || !linkedinUrl) {
    throw new ApiError(400, "GitHub and LinkedIn URLs are required.");
  }

  const existingProfile = await Profile.findOne({ user: req.user._id });

  if (existingProfile) {
    throw new ApiError(409, "Profile already exists for this user.");
  }

  const profile = await Profile.create({
    user: req.user._id, // Assuming you have a user reference
    githubUrl,
    linkedinUrl,
    links,
    experience,
    education,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, profile, "Profile registered successfully."));
});

// Get profile of the current user
const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({ user: req.user._id });

  if (!profile) {
    throw new ApiError(404, "Profile not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Profile fetched successfully."));
});

// Update profile information
const changeProfileInfo = asyncHandler(async (req, res) => {
  const { githubUrl, linkedinUrl, links, experience, education } = req.body;

  const profile = await Profile.findOneAndUpdate(
    { user: req.user._id },
    {
      $set: {
        githubUrl,
        linkedinUrl,
        links,
        experience,
        education,
      },
    },
    { new: true }
  );

  if (!profile) {
    throw new ApiError(404, "Profile not found for the user.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, profile, "Profile information updated successfully.")
    );
});

const getProfileByUserId = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const profile = await Profile.findOne({ user: userId });

  if (!profile) {
    throw new ApiError(404, "Profile not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Profile fetched successfully."));
});

export {getProfileByUserId, registerProfile, getProfile, changeProfileInfo };
