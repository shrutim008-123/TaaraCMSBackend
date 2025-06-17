import express from "express";
import {
  createSolution1Content,
  getSolution1Content,
  updateSolution1Content,
} from "../controller/SolutionsOne.controller.js";
import { verifyToken } from "../middleware/authorization.middleware.js";

const solution1Router = express.Router();

solution1Router.get("/", getSolution1Content);

solution1Router.post("/", verifyToken, createSolution1Content);

solution1Router.put("/:id", verifyToken, updateSolution1Content);

export default solution1Router;
