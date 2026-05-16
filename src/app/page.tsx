"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function sendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Envoi du code...");

    const response = await fetch("/api/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      setStatus("error");
      setMessage(data.message || "Impossible d'envoyer le code");
      return;
    }

    setShowCode(true);
    setStatus("success");
    setMessage(data.message || "Code envoye");
  }

  async function verifyCode() {
    setStatus("loading");
    setMessage("Verification du code...");

    const response = await fetch("/api/verify-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      setStatus("error");
      setMessage(data.message || "Code invalide");
      return;
    }

    setStatus("success");
    setMessage(data.message || "Connexion validee");
    window.location.href = data.redirect || "/success";
  }

  const isLoading = status === "loading";

  return (
    <div className="min-h-screen bg-[#111111] px-4 py-8 text-[#e7e7e7]">
      <main className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center gap-8 md:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-7">
          <div className="inline-flex rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-[#ff6a2b]">
            Authentification par mail
          </div>
          <div className="space-y-5">
            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-6xl">
              Un site de connexion propre, pret pour Vercel.
            </h1>
            <p className="max-w-xl text-base leading-7 text-[#a7a7a7] md:text-lg">
              Entrez votre email, recevez un code a 6 chiffres, puis validez la
              connexion en quelques secondes.
            </p>
          </div>
          <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
            {["Next.js", "MongoDB", "Resend"].map((item) => (
              <div
                className="rounded-lg border border-[#2a2a2a] bg-[#171717] px-4 py-3 text-sm font-bold text-white"
                key={item}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] shadow-2xl shadow-black/30">
          <div className="bg-[#ff4400] px-7 py-5 text-center">
            <p className="text-lg font-bold text-white">mail-login</p>
          </div>
          <form className="space-y-5 p-7" onSubmit={sendCode}>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-white">
                Connexion securisee
              </h2>
              <p className="text-sm text-[#9b9b9b]">
                Entrez votre email pour recevoir un code.
              </p>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[#d7d7d7]">
                Email
              </span>
              <input
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-4 py-3 text-white outline-none transition focus:border-[#ff4400] focus:ring-2 focus:ring-[#ff4400]/25"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="vous@exemple.com"
                required
                type="email"
                value={email}
              />
            </label>

            <button
              className="w-full rounded-md bg-[#ff4400] px-4 py-3 font-bold text-white transition hover:bg-[#ff5f24] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={isLoading}
              type="submit"
            >
              {isLoading && !showCode ? "Envoi..." : "Envoyer le code"}
            </button>

            {showCode ? (
              <div className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-[#d7d7d7]">
                    Code
                  </span>
                  <input
                    className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-4 py-3 text-white outline-none transition focus:border-[#ff4400] focus:ring-2 focus:ring-[#ff4400]/25"
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="123456"
                    value={code}
                  />
                </label>
                <button
                  className="w-full rounded-md border border-[#ff4400] px-4 py-3 font-bold text-[#ff6a2b] transition hover:bg-[#ff4400] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isLoading || code.length < 6}
                  onClick={verifyCode}
                  type="button"
                >
                  {isLoading ? "Verification..." : "Verifier"}
                </button>
              </div>
            ) : null}

            {message ? (
              <p
                className={`min-h-5 text-center text-sm ${
                  status === "error" ? "text-[#e05c5c]" : "text-[#6fbd45]"
                }`}
              >
                {message}
              </p>
            ) : null}
          </form>
        </section>
      </main>
    </div>
  );
}
