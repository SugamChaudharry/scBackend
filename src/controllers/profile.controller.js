import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Profile } from "../models/profile.model.js";

// Register a new profile
const registerProfile = asyncHandler(async (req, res) => {
  const {title,about, githubUrl, linkedinUrl, links, experience, education, skills, location } = req.body;

  const existingProfile = await Profile.findOne({ owner: req.user._id });

  if (existingProfile) {
    throw new ApiError(409, "Profile already exists for this user.");
  }

  const profile = await Profile.create({
    owner: req.user._id,
    title,
    about,
    githubUrl,
    linkedinUrl,
    links,
    experience,
    education,
    skills,
    location
  });

  return res
    .status(201)
    .json(new ApiResponse(201, profile, "Profile registered successfully."));
});

const changeProfileInfo = asyncHandler(async (req, res) => {
  const { title, about, githubUrl, linkedinUrl, links, experience, education } = req.body;

  const updateFields = {};
  if (title !== undefined) updateFields.title = title;
  if (about !== undefined) updateFields.about = about;
  if (githubUrl !== undefined) updateFields.githubUrl = githubUrl;
  if (linkedinUrl !== undefined) updateFields.linkedinUrl = linkedinUrl;
  if (links !== undefined) updateFields.links = links;
  if (experience !== undefined) updateFields.experience = experience;
  if (education !== undefined) updateFields.education = education;

  const profile = await Profile.findOneAndUpdate(
    { owner: req.user._id },
    { $set: updateFields },
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

  const profile = await Profile.findOne({ owner: userId });

  if (!profile) {
    throw new ApiError(404, "Profile not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, profile, "Profile fetched successfully."));
});

export {getProfileByUserId, registerProfile, changeProfileInfo };
