import type { NextApiRequest, NextApiResponse } from "next";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ authenticated: false });
  }

  const session = verifySessionToken(req.cookies[SESSION_COOKIE_NAME]);

  if (!session) {
    return res.status(401).json({ authenticated: false });
  }

  return res.status(200).json({ authenticated: true, email: session.email });
}
