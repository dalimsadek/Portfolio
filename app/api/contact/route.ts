import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "dalimsadek02@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || process.env.SENDGRID_FROM_EMAIL || TO_EMAIL;

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function POST(request: Request) {
  if (!SENDGRID_API_KEY) {
    return NextResponse.json({ error: "SENDGRID_API_KEY not set" }, { status: 500 });
  }

  try {
    const { name = "", email = "", message = "" } = (await request.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    if (!message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const subject = `New contact from ${name || "Visitor"}`;
    const text = `Name: ${name || "Not provided"}\nEmail: ${email || "Not provided"}\n\nMessage:\n${message}`;

    await sgMail.send({
      to: TO_EMAIL,
      from: FROM_EMAIL,
      replyTo: email || undefined,
      subject,
      text
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("/api/contact error", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
