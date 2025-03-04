import express from "express";
import {
  createAwarenessPageContent,
  getAwarenessPageContent,
  updateAwarenessPageContent,
} from "../controller/AwarenessPage.controller.js";

const awarenessRouter = express.Router();

awarenessRouter.get("/", getAwarenessPageContent);

awarenessRouter.post("/", createAwarenessPageContent);

awarenessRouter.put("/:id", updateAwarenessPageContent);

export default awarenessRouter;
