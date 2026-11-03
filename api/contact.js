import nodemailer from "nodemailer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clean = (v, max = 2000) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const firstName = clean(body.first_name, 100);
  const lastName = clean(body.last_name, 100);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 30);
  const subject = clean(body.subject, 50);
  const message = String(body.message ?? "").trim().slice(0, 5000);

  if (!firstName || !emailPattern.test(email) || !phone || !subject) {
    return res.status(400).json({ error: "Invalid form data" });
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Website enquiry (${subject}): ${firstName} ${lastName}`.trim(),
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\n\n${message}`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact mail failed:", err.message);
    return res.status(500).json({ error: "Could not send message" });
  }
}
