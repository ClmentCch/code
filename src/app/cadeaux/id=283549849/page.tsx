import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";
import GiftCodeClient from "./GiftCodeClient";

const GIFT_OWNER = "clementcochie@gmail.com";

export default function GiftActivationPage() {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  const session = verifySessionToken(token);

  if (!session) {
    redirect("/");
  }

  if (session.email.toLowerCase() !== GIFT_OWNER) {
    redirect("/cadeaux");
  }

  return <GiftCodeClient />;
}
