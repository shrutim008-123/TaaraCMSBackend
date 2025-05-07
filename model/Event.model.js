import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

const crouselSchema = new mongoose.Schema({
  image: { type: ImageSchema, default: null },
  description: { type: String, required: true },
});

const ExtraInfoSchema = new mongoose.Schema(
  {
    informationType: {
      type: String,
      required: true,
      enum: ["description", "crousel", "video", "gridImages"],
    },
    description: {
      type: String, // Only for "description"
      default: undefined,
    },
    crousel: {
      type: [crouselSchema], // Array of image URLs
      validate: [arrayLimitFive, "{PATH} exceeds the limit of 5"],
      default: undefined,
    },
    video: {
      type: String, // Only for "video"
      default: undefined,
    },
    gridImages: {
      type: [ImageSchema], // Array of image URLs
      validate: [arrayLimitThree, "{PATH} exceeds the limit of 3"],
      default: undefined,
    },
  },
  { _id: false } // No separate _id for each extraInfo item
);

function arrayLimitFive(val) {
  return val.length <= 5;
}

function arrayLimitThree(val) {
  return val.length <= 3;
}

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    heroImage: { type: ImageSchema, default: null },
    heroMobileImage: { type: ImageSchema, default: null },
    showcaseImage: { type: ImageSchema, default: null },
    extraInfo: {
      type: [ExtraInfoSchema],
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

const eventModel = mongoose.model("event", eventSchema);

export default eventModel;
