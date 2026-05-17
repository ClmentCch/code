import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import { sendLoginCode } from "@/lib/mail";
import { verifyRecaptcha } from "@/lib/recaptcha";
import Otp from "@/models/Otp";
import User from "@/models/User";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const email = String(req.body?.email || "").trim().toLowerCase();
  const password = String(req.body?.password || "");
  const captchaToken = String(req.body?.captchaToken || "");

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ success: false, message: "Email invalide" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "Le mot de passe doit contenir au moins 6 caracteres",
    });
  }

  if (!captchaToken) {
    return res.status(400).json({ success: false, message: "Captcha requis" });
  }

  try {
    const captchaIsValid = await verifyRecaptcha(captchaToken);

    if (!captchaIsValid) {
      return res.status(400).json({ success: false, message: "Captcha invalide" });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const passwordIsValid = bcrypt.compareSync(password, existingUser.password);

      if (!passwordIsValid) {
        return res.status(401).json({
          success: false,
          message: "Mot de passe incorrect",
        });
      }
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      await User.create({ email, password: hashedPassword });
    }

    const code = generateCode();
    const hashedCode = bcrypt.hashSync(code, 10);

    await Otp.deleteMany({ email });
    await Otp.create({ email, otp: hashedCode });
    await sendLoginCode(email, code);

    return res.status(200).json({
      success: true,
      message: "Code envoye. Verifiez votre boite mail.",
    });
  } catch (error) {
    console.error("send-code error", error);
    return res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Impossible d'envoyer le code",
    });
  }
}
