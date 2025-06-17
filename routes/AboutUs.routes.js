import express from "express";
import {
  createAboutUsContent,
  getAboutUsContent,
  updateAboutUsContent,
} from "../controller/AboutUs.controller.js";
import { verifyToken } from "../middleware/authorization.middleware.js";

const aboutUsRouter = express.Router();

aboutUsRouter.get("/", getAboutUsContent);

aboutUsRouter.post("/", verifyToken, createAboutUsContent);

aboutUsRouter.put("/:id", verifyToken, updateAboutUsContent);

export default aboutUsRouter;
