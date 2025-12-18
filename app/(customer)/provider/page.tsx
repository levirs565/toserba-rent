import { getUserProducts } from "@/lib/products";
import { formatIDR } from "@/app/lib/products";
import Link from "next/link";

export default async function ProviderPage() {
  const products = await getUserProducts();

  return <div className="space-y-6 text-white">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold">
          Kelola Barang
        </h1>
      </div>
    </div>

    <div className="card space-y-4 border-white/10 bg-white/90 p-6 text-slate-900">
      <h2 className="text-lg font-semibold text-slate-900">
        Barang
      </h2>
      <div className="grid gap-3">
        {products.map((item) => (
          <Link
          href={`/provider/${item.id}`}
            key={item.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
          >
            <div>
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-slate-600">
                <span className="capitalize">{item.category}</span> · {formatIDR(item.pricePerDay)}/hari
              </p>
            </div>
            {
              (item.requestCount > 0 || item.returnRequestCount > 0) &&
              <span
                className={`pill bg-amber-100 text-amber-700`}
              >
                {[item.requestCount > 0 && "Ada Permintaan Penyewaan", 
                  item.returnRequestCount && "Ada Permintaan Pengembalian"].filter(it => it).join(" dan ")}
              </span>
            }
          </Link>
        ))}
      </div>
      <Link href="/provider/add" className="block btn flex-grow btn-primary text-center">
        Tambah Barang
      </Link>
    </div>
  </div>
}
