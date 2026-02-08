"use server";
import sgMail from "@sendgrid/mail";

const SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL;

export async function sendEmail({ to, subject, text }) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const response = await sgMail.send({
      to,
      from: SENDER_EMAIL,
      subject,
      text,
    });

    return { status: "success", message: response };
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    return { status: "fail", message: error.response || error.message };
  }
}
