import { Resend } from "resend";

const requiredEnv = ["RESEND_API_KEY"];

export function getMissingMailEnv() {
  return requiredEnv.filter((key) => !process.env[key]);
}

export async function sendLoginCode(email: string, code: string) {
  const missing = getMissingMailEnv();

  if (missing.length > 0) {
    throw new Error(`Missing mail environment variables: ${missing.join(", ")}`);
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Votre code de véfication InstantRobux",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;background:#ffffff;border-radius:12px;border:1px solid #e5e5e5;overflow:hidden;">
        <div style="background:#ff4400;padding:24px 32px;text-align:center;">
          <span style="font-size:20px;font-weight:600;color:#ffffff;">instantrobux</span>
        </div>
        <div style="padding:32px;">
          <h1 style="margin:0 0 8px;font-size:22px;color:#111111;">Vérification de votre compte</h1>
          <p style="margin:0 0 24px;font-size:15px;color:#666666;line-height:1.6;">
            Utilisez le code ci-dessous pour confirmer votre adresse email.
            Ce code est valable <strong style="color:#111111;">15 minutes</strong>.
          </p>
          <div style="background:#f8f8f8;border:1px solid #e5e5e5;border-radius:8px;padding:24px;text-align:center;margin-bottom:24px;">
            <p style="margin:0 0 6px;font-size:11px;color:#999999;letter-spacing:1.5px;text-transform:uppercase;">Votre code</p>
            <span style="font-size:36px;font-weight:700;letter-spacing:10px;color:#111111;font-family:monospace;">${code}</span>
          </div>
          <p style="margin:0;font-size:13px;color:#999999;line-height:1.6;">
            Si vous n'avez pas demandé ce code, ignorez cet email.
          </p>
        </div>
        <div style="border-top:1px solid #e5e5e5;padding:16px 32px;text-align:right;">
          <a href="https://instantrobux.neocities.org/" style="font-size:12px;color:#666666;text-decoration:none;">instantrobux.neocities.org</a>
        </div>
      </div>
    `,
  });
}
