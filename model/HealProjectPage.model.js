import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

const videosSchema = new mongoose.Schema({
  url: { type: String, required: true },
  name: { type: String, required: true },
});

const cardsSchema = new mongoose.Schema({
  primaryTitle: { type: String, required: true },
  secondaryTitle: { type: String, required: true },
  backgroundImage: { type: ImageSchema, required: true },
});

const HealProjectPageSchema = new mongoose.Schema(
  {
    heroSection: {
      desktopImage: { type: ImageSchema, default: null },
      mobileImage: { type: ImageSchema, default: null },
      primaryTitle: { type: String, required: true },
      secondaryTitle: { type: String, required: true },
      description: { type: String, required: true },
    },
    primaryContent: {
      primaryTitle: { type: String, required: true },
      secondaryTitle: { type: String, required: true },
      description: { type: String, required: true },
    },
    hopeSection: {
      primaryTitle: { type: String, required: true },
      secondaryTitle: { type: String, required: true },
      description: { type: String, required: true },
      videosData: { type: [videosSchema], default: [] },
    },
    fourPillarsSection: {
      quoteText: { type: String, required: true },
      primaryTitle: { type: String, required: true },
      secondaryTitle: { type: String, required: true },
      description: { type: String, required: true },
      cards: { type: [cardsSchema], default: [] },
    },
    healSection: {
      primaryText: { type: String, required: true },
      secondaryText: { type: String, required: true },
      backgroundImage: { type: ImageSchema, default: null },
      description: {
        type: String,
        required: true,
      },
    },
  },
  {
    versionKey: false,
  }
);

const HealProjectPageModel = mongoose.model(
  "healProjectPage",
  HealProjectPageSchema
);

export default HealProjectPageModel;
