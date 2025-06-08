import newMembersModel from "../model/NewMembers.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createNewMemberContent = async (req, res) => {
  try {
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
      html: `<p>Thank you for reaching out to us, <strong>${req.body.firstName}</strong>.</p>
<p>We’ve received your message and appreciate your interest in getting involved with TAARA. Our team will review your details and get back to you shortly.</p>
<p>If this was a mistake or you have more to share, feel free to reply to this email.</p>
<p><strong>- The TAARA Team</strong></p>`,
    };

    // Notification to the TAARA team about the new Get Involved submission
    const getInvolvedTeamMail = {
      from: `"TAARA Notifications" <${process.env.EMAIL_USER}>`,
      to: "developer@taara.org",
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
