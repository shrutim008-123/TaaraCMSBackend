import express from "express";
import {
  createGetInvolvedContent,
  getGetInvolvedContent,
  updateGetInvolvedContent,
} from "../controller/GetInvolved.controller.js";

const getInvolvedRouter = express.Router();

getInvolvedRouter.get("/", getGetInvolvedContent);

getInvolvedRouter.post("/", createGetInvolvedContent);

getInvolvedRouter.put("/:id", updateGetInvolvedContent);

export default getInvolvedRouter;
