import express from "express";
import {
  createNewMemberContent,
  getNewMemberData,
} from "../controller/NewMember.controller.js";

const newMemberRouter = express.Router();

newMemberRouter.post("/", createNewMemberContent);
newMemberRouter.get("/", getNewMemberData);

export default newMemberRouter;
