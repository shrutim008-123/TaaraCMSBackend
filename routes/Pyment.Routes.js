import express from "express";
import {
  createPayment,
  paymentFailure,
  paymentSuccess,
} from "../controller/Payment.Controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/", createPayment);
paymentRouter.get("/success", paymentSuccess);
paymentRouter.get("failure", paymentFailure);

export default paymentRouter;
