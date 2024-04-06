// EmailService.js
const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nirajsurve550@gmail.com',
        pass: 'jquw ftui gjck hxkd',
      },
    });
  }

  async sendEmail(email, pdfFile) {
    const mailOptions = {
      from: 'nirajsurve550@gmail.com',
      to: email,
      subject: 'LifeLens: Risk Assessment Report',
      text: 'Please find the attached health report below.',
      attachments: [
        {
          filename: 'assessment_report.pdf',
          content: pdfFile.data, 
          contentType: 'application/pdf',
        },
      ],
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}

module.exports = EmailService;