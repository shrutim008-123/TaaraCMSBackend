import cloudinary from "../config/cloudinaryConfig.js";
// import s3 from "../config/AwsConfig.js";
// import {
//   PutObjectCommand,
//   DeleteObjectCommand,
//   DeleteObjectsCommand,
// } from "@aws-sdk/client-s3";
// import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const uploadFile = async (req, res) => {
  try {
    const stream = cloudinary.uploader.upload_stream(async (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Image upload failed" });
      }

      res
        .status(201)
        .json({ publicId: result.public_id, url: result.secure_url });
    });
    stream.end(req.file.buffer);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteFile = async (req, res) => {
  try {
    const { publicId } = req.params;

    if (!publicId) {
      return res.status(400).json({ error: "Public ID is required" });
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return res.status(500).json({ error: "Failed to delete image" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteMultipleFiles = async (req, res) => {
  const { publicIds } = req.body;
  try {
    const deleted = await Promise.all(
      publicIds.map((id) => cloudinary.uploader.destroy(id))
    );
    res.json({ success: true, deleted });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// const uploadFile = async (req, res) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     const fileKey = `${uuidv4()}-${file.originalname}`;

//     const uploadParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: fileKey,
//       Body: file.buffer,
//       ContentType: file.mimetype,
//     };

//     await s3.send(new PutObjectCommand(uploadParams));

//     const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

//     res.status(201).json({ publicId: fileKey, url: fileUrl });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const deleteFile = async (req, res) => {
//   try {
//     const { publicId } = req.params;

//     if (!publicId) {
//       return res.status(400).json({ error: "Public ID is required" });
//     }

//     const deleteParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Key: publicId,
//     };

//     await s3.send(new DeleteObjectCommand(deleteParams));

//     res.status(200).json({ message: "Image deleted successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };

// const deleteMultipleFiles = async (req, res) => {
//   try {
//     const { publicIds } = req.body;

//     if (!Array.isArray(publicIds) || publicIds.length === 0) {
//       return res
//         .status(400)
//         .json({ error: "publicIds must be a non-empty array" });
//     }

//     const deleteParams = {
//       Bucket: process.env.AWS_S3_BUCKET_NAME,
//       Delete: {
//         Objects: publicIds.map((id) => ({ Key: id })),
//         Quiet: false,
//       },
//     };

//     const result = await s3.send(new DeleteObjectsCommand(deleteParams));

//     res.json({ success: true, deleted: result.Deleted });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

export { uploadFile, deleteFile, deleteMultipleFiles };
