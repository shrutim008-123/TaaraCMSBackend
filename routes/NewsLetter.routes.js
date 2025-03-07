import express from "express";
import {
  createNewsLetterContent,
  getNewsLetterData,
} from "../controller/NewsLetter.controller.js";

const newsletterRouter = express.Router();

newsletterRouter.get("/", getNewsLetterData);

newsletterRouter.post("/", createNewsLetterContent);

export default newsletterRouter;
