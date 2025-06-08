import newsLetterModel from "../model/NewsLetter.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // You can use other services like Outlook, SMTP, etc.
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

const createNewsLetterContent = async (req, res) => {
  try {
    const newsLetter = await newsLetterModel.create(req.body);
    newsLetter.save();

    // Email options
    const mailOptions = {
      from: `"TAARA Team" ${process.env.EMAIL_USER}`, // Proper sender format
      to: req.body.email, // Ensure request contains the user's email
      subject: "Welcome to TAARA — You’re Now Part of the Solution",
      text: `Thank you for signing up.

You’ll receive updates on the work we’re doing, stories from the front lines, and ways you can take action. Together, we’ve already invested over 43,800 hours to empower survivors and prevent future victimization. With your support, we can do more.

We’re glad you’re here. 

-The TAARA Team
`,
      html: `
  <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f7f7f7; color: #333;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
      <div style="padding: 30px;">
        <h2 style="color: #004085;">Welcome to TAARA</h2>
        <p style="font-size: 16px; line-height: 1.6;">Thank you for signing up.</p>
        
        <p style="font-size: 16px; line-height: 1.6;">
          You’ll receive updates on the work we’re doing, stories from the front lines,
          and ways you can take action.
        </p>

        <p style="font-size: 16px; line-height: 1.6;">
          <strong style="color: #155724;">Together, we’ve already invested over 43,800 hours</strong> 
          to empower survivors and prevent future victimization. With your support, we can do more.
        </p>

        <p style="font-size: 16px; line-height: 1.6;">We’re glad you’re here.</p>

        <p style="font-size: 16px; line-height: 1.6;"><strong>- The TAARA Team</strong></p>
      </div>
      <div style="background-color: #e9ecef; text-align: center; padding: 15px; font-size: 14px; color: #6c757d;">
        © TAARA. All rights reserved.
      </div>
    </div>
  </div>
`,
    };

    const mailOptions2 = {
      from: `"TAARA Team" ${process.env.EMAIL_USER}`, // Proper sender format
      to: "developer@taara.org", // Ensure request contains the user's email
      subject: "Welcome to TAARA — You’re Now Part of the Solution",
      text: `
A new user has signed up for the newsletter:

First Name: ${req.body.firstName || "N/A"}
Last Name: ${req.body.lastName || "N/A"}
Email: ${req.body.email || "N/A"}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
          <div style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); overflow: hidden;">
            <div style="padding: 30px;">
              <h2 style="color: #004085; margin-bottom: 20px;">New Newsletter Signup</h2>
              <p style="font-size: 16px; line-height: 1.6;"><strong>First Name:</strong> ${
                req.body.firstName || "N/A"
              }</p>
              <p style="font-size: 16px; line-height: 1.6;"><strong>Last Name:</strong> ${
                req.body.lastName || "N/A"
              }</p>
              <p style="font-size: 16px; line-height: 1.6;"><strong>Email:</strong> ${
                req.body.email || "N/A"
              }</p>
            </div>
            <div style="background-color: #e9ecef; text-align: center; padding: 15px; font-size: 14px; color: #6c757d;">
              © TAARA. All rights reserved.
            </div>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(mailOptions2);

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

const deleteNewsLetterContent = async (req, res) => {
  try {
    const deletedNewsLetter = await newsLetterModel.findByIdAndDelete(
      req.params.id
    );
    res.status(200).json(deletedNewsLetter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const subscribeByEmail = async (req, res) => {
  try {
    const getInvolvedUserMail = {
      from: `"TAARA Team" <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: "You’re In — Welcome to TAARA",
      text: `You’re in! Thanks for joining TAARA’s fight to protect kids, empower survivors, and flip the script on trafficking.

We’ve received your message and our team will be in touch if needed. Until then, stay tuned and stay involved!

- The TAARA Team`,
      html: `<p><strong>You’re in!</strong> Thanks for joining TAARA’s fight to protect kids, empower survivors, and flip the script on trafficking.</p>

<p><strong>- The TAARA Team</strong></p>`,
    };

    // Notification to the TAARA team about the new Get Involved submission
    const getInvolvedTeamMail = {
      from: `"TAARA Team" <${process.env.EMAIL_USER}>`,
      to: req.body.email,
      subject: "You’re In — Welcome to TAARA",
      text: `You’re in! Thanks for joining TAARA’s fight to protect kids, empower survivors, and flip the script on trafficking.

We’ve received your message and our team will be in touch if needed. Until then, stay tuned and stay involved!

- The TAARA Team`,
      html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; color: #333;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1); overflow: hidden;">
        <div style="padding: 30px;">
          <h2 style="color: #004085; margin-bottom: 10px;">You're In!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Thanks for joining <strong>TAARA’s fight</strong> to protect kids, empower survivors,
            and flip the script on trafficking.
          </p>
          <p style="font-size: 16px; line-height: 1.6;">
            We’ve received your message and our team will be in touch if needed.
            Until then, stay tuned and stay involved!
          </p>
          <p style="font-size: 16px; line-height: 1.6;"><strong>- The TAARA Team</strong></p>
        </div>
        <div style="background-color: #e9ecef; text-align: center; padding: 15px; font-size: 14px; color: #6c757d;">
          © TAARA. All rights reserved.
        </div>
      </div>
    </div>
  `,
    };

    // Send the emails
    await transporter.sendMail(getInvolvedUserMail);
    await transporter.sendMail(getInvolvedTeamMail);
    res.status(200).json({ message: "Emails sent successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createNewsLetterContent,
  getNewsLetterData,
  deleteNewsLetterContent,
  subscribeByEmail,
};
