type RecaptchaResponse = {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

export async function verifyRecaptcha(token: string) {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    throw new Error("Missing RECAPTCHA_SECRET_KEY environment variable");
  }

  const body = new URLSearchParams({
    secret: process.env.RECAPTCHA_SECRET_KEY,
    response: token,
  });

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const data = (await response.json()) as RecaptchaResponse;
  return data.success;
}
