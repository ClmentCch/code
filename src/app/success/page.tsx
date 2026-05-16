"use client";

import { useEffect } from "react";

const REDIRECT_URL = "/app";

export default function SuccessPage() {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, 1000);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <main className="grid min-h-screen place-items-center bg-[#111111] px-4 text-[#e7e7e7]">
      <section className="w-full max-w-md rounded-xl border border-[#2a2a2a] bg-[#1a1a1a] p-8 text-center shadow-2xl shadow-black/30">
        <p className="mx-auto mb-5 grid h-12 w-12 place-items-center rounded-full bg-[#18330f] text-2xl font-bold text-[#6fbd45]">
          OK
        </p>
        <h1 className="mb-3 text-3xl font-bold text-white">Connexion validee</h1>
        <p className="text-[#a7a7a7]">
          Le code envoye par email a ete verifie avec succes. Redirection...
        </p>
      </section>
    </main>
  );
}
