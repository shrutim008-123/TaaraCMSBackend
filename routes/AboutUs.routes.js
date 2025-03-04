import express from "express";
import {
  createAboutUsContent,
  getAboutUsContent,
  updateAboutUsContent,
} from "../controller/AboutUs.controller.js";

const aboutUsRouter = express.Router();

aboutUsRouter.get("/", getAboutUsContent);

aboutUsRouter.post("/", createAboutUsContent);

aboutUsRouter.put("/:id", updateAboutUsContent);

export default aboutUsRouter;
