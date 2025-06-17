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

const yearSchema = new mongoose.Schema({
  year: { type: String, required: true },
  url: { type: [String], required: true },
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

const FinancialSchema = new mongoose.Schema(
  {
    heroSection: {
      metaTitle: {
        type: String,
        required: true,
      },
      metaDescription: {
        type: String,
        required: true,
      },
      desktopImage: { type: ImageSchema, default: null },
      mobileImage: { type: ImageSchema, default: null },
      primaryWords: { type: String, required: true },
      secondaryWords: { type: String, required: true },
    },
    middleSection: {
      primaryDescription: { type: String, required: true },
      secondaryDescription: { type: String, required: true },
      financialStatements: {
        primaryWords: { type: String, required: true },
        secondaryWords: { type: String, required: true },
        backgroundImages: { type: ImageSchema, default: null },
        years: {
          type: [yearSchema],
          default: [],
        },
      },
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

const financialPageModel = mongoose.model("Financial", FinancialSchema);

export default financialPageModel;
