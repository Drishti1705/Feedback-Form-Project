const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendOtpEmail(to, otp) {
  const mailOptions = {
    from: `"Beumer Feedback" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your OTP for Beumer Feedback Form',
    text: `Your OTP is: ${otp}`,
    html: `<p>Your OTP for the feedback form is: <strong>${otp}</strong></p>`
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendOtpEmail };
