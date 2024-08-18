const nodemailer = require('nodemailer');
const Email = require('../models/emailModel');

const sendEmail = async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    // Setup nodemailer transport
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Save email to database
    const email = new Email({ to, subject, message });
    await email.save();

    res.status(200).json({ message: 'Email sent and saved successfully!' });
  } catch (error) {
    console.error('Email sending failed:', error.message);
    res.status(500).json({ message: 'Email sending failed', error: error.message });
  }
};

module.exports = { sendEmail };
