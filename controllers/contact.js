const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { sendEmail } = require("../utils/mail");

const contactController = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      throw new ApiError(400, "All fields are required");
    }

    try {
      // Send notification email to admin
      await sendEmail({
        email: process.env.GMAIL_USER,
        subject: `New Contact Message from ${name}`,
        mailgenContent: {
          body: {
            name: "Admin",
            intro: "You have received a new contact message!",
            dictionary: {
              From: name,
              Email: email,
              Message: message,
            },
            outro:
              "You can reply directly to this email to respond to the sender.",
          },
        },
      });

      // Send confirmation email to sender
      await sendEmail({
        email: email,
        subject: "Thank you for contacting me",
        mailgenContent: {
          body: {
            name: name,
            intro: "Thank you for contacting me!",
            message:
              "I have received your message and will get back to you soon.",
            outro: "Best regards,\nUday Rana",
          },
        },
      });

      // Send success response
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "Message sent successfully"));
    } catch (error) {
      console.error("Email error:", error);
      throw new ApiError(500, "Failed to send email");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { contactController };
