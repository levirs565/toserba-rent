import Link from "next/link";
import { formatIDR } from "../../lib/products";
import { getCartProducts } from "@/lib/cart";
import { calculatePrice } from "../../lib/utils";
import { removeCart } from "@/lib/actions/cart";
import { notFound } from "next/navigation";

export default async function CartPage() {
  const cartItems = await getCartProducts();

  if (cartItems == null) return notFound();

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
              <div>
                <p className="text-lg font-semibold text-slate-900 mb-2">
                  {item.product.name}
                </p>
                <p className="text-sm text-slate-600">
                  <span
                    className={`pill mr-2 ${item.product.status === "ready"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-800"
                      }`}
                  >
                    {item.product.status === "ready" ? "Tersedia " : "Disewakan "}
                  </span>
                  <span className="capitalize">{item.product.category}</span>
                </p>
              </div>
            </div>
            <form className="flex flex-row gap-3 items-center">
              <div className="text-right text-sm text-slate-800">
                <p className="font-semibold">{formatIDR(calculatePrice(item.product.pricePerDay, item.durationDay, item.needDeliver))}</p>
              </div>
              <button formAction={removeCart.bind(null, item.id)} className="btn btn-primary text-center">Hapus</button>
            </form>
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

