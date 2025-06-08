import newMembersModel from "../model/NewMembers.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createNewMemberContent = async (req, res) => {
  try {
    const existingMail = await newMembersModel.findOne({
      email: req.body.email,
    });

    if (existingMail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newsLetter = await newMembersModel.create(req.body);
    newsLetter.save();

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to the user who filled the Get Involved form
    const getInvolvedUserMail = {
      from: `"TAARA Team" <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: "Thanks for Reaching Out — TAARA Get Involved",
      text: `Thank you for reaching out to us, ${req.body.firstName}.

We’ve received your message and appreciate your interest in getting involved with TAARA. Our team will review your details and get back to you shortly.

If this was a mistake or you have more to share, feel free to reply to this email.

- The TAARA Team`,
      html: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7; color: #333;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="padding: 30px;">
      <h2 style="color: #004085;">Thank You for Reaching Out</h2>
      <p style="font-size: 16px; line-height: 1.6;">Thank you for reaching out to us, <strong>${req.body.firstName}</strong>.</p>
      <p style="font-size: 16px; line-height: 1.6;">We’ve received your message and appreciate your interest in getting involved with TAARA. Our team will review your details and get back to you shortly.</p>
      <p style="font-size: 16px; line-height: 1.6;">If this was a mistake or you have more to share, feel free to reply to this email.</p>
      <p style="font-size: 16px; line-height: 1.6;"><strong>- The TAARA Team</strong></p>
    </div>
  </div>
</div>
`,
    };

    // Notification to the TAARA team about the new Get Involved submission
    const getInvolvedTeamMail = {
      from: `"TAARA Notifications" <${process.env.EMAIL_USER}>`,
      to: "info@taara.org",
      subject: "New Get Involved Submission",
      text: `Someone just filled the Get Involved form.

First Name: ${req.body.firstName}
Last Name: ${req.body.lastName}
Phone: ${req.body.phone}
Email: ${req.body.email}
Organization: ${req.body.organization}
Comment: ${req.body.comment}

- Automated Notification`,
      html: `<p>Someone just filled the <strong>Get Involved</strong> form.</p>
<p><strong>First Name:</strong> ${req.body.firstName}</p>
<p><strong>Last Name:</strong> ${req.body.lastName}</p>
<p><strong>Phone:</strong> ${req.body.phone}</p>
<p><strong>Email:</strong> ${req.body.email}</p>
<p><strong>Organization:</strong> ${req.body.organization}</p>
<p><strong>Comment:</strong> ${req.body.comment}</p>
<p>- Automated Notification</p>`,
    };

    // Send the emails
    await transporter.sendMail(getInvolvedUserMail);
    await transporter.sendMail(getInvolvedTeamMail);

    res.status(201).json(newsLetter);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

const getNewMemberData = async (req, res) => {
  try {
    const data = await newMembersModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNewMember = async (req, res) => {
  try {
    const deletedNewsLetter = await newMembersModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(deletedNewsLetter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createNewMemberContent, getNewMemberData, deleteNewMember };
