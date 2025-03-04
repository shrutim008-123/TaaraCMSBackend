import express from "express";
import multer from "multer";
import { deleteFile, uploadFile } from "../controller/FileUpload.controller.js";

const fileUploadRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

fileUploadRouter.post("/", upload.single("image"), uploadFile);
fileUploadRouter.delete("/:publicId", deleteFile);

export default fileUploadRouter;
