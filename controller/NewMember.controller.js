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
      subject: "You Just Took the First Step Toward Change",
      text: `Dear ${req.body.firstName},

Thank you for reaching out to TAARA. By filling out our Get Involved form, you’ve taken the first step toward making a real difference in the lives of survivors, and in preventing exploitation before it starts.

At TAARA, we believe that change begins with people like you: people who care enough to act. Whether you’re here to volunteer, collaborate, or simply learn more, your support helps us create safer futures for youth and stronger pathways for healing.

Our team will be in touch shortly to follow up on how you'd like to get involved. Until then, we invite you to explore our work at taara.org and join our community on Instagram @taara_us https://www.instagram.com/taara_us/, where we share stories, tools, and impact in action.

Your voice, your time, your care, it matters more than you know.

With deep gratitude,

The TAARA Team
Empowering Survivors. Preventing Exploitation.

---

TAARA’s safety and empowerment programs for elementary and middle school students are designed to grow with the child. In elementary school, students learn to recognize safe and unsafe touch, use their voice with confidence, and build strong self-esteem. As they enter middle school, the focus expands to include digital and personal safety, online grooming, and cyberbullying. The program is delivered dynamically using age-appropriate and interactive content that meet students where they are, helping them stay safe, self-aware, and empowered at every stage.`,
      html: `
<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7; color: #333;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
    <div style="padding: 30px;">
      <h2 style="color: #004085;">You Just Took the First Step Toward Change</h2>
      <p>Dear <strong>${req.body.firstName}</strong>,</p>
      <p>Thank you for reaching out to TAARA. By filling out our Get Involved form, you’ve taken the first step toward making a real difference in the lives of survivors, and in preventing exploitation before it starts.</p>
      <p>At TAARA, we believe that change begins with people like you: people who care enough to act. Whether you’re here to volunteer, collaborate, or simply learn more, your support helps us create safer futures for youth and stronger pathways for healing.</p>
      <p>Our team will be in touch shortly to follow up on how you'd like to get involved. Until then, we invite you to explore our work at <a href="https://taara.org" target="_blank">taara.org</a> and join our community on Instagram <a href="https://www.instagram.com/taara_us/" target="_blank">@taara_us</a>, where we share stories, tools, and impact in action.</p>
      <p>Your voice, your time, your care — it matters more than you know.</p>
      <p>With deep gratitude,</p>
      <p><strong>The TAARA Team</strong><br/>Empowering Survivors. Preventing Exploitation.</p>
      <hr style="margin: 30px 0;" />
      <p><strong>TAARA’s safety and empowerment programs</strong> for elementary and middle school students are designed to grow with the child. In elementary school, students learn to recognize safe and unsafe touch, use their voice with confidence, and build strong self-esteem. As they enter middle school, the focus expands to include digital and personal safety, online grooming, and cyberbullying. The program is delivered dynamically using age-appropriate and interactive content that meet students where they are, helping them stay safe, self-aware, and empowered at every stage.</p>
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
