import express from "express";
import {
  createSolutionContent,
  getSolutionContent,
  updateSolutionContent,
} from "../controller/Solutions.controller.js";

const solutionRouter = express.Router();

solutionRouter.get("/", getSolutionContent);

solutionRouter.post("/", createSolutionContent);

solutionRouter.put("/:id", updateSolutionContent);

export default solutionRouter;
