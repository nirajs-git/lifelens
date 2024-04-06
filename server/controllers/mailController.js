// EmailController.js
const EmailService = require("../service/emailService");

const emailService = new EmailService();

async function sendMail(req, res) {
  const { email } = req.body;
  const pdfFile = req.files[0];

  if (!pdfFile) {
    return res.status(400).json({ message: "PDF file is required" });
  }

  try {
    const response = await emailService.sendEmail(email, pdfFile);
    res.status(200).json({ message: "Email sent successfully", response });
  } catch (error) {
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
}

module.exports = {
  sendMail,
};
