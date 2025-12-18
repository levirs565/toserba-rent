import { getUserProducts } from "@/lib/products";
import { formatIDR } from "@/app/lib/products";
import { AddProduct } from "./AddProduct";

export default async function ProviderPage() {
  const products = await getUserProducts();

  return <div className="space-y-6 text-white">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-sky-100">
          Penyedia Barang
        </p>
        <h1 className="text-3xl font-bold">
          Kelola barang yang ingin disewakan
        </h1>
        <p className="text-slate-200">
          Atur harga, status, dan tambahkan produk baru.
        </p>
      </div>
      <span className="pill bg-emerald-100 text-emerald-700">
        Dashboard penyedia
      </span>
    </div>

    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="card space-y-4 border-white/10 bg-white/90 p-6 text-slate-900">
        <h2 className="text-lg font-semibold text-slate-900">
          Barang aktif
        </h2>
        <div className="grid gap-3">
          {products.slice(0, 4).map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
            >
              <div>
                <p className="font-semibold text-slate-900">{item.name}</p>
                <p className="text-slate-600">
                  {item.category} · {formatIDR(item.pricePerDay)}/hari
                </p>
              </div>
              <span
                className={`pill ${item.status === "ready"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
                  }`}
              >
                {item.status === "ready" ? "Siap" : "Disewakan"}
              </span>
            </div>
          ))}
        </div>
      </div>

      <AddProduct />
    </div>
  </div>
}
