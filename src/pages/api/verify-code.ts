import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import Otp from "@/models/Otp";
import { createSessionToken, getSessionCookieHeader } from "@/lib/session";

const MAX_CODE_AGE_MS = 15 * 60 * 1000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const email = String(req.body?.email || "").trim().toLowerCase();
  const code = String(req.body?.code || "").trim();

  if (!email || !code) {
    return res.status(400).json({ success: false, message: "Email et code requis" });
  }

  try {
    await dbConnect();

    const otpDoc = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: "Code expire ou introuvable" });
    }

    const age = Date.now() - new Date(otpDoc.createdAt).getTime();

    if (age > MAX_CODE_AGE_MS) {
      await Otp.deleteOne({ _id: otpDoc._id });
      return res.status(400).json({ success: false, message: "Code expire" });
    }

    const isValid = bcrypt.compareSync(code, otpDoc.otp);

    if (!isValid) {
      return res.status(400).json({ success: false, message: "Code invalide" });
    }

    await Otp.deleteOne({ _id: otpDoc._id });

    const sessionToken = createSessionToken(email);
    res.setHeader("Set-Cookie", getSessionCookieHeader(sessionToken));

    return res.status(200).json({
      success: true,
      message: "Connexion validee",
      redirect: "/cadeaux",
    });
  } catch (error) {
    console.error("verify-code error", error);
    return res.status(500).json({
      success: false,
      message: "Impossible de verifier le code",
    });
  }
}
