import { getCartProducts } from "@/lib/cart";
import { Checkout } from "../../components/Checkout";
import { payCart } from "@/lib/actions/cart";

export default async function CheckoutPage() {
  const items = await getCartProducts()

  const checkoutItems: { name: string, price: number }[] = [];
  const rentedItems: typeof items = []

  for (const item of items) {
    if (item.product.status == "rented") {
      rentedItems.push(item)
      continue
    }

    checkoutItems.push({
      name: `${item.product.name} (50%)`,
      price: (item.durationDay * item.product.pricePerDay) / 2
    })

    if (item.needDeliver) {
      checkoutItems.push({ name: `${item.product.name} (Pengiriman)`, price: 25000 })
    }

    checkoutItems.push({ name: `${item.product.name} (Asuransi)`, price: 5000 })
  }

  if (rentedItems.length > 0) {
    return <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold">Ada Kesalahan</h1>
      </div>

      <div className="card flex flex-col gap-3 border-white/10 bg-white/90 p-4 text-slate-900">
        <h2 className="text-lg font-semibold text-slate-700">
          Terdapat Produk yang Masih Disewa
        </h2>
        {rentedItems.map(item =>
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-200" key={item.product.id}>
            <p className="text-sm font-semibold text-slate-900">{item.product.name}</p>
          </div>
        )}
      </div>
    </div>
  }
  return <Checkout items={checkoutItems} onSubmit={payCart} />
}

