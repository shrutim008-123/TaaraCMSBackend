import nodemailer from 'nodemailer';

// Use environment variables for email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return res.status(400).json({
        success: false,
        message: 'All fields (firstName, lastName, email) are required'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Validate name fields (basic validation)
    if (firstName.trim().length < 2 || lastName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'First name and last name must be at least 2 characters long'
      });
    }

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thanks for Signing Up – Let’s Empower Youth Together',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4169E1; text-align: center;">Thanks for Signing Up!</h2>
          <p>Hi ${firstName},</p>

          <p>Thank you for signing up to learn more about <strong>The RAISE Project</strong>, TAARA’s youth prevention and empowerment program.</p>

          <p>
            RAISE is designed with flexibility in mind. Whether you’re a school administrator, educator, community leader, or parent, we’ll work with you to bring life-changing safety and self-worth tools to young people in your community.
          </p>

          <p>
            From a one-time assembly or workshop to a full 6-week club experience, we customize the format to fit your goals. Our curriculum is age-appropriate, trauma-informed, and grounded in real-world prevention strategies.
          </p>

          <p>
            In the coming days, someone from our team will reach out to learn more about your needs and how we can best support you.
          </p>

          <p>
            Until then, feel free to <a href="https://www.taara.org" target="_blank">explore our work</a> or reach out with any questions at 
            <a href="mailto:info@taara.org">info@taara.org</a>.
          </p>

          <p>We’re honored to be on this journey with you.</p>

          <p style="margin-top: 40px;">Warmly,<br />The TAARA Team</p>

          <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
            <a href="https://www.taara.org" style="color: #F15928; text-decoration: none;">www.taara.org</a> |
            <a href="https://www.instagram.com/taara_us" style="color: #F15928; text-decoration: none;" target="_blank">@taara_us</a>
          </div>
        </div>
      `
    };

    // Email to admin (notification)
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to admin email
      subject: 'New Sign-Up: RAISE Project',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #4169E1; text-align: center;">New Program Sign-Up</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
            <h3 style="color: #333;">Registration Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">First Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${firstName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Last Name:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Email:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd; font-weight: bold;">Registration Time:</td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
          </div>
        </div>
      `
    };

    // Send both emails
    await Promise.all([
      transporter.sendMail(userMailOptions),
      transporter.sendMail(adminMailOptions)
    ]);

    res.status(200).json({
      success: true,
      message: 'Sign-up successful! Please check your email for confirmation.',
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        registeredAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Sign-up error:', error);
    
    // Handle specific email errors
    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email authentication failed. Please contact support.',
      });
    }
    
    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: 'Email service temporarily unavailable. Please try again later.',
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to process sign-up. Please try again later.',
      error: error.message
    });
  }
};