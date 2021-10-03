import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const mailer = (
  senderEmail: string,
  subject: string,
  textMsj: string
): void => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const message = {
    from: process.env.EMAIL,
    to: senderEmail,
    subject,
    text: textMsj,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

export default mailer;
