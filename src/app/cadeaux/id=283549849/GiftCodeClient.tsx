"use client";

import { useState } from "react";

const GIFT_CODE = "RAPF4JNNR44TVCJ2WC";
const PRODUCT_IMAGE =
  "https://gaming-cdn.com/images/products/10437/orig/roblox-800-robux-pc-cover.jpg?v=1767788892";

export default function GiftCodeClient() {
  const [activated, setActivated] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");

  async function copyCode() {
    await navigator.clipboard.writeText(GIFT_CODE);
    setCopyMessage("Code copie dans le presse-papier !");
    window.setTimeout(() => setCopyMessage(""), 3000);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#111111] px-4 py-8 text-[#e0e0e0] sm:items-start sm:pt-12">
      <section className="w-full max-w-[380px] animate-[fadeIn_0.4s_ease] overflow-hidden rounded-xl border border-[#2a2a2a] bg-[#1a1a1a]">
        <div className="bg-[#e8572a] px-7 py-[18px] text-center">
          <p className="text-lg font-bold tracking-[0.03em] text-white">
            Cadeau recu
          </p>
        </div>

        <div className="px-7 pb-6 pt-7 sm:px-[18px] sm:pb-[18px] sm:pt-5">
          <div className="mb-5 flex items-center justify-center gap-2 rounded-lg border border-[#2a2a2a] bg-[#1f1f1f] px-3.5 py-2.5 text-center">
            <span className="text-lg">🎀</span>
            <span className="text-xs text-[#888888]">
              De la part de{" "}
              <strong className="font-bold text-[#e8572a]">Clement Cochie</strong>
            </span>
          </div>

          <div className="mb-[18px] text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Roblox 800 Robux"
              className="inline-block h-[140px] w-[140px] rounded-[10px] border-2 border-[#2a2a2a] object-cover sm:h-[110px] sm:w-[110px]"
              src={PRODUCT_IMAGE}
            />
          </div>

          <h1 className="mb-3.5 text-center text-[17px] font-extrabold text-white sm:text-[15px]">
            Roblox - 800 Robux
          </h1>

          <div className="mb-5 grid grid-cols-2 gap-2">
            <div className="rounded-[7px] border border-[#2a2a2a] bg-[#111111] px-3 py-2">
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#888888]">
                Type de vente
              </p>
              <p className="text-[13px] font-semibold text-[#e0e0e0]">Robux</p>
            </div>
            <div className="rounded-[7px] border border-[#2a2a2a] bg-[#111111] px-3 py-2">
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#888888]">
                Marque
              </p>
              <p className="text-[13px] font-semibold text-[#e0e0e0]">Roblox</p>
            </div>
            <div className="col-span-2 rounded-[7px] border border-[#2a2a2a] bg-[#111111] px-3 py-2">
              <p className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-[#888888]">
                Date d&apos;achat
              </p>
              <p className="text-[13px] font-semibold text-[#e0e0e0]">
                15/05/2026
              </p>
            </div>
          </div>

          <div className="mb-5 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[#888888]">
              Pour
            </p>
            <p className="mt-0.5 text-xl font-extrabold text-white">Aymeric 🎮</p>
          </div>

          <hr className="mb-5 border-[#2a2a2a]" />

          <button
            className="w-full rounded-md bg-[#e8572a] p-[11px] text-[13px] font-bold uppercase tracking-[0.06em] text-white transition hover:opacity-85 disabled:cursor-default disabled:opacity-60 sm:p-2.5 sm:text-xs"
            disabled={activated}
            onClick={() => setActivated(true)}
            type="button"
          >
            {activated ? "Achat active" : "Activer l'achat"}
          </button>

          {activated ? (
            <div className="mt-4 animate-[fadeIn_0.3s_ease]">
              <div className="mb-2 rounded-md border border-[#2a2a2a] bg-[#0d0d0d] px-3.5 py-3 text-center font-mono text-lg font-bold tracking-[0.15em] text-[#e0e0e0]">
                {GIFT_CODE}
              </div>
              <button
                className="w-full rounded-md border border-[#2a2a2a] bg-transparent p-2.5 text-[13px] font-semibold text-[#888888] transition hover:border-[#e8572a] hover:text-[#e0e0e0]"
                onClick={copyCode}
                type="button"
              >
                Copier le code
              </button>
              <p className="mt-2.5 min-h-[18px] text-center text-xs text-[#5ba32b]">
                {copyMessage}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex items-center justify-between border-t border-[#2a2a2a] px-7 py-3.5 text-xs text-[#888888] sm:px-[18px]">
          <span>Propulse par votre boutique</span>
          <a className="hover:text-[#e0e0e0]" href="#">
            Support
          </a>
        </div>
      </section>
    </main>
  );
}
