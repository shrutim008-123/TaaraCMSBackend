import express from "express";
import dotenv from "dotenv";
import connection from "./config/DB.js";
import cors from "cors";
import homepageRouter from "./routes/Homepage.routes.js";
import awarenessRouter from "./routes/AwarenessPage.routes.js";
import fileUploadRouter from "./routes/FileUploads.routes.js";
import aboutUsRouter from "./routes/AboutUs.routes.js";
import solutionRouter from "./routes/Solutions.routes.js";
import getInvolvedRouter from "./routes/GetInvolved.routes.js";
import authRouter from "./routes/Auth.routes.js";
import newsletterRouter from "./routes/NewsLetter.routes.js";
import healProjectRouter from "./routes/HealProject.routes.js";

dotenv.config();
const app = express();

app.use(express.json());

const allowedOrigins = [
  process.env.CMS_FRONTEND_URL, // First frontend URL
  process.env.FRONTEND_URL, // Second frontend URL (Add this in your .env file)
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT"],
  })
);

app.use("/auth", authRouter);
app.use("/homepage", homepageRouter);
app.use("/awareness", awarenessRouter);
app.use("/about_us", aboutUsRouter);
app.use("/solutions", solutionRouter);
app.use("/get_involved", getInvolvedRouter);
app.use("/heal_project", healProjectRouter);
app.use("/file_upload", fileUploadRouter);
app.use("/newsletter", newsletterRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Server is running on port ", process.env.PORT);
  } catch (error) {
    console.log(error);
  }
});
