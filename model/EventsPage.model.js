import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

const ContentCardSchema = new mongoose.Schema({
  primaryText: { type: String, required: true },
  secondaryText: { type: String, required: true },
  backgroundImages: { type: ImageSchema, default: null },
});

const quotes = new mongoose.Schema({
  start: {
    type: String,
    required: true,
  },
  italic: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
});

const eventPageSchema = new mongoose.Schema(
  {
    heroSection: {
      desktopImage: { type: ImageSchema, default: null },
      mobileImage: { type: ImageSchema, default: null },
      primaryWords: { type: String, required: true },
      secondaryWords: { type: String, required: true },
    },
    bentoBoxTitle: { type: quotes, required: true },
    bentoBoxes: {
      type: [ContentCardSchema],
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

const eventPageModel = mongoose.model("eventPage", eventPageSchema);

export default eventPageModel;
