import express from "express";
import {
  exchangeToken,
  getOAuthUrl,
  getToken,
} from "../model/ConstantContact.controller.js";
const constantContactRouter = express.Router();

constantContactRouter.get("/oauth-url", getOAuthUrl);
constantContactRouter.post("/exchange-token", exchangeToken);
constantContactRouter.get("/get-token", getToken);

export default constantContactRouter;
