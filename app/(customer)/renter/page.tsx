import { getUserProducts } from "@/lib/products";
import { formatIDR } from "@/app/lib/products";
import Link from "next/link";
import { getUserRents } from "@/lib/rent";

export default async function ProviderPage() {
  const rents = await getUserRents();

  return <div className="space-y-6 text-white">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold">
          Barang Sewaan
        </h1>
      </div>
    </div>

    <div className="card space-y-4 border-white/10 bg-white/90 p-6 text-slate-900">
      <h2 className="text-lg font-semibold text-slate-900">
        Barang
      </h2>
      <div className="grid gap-3">
        {rents.map((rent) => (
          <Link
            href={`/renter/${rent.id}`}
            key={rent.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
          >
            <div>
              <p className="font-semibold text-slate-900">{rent.product.name}</p>
              <p className="text-slate-600">
                {rent.startDate?.toISOString().split('T')[0] ?? "."} - {rent.durationDay} hari
              </p>
            </div>
            <span
              className={`pill bg-amber-100 text-amber-700`}
            >
              {rent.requestState == "ACCEPTED" ? "Diterima" : rent.requestState == "PENDING" ? "Menunggu Konfirmasi" : "Ditolak"}
            </span>
          </Link>
        ))}
      </div>
    </div>
  </div>
}
