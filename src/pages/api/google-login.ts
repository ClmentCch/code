import type { NextApiRequest, NextApiResponse } from "next";
import { createSessionToken, getSessionCookieHeader } from "@/lib/session";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const email = String(req.body?.email || "").trim().toLowerCase();

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Email Google invalide" });
  }

  const sessionToken = createSessionToken(email);
  res.setHeader("Set-Cookie", getSessionCookieHeader(sessionToken));

  return res.status(200).json({
    success: true,
    message: "Connexion Google validee",
    redirect: "/cadeaux",
  });
}
