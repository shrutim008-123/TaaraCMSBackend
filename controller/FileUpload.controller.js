import cloudinary from "../config/cloudinaryConfig.js";

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

export { uploadFile, deleteFile, deleteMultipleFiles };
