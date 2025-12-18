import Link from "next/link";

export default function UserInfoPage() {
  return (
    <div className="space-y-6 text-white">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-sky-100">
          Informasi Pengguna
        </p>
        <h1 className="text-3xl font-bold">Profil & status sewa</h1>
        <p className="text-slate-200">
          Kelola data akun dan daftar sebagai penyedia barang sewaan.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card space-y-3 border-white/10 bg-white/10 p-6">
          <h2 className="text-lg font-semibold text-white">Detail Akun</h2>
          <div className="space-y-2 text-sm text-slate-200">
            <p>Nama: Alex Santoso</p>
            <p>Email: alex@toserba.id</p>
            <p>Member sejak: 2024</p>
          </div>
          <Link
            href="/provider"
            className="btn btn-primary w-full text-center text-sm"
          >
            Daftar sebagai penyedia barang sewaan
          </Link>
        </div>

        <div className="card space-y-3 border-white/10 bg-white/90 p-6 text-slate-900">
          <h2 className="text-lg font-semibold text-slate-900">
            Status Sewa Terbaru
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">
                  Kamera Mirrorless A7
                </p>
                <p className="text-slate-600">Durasi: 3 hari · Antar</p>
              </div>
              <span className="pill bg-emerald-100 text-emerald-700">
                Sedang dikirim
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">
                  Paket Camping 4 Orang
                </p>
                <p className="text-slate-600">Durasi: 2 hari · Ambil sendiri</p>
              </div>
              <span className="pill bg-slate-200 text-slate-800">
                Selesai
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

