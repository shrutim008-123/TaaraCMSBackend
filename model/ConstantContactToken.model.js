import mongoose from "mongoose";

const constantContactTokenSchema = new mongoose.Schema(
  {
    tokenData: { type: Object, required: true },
  },
  {
    versionKey: false,
  }
);

const constantContactTokenModel = mongoose.model(
  "constantContactToken",
  constantContactTokenSchema
);

export default constantContactTokenModel;
