const Mailgen = require("mailgen");
const nodemailer = require("nodemailer");

require("dotenv").config();

const sendEmail = async (options) => {
  // Initialize mailgen instance with default theme and brand configuration
  const mailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Uday Rana",
      link: "https://github.com/udayrana428",
    },
  });

  // Generate the plaintext version of the e-mail (for clients that do not support HTML)
  const emailTextual = mailGenerator.generatePlaintext(options.mailgenContent);

  // Generate an HTML email with the provided contents
  const emailHtml = mailGenerator.generate(options.mailgenContent);

  // Create nodemailer transporter instance
  const transporter = nodemailer.createTransport({
    // host: process.env.MAILTRAP_SMTP_HOST || "smtp.mailtrap.io",
    // port: process.env.MAILTRAP_SMTP_PORT || 2525,
    // secure: false,
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mail = {
    from: `"Uday Rana" <${process.env.GMAIL_USER}>`, // Updated from field
    to: options.email,
    subject: options.subject,
    text: emailTextual,
    html: emailHtml,
  };

  try {
    const info = await transporter.sendMail(mail);
    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Email service failed:", error);
    throw error; // Changed to throw error for better error handling
  }
};

module.exports = { sendEmail };
