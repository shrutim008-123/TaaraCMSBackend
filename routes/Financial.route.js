import express from "express";
import {
  createFinancialPageContent,
  getFinancialPageContent,
  updateFinancialPageContent
} from "../controller/Financial.controller.js";

const financialPageRouter = express.Router();

financialPageRouter.get("/", getFinancialPageContent);

financialPageRouter.post("/", createFinancialPageContent);

financialPageRouter.put("/:id", updateFinancialPageContent);

export default financialPageRouter;
