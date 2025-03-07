import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const newsLetterModel = mongoose.model("newsLetter", newsLetterSchema);

export default newsLetterModel;
