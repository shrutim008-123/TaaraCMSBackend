import express from "express";
import {
  createGetInvolvedContent,
  getGetInvolvedContent,
  updateGetInvolvedContent,
} from "../controller/GetInvolved.controller.js";
import { verifyToken } from "../middleware/authorization.middleware.js";

const getInvolvedRouter = express.Router();

getInvolvedRouter.get("/", getGetInvolvedContent);

getInvolvedRouter.post("/", verifyToken,createGetInvolvedContent);

getInvolvedRouter.put("/:id", verifyToken,updateGetInvolvedContent);

export default getInvolvedRouter;
