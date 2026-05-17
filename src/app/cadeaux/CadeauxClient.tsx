"use client";

import { useEffect, useState } from "react";

const AUTH_ORIGIN = "https://instantrobux.vercel.app";
const PROFILE_IMAGE =
  "https://pixabay.com/fr/images/download/wanderercreative-blank-profile-picture-973460_1920.png";
const GIFT_OWNER = "clementcochie@gmail.com";

function isAllowedReferrer(referrer: string) {
  if (!referrer) return false;

  try {
    const url = new URL(referrer);
    return url.origin === AUTH_ORIGIN && url.pathname === "/";
  } catch {
    return false;
  }
}

export default function CadeauxClient({ email }: { email: string }) {
  const [popup, setPopup] = useState<"access" | "service" | null>(null);

  useEffect(() => {
    if (!isAllowedReferrer(document.referrer)) {
      setPopup("access");
    }
  }, []);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  }

  const hasGift = email.toLowerCase() === GIFT_OWNER;

  return (
    <main className="min-h-screen bg-[#1a1a1a] text-white">
      {popup ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 backdrop-blur-sm">
          <section className="w-full max-w-md rounded-xl border border-[#2a2a2a] bg-[#111111] p-7 text-center shadow-2xl shadow-black/40">
            <h2 className="mb-3 text-2xl font-bold">
              {popup === "service" ? "Service indisponible" : "Acces protege"}
            </h2>
            <p className="mb-6 text-sm leading-6 text-[#b8b8b8]">
              {popup === "service"
                ? "Ce service est indisponible pour le moment."
                : "Veuillez aller sur la page de connexion officielle pour acceder a vos cadeaux."}
            </p>
            {popup === "access" ? (
              <a
                className="inline-flex w-full items-center justify-center rounded-md bg-[#ff5a00] px-4 py-3 font-bold text-white transition hover:bg-[#ff7a1a]"
                href={AUTH_ORIGIN}
              >
                Aller sur instantrobux.vercel.app
              </a>
            ) : (
              <button
                className="w-full rounded-md bg-[#ff5a00] px-4 py-3 font-bold text-white transition hover:bg-[#ff7a1a]"
                onClick={() => setPopup(null)}
                type="button"
              >
                Fermer
              </button>
            )}
          </section>
        </div>
      ) : null}

      <aside className="fixed inset-y-0 left-0 hidden w-[260px] bg-[#111111] px-5 py-20 md:block">
        <p className="mb-44 px-5 text-3xl text-[#ff5a00]">InstantRobux</p>
        <nav className="space-y-2">
          <button className="w-full rounded-lg border-4 border-white bg-black px-4 py-3 text-lg font-bold">
            Mes cadeaux
          </button>
          <button
            className="w-full rounded-lg border-4 border-white bg-black px-4 py-3 text-lg font-bold"
            onClick={() => setPopup("service")}
            type="button"
          >
            Envoyer un cadeau
          </button>
          <button
            className="w-full rounded-lg border-4 border-white bg-black px-4 py-3 text-lg font-bold"
            onClick={() => setPopup("service")}
            type="button"
          >
            Magasin
          </button>
        </nav>
        <button
          className="absolute bottom-10 left-16 text-xl text-red-500"
          onClick={logout}
          type="button"
        >
          Se deconnecter
        </button>
      </aside>

      <section className="min-h-screen px-4 py-6 md:ml-[260px] md:px-5 md:py-7">
        <header className="mb-9 flex items-center justify-between gap-4 md:justify-end">
          <p className="text-2xl text-[#ff5a00] md:hidden">InstantRobux</p>
          <div className="flex min-w-0 items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Profil"
              className="h-12 w-12 shrink-0 rounded-full object-cover md:h-[50px] md:w-[50px]"
              src={PROFILE_IMAGE}
            />
            <p className="truncate text-sm md:text-xl">{email}</p>
          </div>
        </header>

        <div className="mb-7 flex gap-2 overflow-x-auto md:hidden">
          <button className="shrink-0 rounded-lg border-2 border-white bg-black px-4 py-2 font-bold">
            Mes cadeaux
          </button>
          <button
            className="shrink-0 rounded-lg border-2 border-white bg-black px-4 py-2 font-bold"
            onClick={() => setPopup("service")}
            type="button"
          >
            Envoyer un cadeau
          </button>
          <button
            className="shrink-0 rounded-lg border-2 border-white bg-black px-4 py-2 font-bold"
            onClick={() => setPopup("service")}
            type="button"
          >
            Magasin
          </button>
        </div>

        <h1 className="mb-8 text-4xl md:text-[38px]">Mes cadeaux</h1>

        {hasGift ? (
          <article className="w-full max-w-[320px] rounded-[34px] bg-black p-2 pb-3 md:ml-0">
            <p className="mb-2 px-1 pt-3 text-xl">De la part de Clement</p>
            <div className="mb-2 grid h-[155px] place-items-center rounded-lg bg-[radial-gradient(circle,#222_0%,#050505_70%)] text-center">
              <div>
                <p className="text-4xl font-black tracking-wide">ROBLOX</p>
                <div className="mx-auto my-2 grid h-16 w-20 place-items-center bg-white text-xs text-[#ff5a00]">
                  ROBUX
                </div>
                <p className="text-2xl font-bold">800 - Robux</p>
              </div>
            </div>
            <h2 className="mb-1 text-xl">Roblox - 800 Robux</h2>
            <p>Date d&apos;achat : 15/05/2026</p>
            <p>Type de vente : Robux</p>
            <p>Marque : Roblox</p>
            <a
              className="mx-auto mt-3 flex w-[174px] items-center justify-center rounded-full bg-[#808080] py-2 text-xl text-white"
              href="/cadeaux/id=283549849"
            >
              ACTIVER
            </a>
          </article>
        ) : (
          <p className="mt-28 text-center text-2xl md:mt-52 md:text-[28px]">
            Vous n&apos;avez pas de cadeaux actuellement.
          </p>
        )}

        <button
          className="fixed bottom-5 right-5 text-red-500 md:hidden"
          onClick={logout}
          type="button"
        >
          Se deconnecter
        </button>
      </section>
    </main>
  );
}
