import Link from "next/link";
import { formatIDR } from "../lib/products";
import { getAllProducts } from "@/lib/products";


export default async function Home() {
  const products = await getAllProducts();

  const featured = products.slice(0, 4);
  return (
    <div className="space-y-10 text-white">
      <section className="card relative overflow-hidden border-white/10 bg-linear-to-br from-[#10213c] via-[#0f1f38] to-[#0d1b2a] px-6 py-10 text-white">
        <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="relative grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-100">
              Marketplace Sewa
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">
              Sewa barang premium dengan pengalaman elegan dan minimalis.
            </h1>
            <p className="text-lg text-slate-200">
              Toserba Rent menghadirkan kurasi kamera, audio, fashion, hingga
              outdoor gear dengan status ketersediaan real-time.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/cart" className="btn btn-primary">
                Lihat Keranjang
              </Link>
              <Link href="/messages" className="btn btn-ghost">
                Hubungi Penyewa
              </Link>
              <Link
                href="/provider"
                className="btn btn-ghost border border-white/20"
              >
                Daftar Penyedia
              </Link>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-200 sm:grid-cols-4">
              {[
                { label: "Barang tersedia", value: "120+" },
                { label: "Penyewaan selesai", value: "5.3K" },
                { label: "Waktu respon", value: "< 5 menit" },
                { label: "Proteksi", value: "Asuransi kerusakan" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                >
                  <p className="text-xs text-slate-300">{item.label}</p>
                  <p className="text-lg font-semibold text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="card border-white/10 bg-white/10 p-6 text-slate-100">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold">Status Sewa</p>
              <span className="pill bg-emerald-100 text-emerald-700">
                Siap kirim
              </span>
            </div>
            <div className="mt-6 space-y-3">
              {featured.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3"
                >
                  <div
                    className="h-14 w-14 rounded-xl"
                    style={{ background: product.imageColor }}
                  />
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-white">{product.name}</p>
                    <p className="text-slate-300">{product.category}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="font-semibold text-white">
                      {formatIDR(product.pricePerDay)}/hari
                    </p>
                    <p
                      className={`pill ${product.status === "ready"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                        }`}
                    >
                      {product.status === "ready" ? "Siap" : "Disewakan"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-2 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-sky-100">
                Koleksi unggulan
              </p>
              <h2 className="text-2xl font-bold">Dashboard Marketplace</h2>
            </div>
            <div className="flex gap-2">
              <span className="pill bg-emerald-100 text-emerald-700">
                Ready: hijau
              </span>
              <span className="pill bg-amber-100 text-amber-800">
                Disewakan: kuning
              </span>
            </div>
          </div>
          <p className="text-slate-200">
            Cek status barang siap sewa atau sedang dipinjam.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="card group flex h-full flex-col overflow-hidden border-white/10 bg-white/90 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div
                className="h-40 w-full"
                style={{ background: product.imageColor }}
              />
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {product.category}
                  </p>
                  <span
                    className={`pill ${product.status === "ready"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-800"
                      }`}
                  >
                    {product.status === "ready" ? "Siap" : "Disewakan"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {product.name}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between text-sm font-semibold text-slate-900">
                  <span>{formatIDR(product.pricePerDay)}/hari</span>
                  <span className="text-slate-500">{product.location}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="card border-white/10 bg-white/10 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-sky-100">
              Chat langsung
            </p>
            <h3 className="text-xl font-bold">Butuh bantuan? Mulai obrolan</h3>
            <p className="text-slate-200">
              Tim kami siap menjawab pertanyaan soal ketersediaan, harga, atau
              permintaan khusus.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="/messages" className="btn btn-primary">
              Buka Pesan
            </Link>
            <Link href="/login" className="btn btn-ghost border border-white/20">
              Login untuk menyewa
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
