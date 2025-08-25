import nodemailer from "nodemailer";
import crypto from "crypto";

const transporter = nodemailer.createTransport({
  service: "gmail", // or your SMTP
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// ✅ Token generator
export const generateUnsubscribeToken = (email) => {
  return crypto
    .createHmac(
      "sha256",
      process.env.NEWSLETTER_SUBSCRIBE_SECRET || "default_secret"
    )
    .update(email)
    .digest("hex");
};

// ✅ Confirmation email
export const sendConfirmationEmail = async (email, unsubscribeLink) => {
  try {
    await transporter.sendMail({
      from: `"Tomato 🍅" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Tomato Newsletter",
      html: `
       <div style="max-width:600px; margin:20px auto; padding:20px; border-radius:12px; background:#f9fafc; font-family:Arial, sans-serif; text-align:center; color:#333; border:1px solid #e0e0e0;">
  <h2 style="color:#FF4500; margin-bottom:10px;">🍴 Thank you for subscribing!</h2>
  <p style="font-size:16px; line-height:1.6; margin:10px 0;">
    Tomato is your one-stop destination for fast, fresh, and flavorful meals. 
    We're committed to delivering your favorite dishes from top-rated kitchens 
    right to your doorstep—hot and on time!
  </p>
  <p style="font-size:14px; color:#555; margin:20px 0;">
    If you ever wish to unsubscribe, click the button below:
  </p>
  <a href="${unsubscribeLink}" 
     style="display:inline-block; padding:10px 20px; margin-top:10px; background:#ff4d4d; color:#fff; text-decoration:none; border-radius:6px; font-size:14px;">
     Unsubscribe
  </a>
</div>
      `,
    });
    return true;
  } catch (err) {
    console.error("❌ Email sending failed:", err);
    return false;
  }
};

// ✅ Bulk newsletter
export const sendBulkNewsletter = async (
  subscribers,
  subject,
  content,
  generateUnsubscribeLink
) => {
  try {
    for (const subscriber of subscribers) {
      const unsubscribeLink = generateUnsubscribeLink(subscriber.email);

      await transporter.sendMail({
        from: `"Tomato 🍅" <${process.env.EMAIL_USER}>`,
        to: subscriber.email,
        subject,
        html: `
          ${content}
          <hr>
          <p style="font-size:12px;color:#666;">
            If you no longer wish to receive these emails, 
            <a href="${unsubscribeLink}" style="color:red;">unsubscribe here</a>.
          </p>
        `,
      });
    }
    return true;
  } catch (err) {
    console.error("❌ Bulk email sending failed:", err);
    return false;
  }
};
