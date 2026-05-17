import type { NextApiRequest, NextApiResponse } from "next";
import { getClearSessionCookieHeader } from "@/lib/session";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  res.setHeader("Set-Cookie", getClearSessionCookieHeader());
  return res.status(200).json({ success: true });
}
