import express from "express";
import {
  createHealProjectContent,
  getHealProjectContent,
  updateHealProjectContent,
} from "../controller/HealProject.controller.js";
import { verifyToken } from "../middleware/authorization.middleware.js";

const healProjectRouter = express.Router();

healProjectRouter.get("/", getHealProjectContent);

healProjectRouter.post("/", verifyToken, createHealProjectContent);

healProjectRouter.put("/:id", verifyToken, updateHealProjectContent);

export default healProjectRouter;
