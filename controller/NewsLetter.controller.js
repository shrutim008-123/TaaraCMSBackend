import newsLetterModel from "../model/NewsLetter.model.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createNewsLetterContent = async (req, res) => {
  try {
    const newsLetter = await newsLetterModel.create(req.body);
    newsLetter.save();

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
      from: `"TAARA Team" ${process.env.EMAIL_USER}`, // Proper sender format
      to: req.body.email, // Ensure request contains the user's email
      subject: "Welcome to TAARA — You’re Now Part of the Solution",
      text: `Thank you for signing up.

You’ll receive updates on the work we’re doing, stories from the front lines, and ways you can take action. Together, we’ve already invested over 43,800 hours to empower survivors and prevent future victimization. With your support, we can do more.

We’re glad you’re here. 

-The TAARA Team
`,
      html: `<p>Thank you for signing up.</p>

<p>
  You’ll receive updates on the work we’re doing, stories from the front lines,
  and ways you can take action.
</p>

<p>
  <strong>Together, we’ve already invested over 43,800 hours</strong> to empower survivors
  and prevent future victimization. With your support, we can do more.
</p>

<p>We’re glad you’re here.</p>

<p><strong>- The TAARA Team</strong></p>
`,
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
      from: `"TAARA Notifications" <${process.env.EMAIL_USER}>`,
      to: "developer@taara.org",
      subject: "New Get Involved Submission",
      text: `Someone just filled the Get Involved form.

Email: ${req.body.email}

- Automated Notification`,
      html: `<p>Someone just filled the <strong>Email Signup</strong> form.</p>
<p><strong>Email:</strong> ${req.body.email}</p>
<p>- Automated Notification</p>`,
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
