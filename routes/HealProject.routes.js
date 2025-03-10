import express from "express";
import {
  createHealProjectContent,
  getHealProjectContent,
  updateHealProjectContent,
} from "../controller/HealProject.controller.js";

const healProjectRouter = express.Router();

healProjectRouter.get("/", getHealProjectContent);

healProjectRouter.post("/", createHealProjectContent);

healProjectRouter.put("/:id", updateHealProjectContent);

export default healProjectRouter;
