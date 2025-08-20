import fs from 'fs';
import { Attachment, EmailParams, MailerSend, Recipient, Sender } from 'mailersend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Email transporter configuration
const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY,
});

const sentFrom = new Sender(process.env.MAILERSEND_FROM_EMAIL, "TAARA Team");

// Validation function
const validateBookletRequest = (data) => {
  const errors = [];

  if (!data.name || data.name.trim() === '') {
    errors.push('Name is required');
  }

  if (!data.email || data.email.trim() === '') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      errors.push('Please provide a valid email address');
    }
  }

  if (!data.cityState || data.cityState.trim() === '') {
    errors.push('City/State is required');
  }

  if (!data.language || !['en', 'hi'].includes(data.language)) {
    errors.push('Language selection is required (en or hi)');
  }

  return errors;
};

// Get PDF file path based on language
const getPDFPath = (schoolLevel, language) => {
  const pdfFiles = {
    elementary: {
      en: 'Elementary_School_English.pdf',
      hi: 'Elementary_School_Hindi.pdf'
    },
    middle: {
      en: 'Middle_School_English.pdf',
      hi: 'Middle_School_Hindi.pdf'
    },
    high: {
      en: 'High_School_English.pdf',
      hi: 'High_School_Hindi.pdf'
    }
  };

  const pdfFileName = pdfFiles[schoolLevel][language];
  return path.join(__dirname, '../../raiseBookletContent', pdfFileName);
};

const checkPDFExists = (filePath) => {
  return fs.existsSync(filePath);
};

