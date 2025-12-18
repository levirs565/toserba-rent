import Link from "next/link";
import { formatIDR } from "../../lib/products";
import { getCartProducts } from "@/lib/cart";
import { calculatePrice } from "../../lib/utils";

export default async function CartPage() {
  const cartItems = await getCartProducts();

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Keranjang</h1>
        </div>
        {cartItems.length > 0 &&
          <Link href="/cart/checkout" className="btn btn-primary">
            Lanjut ke Pembayaran
          </Link>
        }
      </div>

      <div className="grid gap-4">
        {cartItems.map((item) => (
          <div
            key={item.product.id}
            className="card flex flex-col gap-3 border-white/10 bg-white/90 p-4 text-slate-900 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-14 w-14 rounded-xl"
              />
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  {item.product.name}
                </p>
                <p className="text-sm text-slate-600">{item.product.category}</p>
              </div>
            </div>
            <div className="text-right text-sm text-slate-800">
              <p className="font-semibold">{formatIDR(calculatePrice(item.product.pricePerDay, item.durationDay, item.needDeliver))}</p>
            </div>
          </div>
        ))}
        {cartItems.length == 0 && <div
          className="card flex flex-col gap-3 border-white/10 bg-white/90 p-4 text-slate-900 md:flex-row items-center justify-center"
        >
          <p className="text-lg font-semibold text-slate-900">
            Keranjang Kosong
          </p>
        </div>}
      </div>
    </div>
  );
}

