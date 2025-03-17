import express from "express";
import { createSolution2Content, getSolution2Content, updateSolution2Content } from "../controller/SolutionsTwo.controller.js";


const solution2Router = express.Router();

solution2Router.get("/", getSolution2Content);

solution2Router.post("/", createSolution2Content);

solution2Router.put("/:id", updateSolution2Content);

export default solution2Router;
