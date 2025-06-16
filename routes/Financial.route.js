import express from "express";
import {
  createFinancialPageContent,
  getFinancialPageContent,
  updateFinancialPageContent,
} from "../controller/Financial.controller.js";
import { verifyToken } from "../middleware/authorization.middleware.js";

const financialPageRouter = express.Router();

financialPageRouter.get("/", getFinancialPageContent);

financialPageRouter.post("/", verifyToken, createFinancialPageContent);

financialPageRouter.put("/:id", verifyToken, updateFinancialPageContent);

export default financialPageRouter;