const getEmailContent = (schoolLevel, language, name, organization) => {
  const contentTemplates = {
    elementary: {
      en: {
        subject: 'RAISE Elementary School Booklet - Your Download',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4169E1;">Thank you for your interest in RAISE!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for requesting the RAISE Elementary School Booklet. We're excited to share this resource with you and ${organization ? organization : 'your organization'}.</p>
            <p>Please find the attached booklet which contains valuable information about:</p>
            <ul>
              <li>What Do They Know? A Quick Safety Assessment for Kids</li>
              <li>Understanding Personal Boundaries</li>
              <li>Safe and Unsafe Touch</li>
              <li>Empowering Children to Respond to Unsafe Touch</li>
              <li>And much more...</li>
            </ul>
            <p>We hope this resource helps in creating safer environments for children.</p>
            <p style="margin-top: 40px;">Warmly,<br />The TAARA Team</p>

            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              <a href="https://www.taara.org" style="color: #F15928; text-decoration: none;">www.taara.org</a> |
              <a href="https://www.instagram.com/taara_us" style="color: #F15928; text-decoration: none;" target="_blank">@taara_us</a>
            </div>
          </div>
        ` 
      },
      hi: {
        subject: 'RAISE प्राथमिक विद्यालय पुस्तिका - आपका डाउनलोड',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4169E1;">RAISE में आपकी रुचि के लिए धन्यवाद!</h2>
            <p>प्रिय ${name},</p>
            <p>RAISE प्राथमिक विद्यालय बुकलेट का अनुरोध करने के लिए धन्यवाद। हम आपको और ${organization ? organization : 'आपके संगठन'} को यह संसाधन उपलब्ध कराने के लिए उत्साहित हैं।</p>
            <p>कृपया संलग्न बुकलेट देखें जिसमें निम्नलिखित विषयों पर महत्वपूर्ण जानकारी शामिल है:</p>
            <ul>
              <li>बच्चे क्या जानते हैं? बच्चों के लिए त्वरित सुरक्षा मूल्यांकन</li>
              <li>व्यक्तिगत सीमाओं को समझना</li>
              <li>सुरक्षित और असुरक्षित स्पर्श</li>
              <li>बच्चों को असुरक्षित स्पर्श के प्रति सशक्त बनाना</li>
              <li>और भी बहुत कुछ...</li>
            </ul>
            <p>हमें आशा है कि यह संसाधन बच्चों के लिए सुरक्षित वातावरण बनाने में सहायक होगा।</p>
            <p style="margin-top: 40px;">शुभकामनाओं सहित,<br />टीम TAARA</p>

            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              <a href="https://www.taara.org" style="color: #F15928; text-decoration: none;">www.taara.org</a> |
              <a href="https://www.instagram.com/taara_us" style="color: #F15928; text-decoration: none;" target="_blank">@taara_us</a>
            </div>
          </div>
        ` 
      }
    },
    middle: {
      en: {
        subject: 'RAISE Middle School Booklet - Your Download',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4169E1;">Thank you for your interest in RAISE!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for requesting the RAISE Middle School Booklet. We're excited to share this resource with you and ${organization ? organization : 'your organization'}.</p>
            <p>Please find the attached booklet which contains valuable information about:</p>
            <ul>
              <li>Guide to Thriving in Middle School</li>
              <li>Digital Footprints: What You Post Stays Online</li>
              <li>Peer Pressure and Social Media Challenges</li>
              <li>Cyberbullying and Conflict Resolution</li>
              <li>And much more...</li>
            </ul>
            <p>We hope this resource helps in creating safer environments for children.</p>
            <p style="margin-top: 40px;">Warmly,<br />The TAARA Team</p>

            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              <a href="https://www.taara.org" style="color: #F15928; text-decoration: none;">www.taara.org</a> |
              <a href="https://www.instagram.com/taara_us" style="color: #F15928; text-decoration: none;" target="_blank">@taara_us</a>
            </div>
          </div>
        `
      },
      hi: {
        subject: 'RAISE मध्य विद्यालय पुस्तिका - आपका डाउनलोड',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4169E1;">RAISE में आपकी रुचि के लिए धन्यवाद!</h2>
            <p>प्रिय ${name},</p>
            <p>RAISE माध्यमिक विद्यालय बुकलेट का अनुरोध करने के लिए धन्यवाद। हम आपको और ${organization ? organization : 'आपके संगठन'} को यह संसाधन उपलब्ध कराने के लिए उत्साहित हैं।</p>
            <p>कृपया संलग्न बुकलेट देखें जिसमें निम्नलिखित विषयों पर महत्वपूर्ण जानकारी शामिल है:</p>
            <ul>
              <li>माध्यमिक विद्यालय में सफल होने का मार्गदर्शन</li>
              <li>डिजिटल फुटप्रिंट्स: आपकी पोस्ट्स ऑनलाइन रहती हैं</li>
              <li>साथियों का दबाव और सोशल मीडिया चुनौतियाँ</li>
              <li>साइबरबुलिंग और विवाद समाधान</li>
              <li>और भी बहुत कुछ...</li>
            </ul>
            <p>हमें आशा है कि यह संसाधन बच्चों के लिए सुरक्षित वातावरण बनाने में सहायक होगा।</p>
            <p style="margin-top: 40px;">शुभकामनाओं सहित,<br />टीम TAARA</p>

            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              <a href="https://www.taara.org" style="color: #F15928; text-decoration: none;">www.taara.org</a> |
              <a href="https://www.instagram.com/taara_us" style="color: #F15928; text-decoration: none;" target="_blank">@taara_us</a>
            </div>
          </div>
        ` 
      }
    },
    high: {
      en: {
        subject: 'RAISE High School Booklet - Your Download',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4169E1;">Thank you for your interest in RAISE!</h2>
            <p>Dear ${name},</p>
            <p>Thank you for requesting the RAISE High School Booklet. We're excited to share this resource with you and ${organization ? organization : 'your organization'}.</p>
            <p>Please find the attached booklet which contains valuable information about:</p>
            <ul>
              <li>Traded in the Shadows, The Secret Economy of Your Online Identity</li>
              <li>Love Bombs & Fake Promises, When Affection is a Trap</li>
              <li>Screenshots Last Forever, The Truth About Sexting</li>
              <li>The Invisible Chains, How Control Feels Like Freedom</li>
              <li>And much more...</li>
            </ul>
            <p>We hope this resource helps in creating safer environments for children.</p>
            <p style="margin-top: 40px;">Warmly,<br />The TAARA Team</p>

            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              <a href="https://www.taara.org" style="color: #F15928; text-decoration: none;">www.taara.org</a> |
              <a href="https://www.instagram.com/taara_us" style="color: #F15928; text-decoration: none;" target="_blank">@taara_us</a>
            </div>
          </div>
        `
      },
      hi: {
        subject: 'RAISE उच्च विद्यालय पुस्तिका - आपका डाउनलोड',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4169E1;">RAISE में आपकी रुचि के लिए धन्यवाद!</h2>
            <p>प्रिय ${name},</p>
            <p>RAISE उच्च विद्यालय बुकलेट का अनुरोध करने के लिए धन्यवाद। हम आपको और ${organization ? organization : 'आपके संगठन'} को यह संसाधन उपलब्ध कराने के लिए उत्साहित हैं।</p>
            <p>कृपया संलग्न बुकलेट देखें जिसमें निम्नलिखित विषयों पर महत्वपूर्ण जानकारी शामिल है:</p>
            <ul>
              <li>छाया में कारोबार: आपकी ऑनलाइन पहचान का गुप्त अर्थतंत्र</li>
              <li>प्रेम बम और झूठे वादे: जब स्नेह एक जाल होता है</li>
              <li>स्क्रीनशॉट्स हमेशा के लिए: सेक्सटिंग के बारे में सच्चाई</li>
              <li>अदृश्य जंजीरें: कैसे नियंत्रण स्वतंत्रता जैसा महसूस होता है</li>
              <li>और भी बहुत कुछ...</li>
            </ul>
            <p>हमें आशा है कि यह संसाधन बच्चों के लिए सुरक्षित वातावरण बनाने में सहायक होगा।</p>
            <p style="margin-top: 40px;">शुभकामनाओं सहित,<br />टीम TAARA</p>

            <div style="text-align: center; margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
              <a href="https://www.taara.org" style="color: #F15928; text-decoration: none;">www.taara.org</a> |
              <a href="https://www.instagram.com/taara_us" style="color: #F15928; text-decoration: none;" target="_blank">@taara_us</a>
            </div>
          </div>
        `
      }
    }
  };

  return contentTemplates[schoolLevel][language];
};

