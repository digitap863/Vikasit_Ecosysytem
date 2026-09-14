import nodemailer from "nodemailer";

export interface ContactNotificationData {
  name: string;
  email: string;
  phone?: string;
  message: string;
  newsletter?: boolean;
  product?: string;
  createdAt?: Date;
}

export async function sendContactNotificationEmail(data: ContactNotificationData) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user || `"Vikasit Ecosystems" <no-reply@vikasitecosystems.com>`;
  const recipient = process.env.SMTP_TO || "admin@vikasit.com";

  // If SMTP environment variables are missing, log and return gracefully
  if (!host || !user || !pass) {
    console.warn(
      "[SMTP Warning] SMTP environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS) are not configured in .env.local. Skipping email send."
    );
    return {
      success: false,
      skipped: true,
      reason: "SMTP credentials not configured in environment",
    };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });

  const productBadge = data.product
    ? `<div style="background-color: #edf6ef; color: #056826; padding: 6px 12px; border-radius: 4px; font-weight: bold; display: inline-block; margin-bottom: 16px; font-size: 13px;">Inquiry Product: ${data.product}</div>`
    : "";

  const phoneRow = data.phone
    ? `<tr>
        <td style="padding: 8px 0; font-weight: bold; color: #555555;">Phone Number:</td>
        <td style="padding: 8px 0; color: #111111;"><a href="tel:${data.phone}" style="color: #056826; text-decoration: none;">${data.phone}</a></td>
       </tr>`
    : "";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
      <div style="background-color: #056826; color: #ffffff; padding: 16px 20px; border-radius: 6px 6px 0 0; text-align: center;">
        <h2 style="margin: 0; font-size: 20px; font-weight: 700;">New Contact Inquiry</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">Vikasit Ecosystems Website</p>
      </div>

      <div style="padding: 24px 20px;">
        ${productBadge}
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555555; width: 120px;">Full Name:</td>
            <td style="padding: 8px 0; color: #111111;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555555;">Email Address:</td>
            <td style="padding: 8px 0; color: #111111;"><a href="mailto:${data.email}" style="color: #056826; text-decoration: none;">${data.email}</a></td>
          </tr>
          ${phoneRow}
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555555;">Newsletter:</td>
            <td style="padding: 8px 0; color: #111111;">${data.newsletter ? "Subscribed ✅" : "No"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #555555;">Submitted At:</td>
            <td style="padding: 8px 0; color: #111111;">${new Date(data.createdAt || Date.now()).toLocaleString()}</td>
          </tr>
        </table>

        <div style="margin-top: 16px;">
          <p style="font-weight: bold; color: #555555; margin-bottom: 8px;">Message:</p>
          <div style="background-color: #f7f7f7; border-left: 4px solid #056826; padding: 14px 16px; border-radius: 4px; font-size: 14px; line-height: 1.6; color: #333333; white-space: pre-wrap;">${data.message}</div>
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="mailto:${data.email}?subject=Re:%20Inquiry%20from%20Vikasit%20Ecosystems" style="background-color: #056826; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 14px; display: inline-block;">Reply to Sender</a>
        </div>
      </div>

      <div style="border-top: 1px solid #eeeeee; padding-top: 12px; margin-top: 20px; text-align: center; font-size: 12px; color: #888888;">
        This notification was automatically sent by Vikasit Ecosystems contact portal.
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from,
      to: recipient,
      replyTo: data.email,
      subject: `[New Inquiry] ${data.name}${data.product ? ` - ${data.product}` : ""}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || "N/A"}\nProduct: ${data.product || "N/A"}\nMessage: ${data.message}`,
      html: htmlContent,
    });

    console.log(`[SMTP Success] Email sent successfully! MessageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error("[SMTP Error] Failed to send email via SMTP:", error);
    return { success: false, error: error.message || "Failed to send email" };
  }
}
