import { Checkout } from "@/app/(customer)/components/Checkout";
import { payProduct } from "@/lib/actions/cart";
import { getProduct } from "@/lib/products";
import { getSession } from "@/lib/session";
import { SearchParams } from "next/dist/server/request/search-params";
import { notFound } from "next/navigation";

export default async function ProductCheckoutPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>
}) {
  if (!(await getSession()).userId) return notFound();

  const id = (await params).id
  const product = await getProduct(id)
  if (!product) return notFound();
  const urlParams = await searchParams;
  if (!urlParams) return notFound()
  const durationDays = parseInt(String(urlParams["durationDays"]))
  if (isNaN(durationDays)) return notFound()
  const needDeliver = String(urlParams["needDeliver"]) == String(true);
  const address = urlParams["address"]

  if (typeof address == "object") return notFound();

  const items = [{
    name: `${product.name} (50%)`,
    price: (durationDays * product.pricePerDay) / 2
  }]

  if (needDeliver) {
    items.push({ name: `${product.name} (Pengiriman)`, price: 25000 })
  }

  items.push({ name: `${product.name} (Asuransi)`, price: 5000 })

  if (product.status == "rented") {
    return <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold">Ada Kesalahan</h1>
      </div>

      <div className="card flex flex-col gap-3 border-white/10 bg-white/90 p-4 text-slate-900">
        <h2 className="text-lg font-semibold text-slate-700">
          Terdapat Produk yang Masih Disewa
        </h2>
        <div className="rounded-xl bg-slate-50 p-3 border border-slate-200" key={product.id}>
          <p className="text-sm font-semibold text-slate-900">{product.name}</p>
        </div>
      </div>
    </div>
  }
  return <Checkout items={items} onSubmit={payProduct.bind(null, { id, durationDay: durationDays, needDeliver, address })} />
}