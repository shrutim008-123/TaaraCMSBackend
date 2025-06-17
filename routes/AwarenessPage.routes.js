import express from "express";
import {
  createAwarenessPageContent,
  getAwarenessPageContent,
  updateAwarenessPageContent,
} from "../controller/AwarenessPage.controller.js";
import { verifyToken } from "../middleware/authorization.middleware.js";

const awarenessRouter = express.Router();

awarenessRouter.get("/", getAwarenessPageContent);

awarenessRouter.post("/", verifyToken, createAwarenessPageContent);

awarenessRouter.put("/:id", verifyToken, updateAwarenessPageContent);

export default awarenessRouter;
