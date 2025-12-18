"use client";

import { useEffect, useState } from "react";
import { IdentityStep } from "./IdentityStep";

type Step = "identity" | "wait";

export default function Verify({ hasKtpImage, isWaiting, isRejected }: { hasKtpImage: boolean, isWaiting: boolean, isRejected: boolean }) {
  const [step, setStep] = useState<Step>(isWaiting ? "wait" : "identity");

  const stepOrder: Step[] = ["identity", "wait"];
  const currentIndex = stepOrder.indexOf(step);

  const nextStep = () => {
    const next = stepOrder[currentIndex + 1];
    if (next) setStep(next);
  };

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-sky-100">
            Verifikasi Akun
          </p>
          <h1 className="text-3xl font-bold">Lakukan Verifikasi Identitas</h1>
          {isRejected &&
            <p className="text-red-300">
              identitas Anda Ditolak
            </p>
          }
          <p className="text-slate-200">
            Setelah mendaftar, unggah KTP & selfie.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {stepOrder.map((item, idx) => (
            <span
              key={item}
              className={`pill ${idx <= currentIndex
                ? "bg-emerald-100 text-emerald-700"
                : "bg-white/10 text-white"
                }`}
            >
              {idx + 1}.{" "}
              {item === "identity"
                ? "KTP & Selfie"
                : "Menunggu Persetujuan Admin"}
            </span>
          ))}
        </div>
      </div>


      {step === "identity" && <IdentityStep hasImage={hasKtpImage} onNextStep={nextStep} />}

      {step === "wait" && (
        <div className="card space-y-4 border-white/10 bg-white/10 p-6">
          <h2 className="text-lg font-semibold text-slate-700">Menunggu Persetujuans</h2>
        </div>
      )}
    </div>
  );
}

