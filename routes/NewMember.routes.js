import express from "express";
import {
  createNewMemberContent,
  deleteNewMember,
  getNewMemberData,
} from "../controller/NewMember.controller.js";

const newMemberRouter = express.Router();

newMemberRouter.post("/", createNewMemberContent);
newMemberRouter.get("/", getNewMemberData);
newMemberRouter.delete("/:id", deleteNewMember);

export default newMemberRouter;
