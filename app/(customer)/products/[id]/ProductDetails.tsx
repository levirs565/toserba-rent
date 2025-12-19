"use client"

import { formatIDR, Product } from "@/app/lib/products";
import { calculatePrice } from "@/app/lib/utils";
import { addCart } from "@/lib/actions/cart";
import Link from "next/link";
import { startTransition, useActionState, useState } from "react";

const durations = [1, 3, 5, 7, 14];


export function ProductDetails({ product, inCart, userId, isLogged, addresses }: { product: Product, inCart: boolean, userId: string, isLogged: boolean, addresses: { id: string, name: string, address: string }[] | null }) {
  const [cartState, cartAction, _cartPending] = useActionState(addCart, null)
  const [days, setDays] = useState(3);
  const [selectedAdress, setSelectedAddress] = useState(addresses?.at(0)?.id);
  const [delivery, setDelivery] = useState(false);

  const total = calculatePrice(product.pricePerDay, days, delivery);

  function createCheckoutParams() {
    const params = new URLSearchParams()
    params.set("durationDays", String(days))
    params.set("needDeliver", String(delivery))
    if (selectedAdress)
      params.set("address", selectedAdress)
    return params.toString()
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card overflow-hidden border-white/10 bg-white/90">
        <div className="relative h-72">
          <img src={`/api/get-product-image/${product.id}`} className="w-full h-full object-cover" />
          <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold capitalize text-white">
            {product.category}
          </span>
        </div>
        <div className="space-y-4 p-5 text-slate-900">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {product.name}
              </h1>
              <p className="text-slate-500">{product.address?.address}</p>
            </div>
            <span
              className={`pill ${product.status === "ready"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
                }`}
            >
              {product.status === "ready" ? "Tersedia" : "Disewakan"}
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
                {(!addresses || addresses.length == 0) &&
                  <p className="text-slate-500">
                    Fitur ini hanya tersedia setelah menambahkan alamat di profil
                  </p>
                }
              </div>
              {addresses && addresses.length > 0 &&
                <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-800">
                  <input
                    type="checkbox"
                    className="h-4 w-4"
                    checked={delivery}
                    onChange={(e) => setDelivery(e.target.checked)}
                  />
                  Perlu antar
                </label>
              }
            </div>
            {delivery && addresses && addresses.length > 0 && (
              <select className="w-full" value={selectedAdress} onChange={(e) => setSelectedAddress(e.currentTarget.value)}>
                {addresses.map((address) => <option key={address.id} value={address.id}>{address.name} ({address.address})</option>)}
              </select>
            )}
          </div>
          <Link href={`/messages/${userId}`} className="btn btn-primary text-center space-y-3">Chat Pemilik</Link>

        </div>
      </div>

      <div className="card h-fit space-y-4 border-white/10 bg-white/90 p-5 text-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Ringkasan Sewa
          </h2>
          {isLogged &&
            <Link href="/cart" className="text-sm font-semibold text-sky-600">
              Lihat keranjang
            </Link>}
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

        {isLogged &&
          <div className="flex flex-col gap-3">
            {!(cartState?.success || inCart) &&
              <>
                <button
                  onClick={() => startTransition(() => cartAction({ id: product.id, durationDay: days, needDeliver: delivery, address: selectedAdress }))}
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

            {product.status == "ready" &&
              <Link
                href={`/products/${product.id}/checkout?` + createCheckoutParams()}
                className="btn w-full bg-slate-900 text-center text-white! hover:bg-slate-800"
              >
                Sewa Sekarang
              </Link>}
          </div>}
        {!isLogged && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Login untuk Menyewa
        </div>}
      </div>

      <div className="card h-fit space-y-4 border-white/10 bg-white/90 p-5 text-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Review
          </h2>
        </div>

        {product.reviews.map((review) => <div className="rounded-xl bg-slate-50 p-3 border border-slate-200" key={review.id}>
          <p className="text-sm font-semibold text-slate-900">{review.user.name}</p>
          <p className="text-sm text-slate-500">
            {review.content}
          </p>
        </div>)}
        {product.reviews.length == 0 &&
          <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
            <p className="text-sm font-semibold text-slate-900">
              Belum Ada Review
            </p>
          </div>}

      </div>
    </div>
  );
}