export const bookletRequest = async (req, res) => {
  try {
    const { name, email, organization, cityState, language, schoolLevel } = req.body;

    // Validate schoolLevel
    if (!['elementary', 'middle', 'high'].includes(schoolLevel)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid school level specified'
      });
    }

    const validationErrors = validateBookletRequest(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    const pdfPath = getPDFPath(schoolLevel, language);

    if (!checkPDFExists(pdfPath)) {
      console.error(`PDF not found at path: ${pdfPath}`);
      return res.status(500).json({
        success: false,
        message: 'Requested booklet is currently unavailable'
      });
    }

    const emailContent = getEmailContent(schoolLevel, language, name, organization);

    const pdfBuffer = fs.readFileSync(pdfPath);
    
    // Fix the attachment creation - specify disposition explicitly
    const pdfAttachment = new Attachment(
      pdfBuffer.toString("base64"),
      `RAISE_${schoolLevel}_${language}.pdf`,
      "application/pdf"
    );
    
    // Set the disposition explicitly
    pdfAttachment.disposition = "attachment";

    // For trial account: Send to admin email with user info in subject/body
    const adminRecipients = [new Recipient(process.env.MAILERSEND_FROM_EMAIL, "TAARA Admin")];
    
    // Modified email content to include user's information
    const trialEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; margin-bottom: 20px; border-radius: 5px;">
          <strong>Note:</strong> This email was requested by ${name} (${email}) but sent to admin due to trial account limitations.
        </div>
        ${emailContent.html}
        <hr style="margin: 30px 0;">
        <h3>Request Details:</h3>
        <p><strong>Requested by:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${organization ? `<p><strong>Organization:</strong> ${organization}</p>` : ""}
        <p><strong>City/State:</strong> ${cityState}</p>
        <p><strong>Language:</strong> ${language === 'hi' ? 'Hindi' : 'English'}</p>
        <p><strong>School Level:</strong> ${schoolLevel}</p>
        <p><strong>Request Time:</strong> ${new Date().toLocaleString()}</p>
      </div>
    `;

    const adminEmail = new EmailParams()
      .setFrom(sentFrom)
      .setTo(adminRecipients)
      .setSubject(`[TRIAL] Booklet Request for ${email}: ${schoolLevel} school - ${language === 'hi' ? 'Hindi' : 'English'}`)
      .setHtml(trialEmailContent)
      .setAttachments([pdfAttachment]);

    // Send only admin email for trial account
    await mailerSend.email.send(adminEmail);
    
    console.log(`${schoolLevel} school booklet request processed for ${email} (${language}) from ${cityState}${organization ? ` - ${organization}` : ''} - sent to admin due to trial limitations`);

    return res.status(200).json({
      success: true,
      message: language === 'hi'
        ? 'आपका अनुरोध प्राप्त हो गया है। जल्द ही आपको पुस्तिका भेजी जाएगी।'
        : 'Your request has been received. The booklet will be sent to you shortly.',
      data: {
        email,
        language,
        schoolLevel,
        timestamp: new Date().toISOString(),
        note: 'Email sent to administrator due to trial account limitations'
      }
    });
  } catch (error) {
    console.error('Booklet request error:', error);

    if (error.code === 'EAUTH') {
      return res.status(500).json({
        success: false,
        message: 'Email service authentication failed'
      });
    }

    if (error.code === 'ECONNECTION') {
      return res.status(500).json({
        success: false,
        message: 'Unable to connect to email service'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to process booklet request',
      error: error.message
    });
  }
};
