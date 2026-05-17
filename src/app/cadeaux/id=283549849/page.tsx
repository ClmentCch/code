import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/session";

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

  return (
    <main className="grid min-h-screen place-items-center bg-[#1a1a1a] px-4 text-white">
      <section className="w-full max-w-md rounded-xl border border-[#2a2a2a] bg-black p-8 text-center">
        <p className="mb-3 text-3xl text-[#ff5a00]">InstantRobux</p>
        <h1 className="mb-4 text-2xl font-bold">Roblox - 800 Robux</h1>
        <p className="text-[#cfcfcf]">
          Votre cadeau est pret a etre active pour {session.email}.
        </p>
      </section>
    </main>
  );
}
