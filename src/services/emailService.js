import nodemailer from 'nodemailer';

// Sends email. If no SMTP credentials are configured and we're in non-production,
// create a temporary Ethereal account so developers can test without real secrets.
export const sendContactEmail = async ({ name, email, phone, message }) => {
  let transporter;
  let previewUrl = null;

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else if (process.env.NODE_ENV !== 'production') {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    throw new Error('Email credentials are not configured in production');
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER || 'no-reply@example.com'}>` ,
    to: process.env.EMAIL_USER || process.env.EMAIL_USER || 'no-reply@example.com',
    subject: `New message from ${name}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
           <p><strong>Message:</strong><br/>${message}</p>`,
  };

  const info = await transporter.sendMail(mailOptions);
  // If using Ethereal (test account), nodemailer provides a preview URL
  previewUrl = nodemailer.getTestMessageUrl(info) || null;
  return previewUrl;
};