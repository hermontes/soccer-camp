"use server";
import sgMail from "@sendgrid/mail";

export async function sendEmail({ to, subject, text }) {
  const msg = {
    to: to,
    from: "hermonhaile16@gmail.com", // Use the email address or domain you verified above
    subject: subject,
    text: text,
  };

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const response = await sgMail.send(msg);

    return {
      status: "success",
      message: response,
    };
  } catch (error) {
    if (error.response) {
      console.error(error.response.body);
      return {
        status: "fail",
        message: error.response,
      };
    }
  }
}
