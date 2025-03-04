import express from "express";
import {
  createHomepageContent,
  getHomepageContent,
  updateHomepageContent,
} from "../controller/Homepage.controller.js";

const homepageRouter = express.Router();

homepageRouter.get("/", getHomepageContent);

homepageRouter.post("/", createHomepageContent);

homepageRouter.put("/:id", updateHomepageContent);

export default homepageRouter;
