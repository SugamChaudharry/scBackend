import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema(
  {
    title: {
      type: String,
    },
    about: {
      type: String,
    },
    viwes: {

    },
    githubUrl: {
      type: String,
    },
    linkedinUrl: {
      type: String,
    },
    links: [
      {
        title: String,
        link: String,
      },
    ],
    experience: [
      {
        title: String,
        company: String,
        startDate: String,
        endDate: String,
        description: String,
      },
    ],
    education: [
      {
        school: String,
        degree: String,
        field: String,
        graduationYear: String,
      }
    ]
  },
  {
    timestamps: true,
  },
);

export const Profile = mongoose.model("Profile", profileSchema);
