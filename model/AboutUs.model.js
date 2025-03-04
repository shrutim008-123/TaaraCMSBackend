import mongoose from "mongoose";

// Image Schema
const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

// Person Schema
const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  profileImage: { type: ImageSchema, default: null },
});

// About Us Schema
const AboutUsSchema = new mongoose.Schema({
  heroSection: {
    images: { type: [ImageSchema], default: [] },
    description: { type: String, required: true },
  },
  ourStorySection: {
    storyImage: { type: ImageSchema, default: null },
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    description: { type: String, required: true },
  },
  advisoryBoardSection: {
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    members: { type: [PersonSchema], default: [] },
  },
  teamSection: {
    quoteText: { type: String, required: true },
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    teamMembers: { type: [PersonSchema], default: [] },
  },
});

// Creating the Model
const AboutUs = mongoose.model("AboutUs", AboutUsSchema);

export default AboutUs;
