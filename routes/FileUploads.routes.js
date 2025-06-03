import express from "express";
import multer from "multer";
import {
  deleteFile,
  deleteMultipleFiles,
  uploadFile,
} from "../controller/FileUpload.controller.js";

const fileUploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

fileUploadRouter.post("/", upload.single("image"), uploadFile);
fileUploadRouter.delete("/delete", deleteFile);
fileUploadRouter.post("/cleanup-temp-media", deleteMultipleFiles);

export default fileUploadRouter;
