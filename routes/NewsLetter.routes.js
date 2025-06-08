import express from "express";
import {
  createNewsLetterContent,
  deleteNewsLetterContent,
  getNewsLetterData,
  subscribeByEmail,
} from "../controller/NewsLetter.controller.js";

const newsletterRouter = express.Router();

newsletterRouter.get("/", getNewsLetterData);

newsletterRouter.post("/", createNewsLetterContent);

newsletterRouter.delete("/:id", deleteNewsLetterContent);

newsletterRouter.post("/subscribe-by-email", subscribeByEmail);

export default newsletterRouter;
