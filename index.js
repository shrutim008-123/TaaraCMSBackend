import express from "express";
import dotenv from "dotenv";
import connection from "./config/DB.js";
import cors from "cors";
import homepageRouter from "./routes/Homepage.routes.js";
import awarenessRouter from "./routes/AwarenessPage.routes.js";
import fileUploadRouter from "./routes/FileUploads.routes.js";
import aboutUsRouter from "./routes/AboutUs.routes.js";
import getInvolvedRouter from "./routes/GetInvolved.routes.js";
import authRouter from "./routes/Auth.routes.js";
import newsletterRouter from "./routes/NewsLetter.routes.js";
import healProjectRouter from "./routes/HealProject.routes.js";
import paymentRouter from "./routes/Pyment.Routes.js";
import newMemberRouter from "./routes/NewMember.routes.js";
import solution1Router from "./routes/SolutionsOne.routes.js";
import solution2Router from "./routes/SolutionsTwo.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/auth", authRouter);
app.use("/homepage", homepageRouter);
app.use("/awareness", awarenessRouter);
app.use("/about_us", aboutUsRouter);
app.use("/solutions_one", solution1Router);
app.use("/solutions_two", solution2Router);
app.use("/get_involved", getInvolvedRouter);
app.use("/heal_project", healProjectRouter);
app.use("/file_upload", fileUploadRouter);
app.use("/newsletter", newsletterRouter);
app.use("/new_members", newMemberRouter);
app.use("/payment", paymentRouter);

app.listen(process.env.PORT || 4000, async () => {
  try {
    await connection;
    console.log("Server is running on port ", process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
