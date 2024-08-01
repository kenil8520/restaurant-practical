import nodemailer from 'nodemailer';
import dotenv from "dotenv"

dotenv.config();

const sendEmail = async (options: { to: string; subject: string; text: string }) => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 587,
    auth: {
      user: process.env.MAILTRAP_USER as string,
      pass: process.env.MAILTRAP_PASSWORD as string,
    },
  });

  const mailOptions = {
    from: 'test.user@gmail.com',
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
