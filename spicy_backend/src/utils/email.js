import nodemailer from 'nodemailer';

const createTransporter = () => {
  const { EMAIL_USER, EMAIL_PASS, EMAIL_SERVICE = 'gmail', EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE } = process.env;
  if (!EMAIL_USER || !EMAIL_PASS) return null;

  if (EMAIL_HOST && EMAIL_PORT) {
    return nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: EMAIL_SECURE === 'true',
      auth: { user: EMAIL_USER, pass: EMAIL_PASS }
    });
  }

  return nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
  });
};

const transporter = createTransporter();

export const sendCodeEmail = async (email, code, purpose = 'verification') => {
  const subjects = {
    verification: 'Verify your Spicy account',
    reset: 'Reset your Spicy password'
  };

  if (!transporter) {
    console.log(`[${purpose.toUpperCase()}] Code for ${email}: ${code}`);
    return;
  }

  const html = `
    <div style="font-family:sans-serif;padding:24px;color:#333;">
      <h2 style="color:#F99B0C;">Spicy Restaurant</h2>
      <p>Your 6-digit code:</p>
      <div style="font-size:28px;font-weight:bold;letter-spacing:6px;color:#F99B0C;">${code}</div>
      <p style="color:#666;font-size:13px;">Valid for 15 minutes.</p>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
    to: email,
    subject: subjects[purpose] || 'Spicy code',
    html
  });
};
