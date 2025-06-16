import express from "express";
import {
  createHomepageContent,
  getHomepageContent,
  updateHomepageContent,
} from "../controller/Homepage.controller.js";
import { verifyToken } from "../middleware/authorization.middleware.js";

const homepageRouter = express.Router();

homepageRouter.get("/", getHomepageContent);

homepageRouter.post("/", verifyToken, createHomepageContent);

homepageRouter.put("/:id", verifyToken, updateHomepageContent);

export default homepageRouter;
