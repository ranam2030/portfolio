import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const RATE_LIMIT_MAP = new Map<string, number>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3;

function getRateKey(req: NextRequest): string {
  return req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const last = RATE_LIMIT_MAP.get(key) ?? 0;
  if (now - last < RATE_LIMIT_WINDOW) {
    const count = RATE_LIMIT_MAP.get(`${key}_count`) ?? 0;
    if ((count as number) >= RATE_LIMIT_MAX) return true;
    RATE_LIMIT_MAP.set(`${key}_count`, (count as number) + 1);
  } else {
    RATE_LIMIT_MAP.set(key, now);
    RATE_LIMIT_MAP.set(`${key}_count`, 1);
  }
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // Rate limiting
    const ip = getRateKey(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please wait a minute.' }, { status: 429 });
    }

    const { name, email, subject, message } = await req.json();

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message too long.' }, { status: 400 });
    }

    // Honeypot — bots fill hidden fields
    const body = await req.text().catch(() => '');
    if (body.includes('website=') && body.match(/website=.+/)) {
      return NextResponse.json({ success: true }); // silent discard
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: subject?.trim() || `Portfolio message from ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f8faff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
          <div style="background: linear-gradient(135deg, #0b1326, #171f33); padding: 32px; text-align: center;">
            <div style="display: inline-block; background: rgba(152,203,255,0.15); border: 1px solid rgba(152,203,255,0.3); border-radius: 8px; padding: 8px 20px; margin-bottom: 12px;">
              <span style="color: #98cbff; font-size: 11px; letter-spacing: 0.15em; font-weight: 700; text-transform: uppercase;">New Portfolio Message</span>
            </div>
            <h1 style="color: #dae2fd; margin: 0; font-size: 24px; font-weight: 700;">You have a new message</h1>
          </div>
          <div style="padding: 32px; background: #ffffff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; width: 100px;">From</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 15px; font-weight: 500;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-size: 15px;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Subject</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f1f5f9; color: #1e293b; font-size: 15px;">${subject || '—'}</td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <p style="color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px 0;">Message</p>
              <div style="background: #f8faff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; color: #334155; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="margin-top: 28px; text-align: center;">
              <a href="mailto:${email}?subject=Re: ${subject || `Your message to Masud Rana`}" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #6366f1); color: white; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">Reply to ${name}</a>
            </div>
          </div>
          <div style="background: #f8faff; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">Sent from masudrana.dev portfolio contact form</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[contact]', err);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
