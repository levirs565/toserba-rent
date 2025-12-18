"use client";

import { useState } from "react";

const sampleConversations = [
  {
    name: "Admin Toserba",
    preview: "Barang siap dikirim hari ini, perlu jadwal antar?",
    time: "09:30",
  },
  {
    name: "Penyedia Kamera",
    preview: "Bisa extend 2 hari, harga sama.",
    time: "08:10",
  },
];

export default function MessagesPage() {
  const [message, setMessage] = useState("");

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="card space-y-4 border-white/10 bg-white/10 p-6 text-white">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Percakapan</h2>
          <span className="pill bg-emerald-100 text-emerald-700">
            Live support
          </span>
        </div>
        <div className="space-y-3">
          {sampleConversations.map((chat) => (
            <div
              key={chat.name}
              className="rounded-xl border border-white/10 bg-white/5 p-3"
            >
              <div className="flex items-center justify-between text-sm">
                <p className="font-semibold">{chat.name}</p>
                <span className="text-slate-200">{chat.time}</span>
              </div>
              <p className="text-sm text-slate-200">{chat.preview}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="card space-y-4 border-white/10 bg-white/90 p-6 text-slate-900">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">
              Obrolan
            </p>
            <h2 className="text-xl font-bold text-slate-900">
              Kirim pesan ke penyedia
            </h2>
          </div>
          <span className="pill bg-slate-100 text-slate-800">
            Tersambung
          </span>
        </div>
        <div className="h-64 space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800">
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-slate-900">Anda</p>
            <div className="w-fit rounded-lg bg-slate-200 px-3 py-2">
              Apakah kamera ready untuk hari Sabtu?
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="font-semibold text-slate-900">Admin Toserba</p>
            <div className="w-fit max-w-[80%] rounded-lg bg-emerald-100 px-3 py-2 text-emerald-800">
              Siap, bisa pilih antar dan jadwalkan jam kirim. Perlu dibantu
              checkout?
            </div>
          </div>
        </div>
        <form
          className="flex gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setMessage("");
          }}
        >
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input flex-1 bg-white/60 text-slate-900"
            placeholder="Tulis pesan ke penyedia..."
          />
          <button className="btn btn-primary" type="submit">
            Kirim
          </button>
        </form>
        <p className="text-sm text-slate-600">
          Fitur pesan memudahkan pengguna bertanya atau menghubungi penyewa
          secara langsung.
        </p>
      </div>
    </div>
  );
}

