import mongoose from "mongoose";

// Image Schema
const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

// Person Schema
const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  profileImage: { type: ImageSchema, default: null },
});

// About Us Schema
const AboutUsSchema = new mongoose.Schema({
  heroSection: {
    imagesData: {
      type: [
        {
          images: { type: ImageSchema, default: null },
          text: { type: String, default: "" },
        },
      ],
      default: [],
    },
    description: { type: String, required: true },
    missionTitle: { type: String, default: "Our Mission" }, // Added new field
  },
  ourStorySection: {
    desktopImage: { type: ImageSchema, default: null },
    mobileImage: { type: ImageSchema, default: null },
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    description: { type: String, required: true },
  },
  advisoryBoardSection: {
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    members: { type: [PersonSchema], default: [] },
  },
  teamSection1: {
    quoteText: { type: String, required: true },
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    teamMembers: { type: [PersonSchema], default: [] },
  },
  teamSection2: {
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    teamMembers: { type: [PersonSchema], default: [] },
  },
});

// Creating the Model
const AboutUs = mongoose.model("AboutUs", AboutUsSchema);

export default AboutUs;