import mongoose from "mongoose";

// Image Schema
const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

// Tip Card Schema
const TipCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: ImageSchema, default: null },
});

// Content Card Schema
const ContentCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: ImageSchema, default: null },
});

const exampleCardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  backgroundImage: { type: ImageSchema, default: null },
  thumbnailImage: { type: ImageSchema, default: null },
});

// External Site Schema
const ExternalSiteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
});

// Author Schema
const AuthorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  externalLinks: { type: [ExternalSiteSchema], default: [] },
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

// Awareness Page Schema
const AwarenessPageSchema = new mongoose.Schema({
  heroSection: {
    metaTitle: {
      type: String,
      required: true,
    },
    metaDescription: {
      type: String,
      required: true,
    },
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    description: { type: String, required: true },
    desktopImage: { type: ImageSchema, default: null },
    mobileImage: { type: ImageSchema, default: null },
  },
  tipsSection: {
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    description: { type: String, required: true },
    cards: { type: [TipCardSchema], default: [] },
  },
  mapSection: {
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    description: { type: String, required: true },
    // mapEmbedCode: { type: String, required: true },
    quoteText: { type: quotes, required: true },
  },
  statisticsSection: {
    image: { type: ImageSchema, default: null },
    title: { type: String, required: true },
    description: { type: String, required: true },
    cards: { type: [ContentCardSchema], default: [] },
    quoteText: { type: quotes, required: true },
  },
  exampleSection: {
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    description: { type: String, required: true },
    examples: { type: [exampleCardSchema], default: [] },
  },
  resourcesSection: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    sources: { type: [AuthorSchema], default: [] },
  },
});

// Creating the Model
const AwarenessPage = mongoose.model("awarenessPage", AwarenessPageSchema);

export default AwarenessPage;
