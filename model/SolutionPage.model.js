import mongoose from "mongoose";

// Image Schema
const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

// Card Schema
const ContentCardSchema = new mongoose.Schema({
  primaryText: { type: String, required: true },
  secondaryText: { type: String, required: true },
  backgroundImages: { type: ImageSchema, default: null },
});

// About Us Schema
const SolutionPageSchema = new mongoose.Schema({
  heroSection: {
    titlePrimary: {
      primaryWord: { type: String, required: true },
      secondaryWord: { type: String, required: true },
    },
    titleSecondary: {
      primaryWord: { type: String, required: true },
      secondaryWord: { type: String, required: true },
    },
    backgroundImages: { type: ImageSchema, default: null },
    backgroundImagesMobile: { type: ImageSchema, default: null },
    description: { type: String, required: true },
  },
  primaryContent: {
    primaryTitle: { type: String, required: true },
    secondaryTitle: { type: String, required: true },
    description: { type: String, required: true },
    cards: {
      type: [ContentCardSchema],
      default: [],
    },
  },
  secondaryContent: {
    primaryTitle: { type: String, required: true },
    secondaryTitle: { type: String, required: true },
    description: { type: String, required: true },
  },
  contentImpact: {
    primaryTitle: { type: String, required: true },
    secondaryTitle: { type: String, required: true },
    description: { type: String, required: true },
    image: {
      type: ImageSchema,
      default: null,
    },
    statistics: {
      header: { type: String, required: true },
      primaryStats: {
        number: { type: String, required: true },
        description: { type: String, required: true },
      },
      secondaryStats: {
        number: { type: String, required: true },
        description: { type: String, required: true },
      },
    },
    cta: {
      image1: { type: ImageSchema, default: null },
      image2: { type: ImageSchema, default: null },
      title: { type: String, required: true },
      link: { type: String, required: true },
    },
  },
});

// Creating the Model
const SolutionPageModel = mongoose.model("solution", SolutionPageSchema);

export default SolutionPageModel;
