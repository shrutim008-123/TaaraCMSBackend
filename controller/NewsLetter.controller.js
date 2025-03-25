import newsLetterModel from "../model/NewsLetter.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createNewsLetterContent = async (req, res) => {
  try {
    const newsLetter = await newsLetterModel.create(req.body);

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can use other services like Outlook, SMTP, etc.
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    // Email options
    const mailOptions = {
      from: `TAARA Team ${process.env.EMAIL_USER}`,
      to: req.body.email, // Ensure the request contains the user's email
      subject: "Welcome to TAARA — You’re Now Part of the Solution",
      text: `Thank you for signing up.

You’ll receive updates on the work we’re doing, stories from the front lines, and ways you can take action. Together, we’ve already invested over 43,800 hours to empower survivors and prevent future victimization. With your support, we can do more.

We’re glad you’re here.

-The TAARA Team`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(201)
      .json({ message: "Newsletter created and email sent!", newsLetter });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getNewsLetterData = async (req, res) => {
  try {
    const data = await newsLetterModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createNewsLetterContent, getNewsLetterData };
