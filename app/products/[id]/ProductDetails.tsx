"use client"

import { formatIDR, Product } from "@/app/lib/products";
import { calculatePrice } from "@/app/lib/utils";
import { addCart } from "@/lib/actions/cart";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";

const durations = [1, 3, 5, 7, 14];


export function ProductDetails({ product, inCart }: { product: Product, inCart: boolean }) {
  const [cartState, cartAction, _cartPending] = useActionState(addCart, null)
  const [days, setDays] = useState(3);
  const [delivery, setDelivery] = useState(false);

  const total = calculatePrice(product.pricePerDay, days, delivery);

  function createCheckoutParams() {
    const params = new URLSearchParams()
    params.set("durationDays", String(days))
    params.set("needDeliver", String(delivery))
    return params.toString()
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card overflow-hidden border-white/10 bg-white/90">
        <div className="relative h-72" style={{ background: product.imageColor }}>
          <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold uppercase text-white">
            {product.category}
          </span>
        </div>
        <div className="space-y-4 p-5 text-slate-900">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {product.name}
              </h1>
              <p className="text-slate-500">{product.location}</p>
            </div>
            <span
              className={`pill ${product.status === "ready"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
                }`}
            >
              {product.status === "ready" ? "Siap" : "Disewakan"}
            </span>
          </div>
          <p className="text-slate-700">{product.description}</p>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-slate-500">Harga</p>
              <p className="text-lg font-semibold text-slate-900">
                {formatIDR(product.pricePerDay)}/hari
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-slate-500">Durasi sewa</p>
              <p className="text-lg font-semibold text-slate-900">
                {days} hari
              </p>
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-slate-800">
              Pilih durasi sewa
            </p>
            <div className="flex flex-wrap gap-2">
              {durations.map((day) => (
                <button
                  key={day}
                  onClick={() => setDays(day)}
                  className={`btn ${day === days
                    ? "btn-primary"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-200"
                    }`}
                >
                  {day} hari
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-3 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Pilih alamat antar
                </p>
                <p className="text-slate-500">
                  Klik untuk menampilkan peta & pilih titik antar
                </p>
              </div>
              <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-800">
                <input
                  type="checkbox"
                  className="h-4 w-4"
                  checked={delivery}
                  onChange={(e) => setDelivery(e.target.checked)}
                />
                Perlu antar
              </label>
            </div>
            {delivery && (
              <div className="space-y-2">
                <div className="h-52 overflow-hidden rounded-lg border border-slate-200">
                  <iframe
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.706108873379!2d106.81928967576874!3d-6.174465893819702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e67cd68e99%3A0xa37210203a8a14!2sMonas!5e0!3m2!1sid!2sid!4v1715176400000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ border: 0 }}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Pilih titik pada peta untuk alamat antar favorit Anda.
                  Biaya antar ditambahkan ke total.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="card h-fit space-y-4 border-white/10 bg-white/90 p-5 text-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Ringkasan Sewa
          </h2>
          <Link href="/cart" className="text-sm font-semibold text-sky-600">
            Lihat keranjang
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <div className="flex items-center justify-between text-sm text-slate-700">
            <span>Harga per hari</span>
            <span>{formatIDR(product.pricePerDay)}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-700">
            <span>Durasi</span>
            <span>{days} hari</span>
          </div>
          <div className="flex items-center justify-between text-sm text-slate-700">
            <span>Biaya antar</span>
            <span>{delivery ? formatIDR(25000) : "-"}</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
            <span>Total</span>
            <span>{formatIDR(total)}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {!(cartState?.success || inCart) &&
            <>
              <button
                onClick={() => startTransition(() => cartAction({ id: product.id, durationDay: days, needDeliver: delivery }))}
                className="btn btn-primary w-full text-center"
              >
                Add to Cart
              </button>
            </>
          }

          {(cartState?.success || inCart) && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Telah ditambahkan ke Keranjang
            </div>
          )}

          <Link
            href={`/products/${product.id}/checkout?` + createCheckoutParams()}
            className="btn w-full bg-slate-900 text-center text-white hover:bg-slate-800"
          >
            Sewa Sekarang
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-semibold text-slate-900">Catatan:</p>
          <ul className="mt-2 list-disc space-y-1 pl-4">
            <li>Ketersediaan real-time, status hijau siap disewa.</li>
            <li>Durasi bisa diatur, harga otomatis terhitung.</li>
            <li>Opsional alamat antar dengan peta untuk titik kirim.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}