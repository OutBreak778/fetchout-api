import nodemailer from "nodemailer";
import { CLIENT_URL, MAIL_PASS, MAIL_USER } from "../config/constants.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

export async function SendEmail(email, token) {
  const link = `${CLIENT_URL}/verify-email?token=${token}`;

  const mailOption = {
    from: MAIL_PASS,
    to: email,
    subject: "Verify your Email",
    html: `<h3>Click to verify:</h3><a href="${link}">${link}</a>`,
  };
  await transporter.sendMail(mailOption);
}
