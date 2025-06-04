import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
});

const DonationSchema = new mongoose.Schema({
  amount: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: ImageSchema, default: null },
});

const ContentCardSchema = new mongoose.Schema({
  primaryText: { type: String, required: true },
  backgroundImage: { type: ImageSchema, default: null },
});

const AuthorSchema = new mongoose.Schema({
  image: { type: ImageSchema, default: null },
  description: { type: String, required: true },
  name: { type: String, required: true },
  memberSince: { type: String, required: true },
  country: { type: String, required: true },
});

const OurWorkCardSchema = new mongoose.Schema({
  primaryText: { type: String, required: true },
  secondaryText: { type: String, required: true },
  backgroundImage: { type: ImageSchema, default: null },
  // description: { type: String, required: true },
  // siteUrl: { type: String, required: true },
});

const QnaSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
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

const GetInvolvedSchema = new mongoose.Schema({
  heroSection: {
    titlePrimary: {
      primaryWord: { type: String, required: true },
      secondaryWord: { type: String, required: true },
    },
    backgroundImages: { type: ImageSchema, default: null },
    backgroundImagesMobile: { type: ImageSchema, default: null },
    description: { type: String, required: true },
  },
  donationSection: {
    titlePrimary: { type: String, required: true },
    titleSecondary: { type: String, required: true },
    donations: { type: [DonationSchema], default: [] },
    leftBox: {
      primaryText: { type: String, required: true },
      secondaryText: { type: String, required: true },
    },
    rightBox: {
      primaryText: { type: String, required: true },
      secondaryText: { type: String, required: true },
    },
  },
  impactSection: {
    quoteText: { type: quotes, required: true },
    primaryData: {
      backgroundImage: { type: ImageSchema, default: null },
      // value: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String, required: true },
    },
    // secondaryData: {
    //   backgroundImage: { type: ImageSchema, default: null },
    //   // value: { type: String, required: true },
    //   title: { type: String, required: true },
    //   description: { type: String, required: true },
    // },
    cards: { type: [ContentCardSchema], default: [] },
  },
  joinUsSection: {
    primaryTitle: { type: String, required: true },
    secondaryTitle: { type: String, required: true },
    description: { type: String, required: true },
    authors: { type: [AuthorSchema], default: [] },
  },
  ourWorkSection: {
    primaryTitle: { type: String, required: true },
    secondaryTitle: { type: String, required: true },
    description: { type: String, required: true },
    cards: { type: [OurWorkCardSchema], default: [] },
  },
  qnaSection: { type: [QnaSchema], default: [] },
});

// Creating the Model
const GetInvolved = mongoose.model("GetInvolved", GetInvolvedSchema);

export default GetInvolved;
