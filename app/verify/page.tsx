"use client";

import { useState } from "react";

type Step = "otp" | "identity" | "profile";

export default function VerifyPage() {
  const [step, setStep] = useState<Step>("identity");
  const [otp, setOtp] = useState("");
  const [files, setFiles] = useState({ ktp: "", selfie: "" });
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
    address: "",
    photo: "",
  });

  const stepOrder: Step[] = ["otp", "identity", "profile"];
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
          <h1 className="text-3xl font-bold">Lakukan verifikasi keamanan</h1>
          <p className="text-slate-200">
            Setelah mendaftar, lengkapi tahapan OTP Gmail, unggah KTP & selfie,
            lalu isi data diri.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {stepOrder.map((item, idx) => (
            <span
              key={item}
              className={`pill ${
                idx <= currentIndex
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-white/10 text-white"
              }`}
            >
              {idx + 1}.{" "}
              {item === "otp"
                ? "OTP Gmail"
                : item === "identity"
                  ? "KTP & Selfie"
                  : "Data Diri"}
            </span>
          ))}
        </div>
      </div>

      {step === "otp" && (
        <div className="card space-y-4 border-white/10 bg-white/10 p-6">
          <h2 className="text-lg font-semibold text-white">OTP Gmail</h2>
          <p className="text-slate-200">
            Kami mengirim OTP ke email Anda. Masukkan 6 digit kode untuk
            melanjutkan.
          </p>
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                maxLength={1}
                className="input text-center text-lg font-bold"
                value={otp[i] ?? ""}
                onChange={(e) => {
                  const val = e.target.value.slice(-1);
                  const chars = otp.split("");
                  chars[i] = val;
                  setOtp(chars.join(""));
                }}
              />
            ))}
          </div>
          <button className="btn btn-primary w-full" onClick={nextStep}>
            Verifikasi OTP & lanjut
          </button>
        </div>
      )}

      {step === "identity" && (
        <div className="card space-y-4 border-white/10 bg-white/10 p-6">
          <h2 className="text-lg font-semibold text-slate-700">
            Unggah KTP & Selfie
          </h2>
          <p className="text-slate-500">
            Kirim foto KTP dan selfie memegang KTP untuk memastikan keaslian.
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-slate-100 text-slate-500">
              Foto KTP
              <input
                type="file"
                accept="image/*"
                className="input bg-white/10 text-slate-700!"
                onChange={(e) =>
                  setFiles({
                    ...files,
                    ktp: e.target.files?.[0]?.name || "",
                  })
                }
              />
              {files.ktp && (
                <p className="text-xs text-emerald-200">Terunggah: {files.ktp}</p>
              )}
            </label>
            <label className="space-y-2 text-sm text-slate-100 text-slate-500">
              Foto selfie dengan KTP
              <input
                type="file"
                accept="image/*"
                className="input bg-white/10 text-slate-700!"
                onChange={(e) =>
                  setFiles({
                    ...files,
                    selfie: e.target.files?.[0]?.name || "",
                  })
                }
              />
              {files.selfie && (
                <p className="text-xs text-emerald-200">
                  Terunggah: {files.selfie}
                </p>
              )}
            </label>
          </div>
          <button className="btn btn-primary w-full" onClick={nextStep}>
            Kirim & lanjut data diri
          </button>
        </div>
      )}

      {step === "profile" && (
        <div className="card space-y-4 border-white/10 bg-white/10 p-6">
          <h2 className="text-lg font-semibold text-slate-700">Data diri</h2>
          <p className="text-slate-500">
            Lengkapi informasi alamat, nama, nomor HP, dan foto profil (opsional).
          </p>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Data verifikasi dikirim. Akun menunggu persetujuan.");
            }}
          >
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-500">Nama</label>
              <input
                className="input bg-white/10 text-slate-700!"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                placeholder="Nama lengkap sesuai KTP"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-500">
                No HP
              </label>
              <input
                className="input bg-white/10 text-slate-700!"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                placeholder="08xxxxxxxxxx"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-500">
                Alamat lengkap
              </label>
              <textarea
                className="input min-h-24 bg-white/10 text-slate-700!"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
                placeholder="Jalan, nomor rumah, kecamatan, kota"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-500">
                Foto profil (opsional)
              </label>
              <input
                type="file"
                accept="image/*"
                className="input bg-white/10 text-slate-700!"
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    photo: e.target.files?.[0]?.name || "",
                  })
                }
              />
              {profile.photo && (
                <p className="text-xs text-emerald-200">
                  Terunggah: {profile.photo}
                </p>
              )}
            </div>
            <button className="btn btn-primary w-full" type="submit">
              Kirim verifikasi
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

