import mongoose from "mongoose";

const newMembersSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    organization: { type: String, default: null },
    comment: { type: String, default: null },
  },
  {
    versionKey: false,
  }
);

const newMembersModel = mongoose.model("newMembers", newMembersSchema);

export default newMembersModel;
