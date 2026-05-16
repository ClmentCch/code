"use client";

import { useEffect, useState } from "react";
import { FiDownload } from "react-icons/fi";

const AUTH_ORIGIN = "https://minevidtub.vercel.app";
const PREVIEW_URL =
  "https://github.com/ClmentCch/MusifunkApp/releases/download/version/minecraftube-preview.png";
const DOWNLOAD_URL =
  "https://github.com/ClmentCch/MusifunkApp/releases/download/version/MinevidTub-Setup.exe";

function isAllowedReferrer(referrer: string) {
  if (!referrer) return false;

  try {
    const url = new URL(referrer);
    return (
      url.origin === AUTH_ORIGIN &&
      (url.pathname === "/" || url.pathname === "/success")
    );
  } catch {
    return false;
  }
}

export default function MinevidTubePage() {
  const [showAccessPopup, setShowAccessPopup] = useState(false);

  useEffect(() => {
    setShowAccessPopup(!isAllowedReferrer(document.referrer));
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#111111] text-[#e7e7e7]">
      {showAccessPopup ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 px-4 backdrop-blur-sm">
          <section className="w-full max-w-md rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-7 text-center shadow-2xl shadow-black/40">
            <p className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-[#18330f] text-xl font-bold text-[#48d65b]">
              !
            </p>
            <h2 className="mb-3 text-2xl font-bold text-white">
              Acces protege
            </h2>
            <p className="mb-6 text-sm leading-6 text-[#a7a7a7]">
              Pour acceder a MinevidTube, commencez depuis la page de connexion
              officielle.
            </p>
            <a
              className="inline-flex w-full items-center justify-center rounded-md bg-[#16a832] px-4 py-3 font-bold text-white transition hover:bg-[#20c940]"
              href={AUTH_ORIGIN}
            >
              Aller sur minevidtub.vercel.app
            </a>
          </section>
        </div>
      ) : null}

      <section className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-7">
          <div className="inline-flex rounded-full border border-[#2a2a2a] bg-[#1a1a1a] px-4 py-2 text-sm font-semibold text-[#48d65b]">
            MinevidTube
          </div>

          <div className="space-y-5">
            <h1 className="max-w-2xl text-4xl font-bold leading-tight text-white md:text-6xl">
              Un YouTube pour les fans de Minecraft.
            </h1>
            <p className="max-w-xl text-base leading-7 text-[#a7a7a7] md:text-lg">
              Regardez, partagez et installez MinevidTube, une experience video
              pensee pour la communaute Minecraft.
            </p>
          </div>

          <a
            className="inline-flex items-center justify-center gap-3 rounded-md bg-[#16a832] px-6 py-4 text-base font-bold text-white transition hover:bg-[#20c940]"
            download
            href={DOWNLOAD_URL}
          >
            <FiDownload className="text-xl" />
            Telecharger MinevidTube
          </a>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 rounded-xl border border-[#16a832]/25 bg-[#16a832]/10 blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Capture d'ecran de MinevidTube"
            className="relative w-full rounded-xl border border-[#2a2a2a] bg-[#0d0d0d] shadow-2xl shadow-black/40"
            src={PREVIEW_URL}
          />
        </div>
      </section>
    </main>
  );
}
