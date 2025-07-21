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
  const link = `${CLIENT_URL}/auth/verify-email?token=${token}`;

const mailOption = {
  from: MAIL_USER,
  to: email,
  subject: "Verify Your Email for Fetchout",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px; background-color: #f9f9f9;">
      <h2 style="color: #333;">Welcome to <span style="color: #007bff;">Fetchout</span> 👋</h2>
      <p style="font-size: 16px; color: #555;">
        Thank you for registering! You're almost ready to start using <strong>Fetchout</strong>.
        To activate your account, please verify your email by clicking the button below:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${link}" style="background-color: #007bff; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
          Verify Email
        </a>
      </div>
      <p style="font-size: 14px; color: #777;">
        If you didn’t create this account, just ignore this email.
      </p>
      <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
      <p style="font-size: 12px; color: #999;">
        © ${new Date().getFullYear()} Fetchout. All rights reserved.
      </p>
    </div>
  `
};

  await transporter.sendMail(mailOption);
}
