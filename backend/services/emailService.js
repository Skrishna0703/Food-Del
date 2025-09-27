import nodemailer from "nodemailer";
import crypto from "crypto";

// ✅ Validate environment variables early
const { EMAIL_USERNAME, EMAIL_PASSWORD, NEWSLETTER_SUBSCRIBE_SECRET, EMAIL_USER } = process.env;

if (!EMAIL_USERNAME || !EMAIL_PASSWORD || !EMAIL_USER) {
  console.error("❌ EMAIL_USERNAME, EMAIL_PASSWORD, and EMAIL_USER are required in .env");
  process.exit(1);
}

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USERNAME,
    pass: EMAIL_PASSWORD,
  },
});

// ✅ Token generator
export const generateUnsubscribeToken = (email) => {
  if (!email) throw new Error("Email is required to generate unsubscribe token");
  return crypto
    .createHmac("sha256", NEWSLETTER_SUBSCRIBE_SECRET || "default_secret")
    .update(email)
    .digest("hex");
};

// ✅ Send confirmation email
export const sendConfirmationEmail = async (email, unsubscribeLink) => {
  if (!email || !unsubscribeLink) throw new Error("Email and unsubscribeLink are required");
  try {
    await transporter.sendMail({
      from: `"Tomato 🍅" <${EMAIL_USER}>`,
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
    console.log(`✅ Confirmation email sent to ${email}`);
    return true;
  } catch (err) {
    console.error(`❌ Email sending failed to ${email}:`, err.message);
    return false;
  }
};

// ✅ Bulk newsletter sender with concurrency control
export const sendBulkNewsletter = async (
  subscribers,
  subject,
  content,
  generateUnsubscribeLink,
  concurrency = 5
) => {
  if (!Array.isArray(subscribers) || subscribers.length === 0) {
    console.warn("⚠️ No subscribers to send newsletter to.");
    return false;
  }

  const sendTasks = subscribers.map(async (subscriber) => {
    try {
      const unsubscribeLink = generateUnsubscribeLink(subscriber.email);
      await transporter.sendMail({
        from: `"Tomato 🍅" <${EMAIL_USER}>`,
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
      console.log(`✅ Newsletter sent to ${subscriber.email}`);
      return { email: subscriber.email, status: "success" };
    } catch (err) {
      console.error(`❌ Failed to send newsletter to ${subscriber.email}:`, err.message);
      return { email: subscriber.email, status: "failed", error: err.message };
    }
  });

  // Control concurrency
  const results = [];
  while (sendTasks.length) {
    const chunk = sendTasks.splice(0, concurrency);
    results.push(...(await Promise.all(chunk)));
  }

  return results;
};
