"use client"

import Link from "next/link"
import { formatIDR } from "../../lib/products";
import { startTransition, useActionState } from "react";
import { payCart, payProduct } from "@/lib/actions/cart";


const paymentOptions = [
  "Transfer Bank (BCA, Mandiri, BNI)",
  "Kartu Kredit/Debit",
  "E-Wallet (OVO, GoPay, Dana)",
  "Virtual Account",
  "QRIS",
];

export function Checkout({ items, onSubmit }: {
  onSubmit: () => void,
  items: { name: string, price: number }[]
}) {
  return <form action={onSubmit} className="space-y-6 text-white">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-sky-100">
          Pembayaran
        </p>
        <h1 className="text-3xl font-bold">Selesaikan pembayaran</h1>
        <p className="text-slate-200">
          Pilih metode pembayaran favorit, lihat total harga, dan konfirmasi.
        </p>
      </div>
      <Link href="/cart" className="btn btn-ghost border border-white/20">
        Kembali ke Keranjang
      </Link>
    </div>

    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="card space-y-4 border-white/10 bg-white/10 p-6">
        <h2 className="text-lg font-semibold text-slate-500">
          Opsi Pembayaran
        </h2>
        <div className="grid gap-3">
          {paymentOptions.map((option) => (
            <label
              key={option}
              className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-700 hover:border-white/30"
            >
              <input type="radio" name="payment" className="h-4 w-4" />
              {option}
            </label>
          ))}
        </div>
      </div>

      <div className="card h-fit space-y-4 border-white/10 bg-white/90 p-6 text-slate-900">
        <h2 className="text-lg font-semibold text-slate-900">
          Ringkasan Harga
        </h2>
        <div className="space-y-2 text-sm text-slate-700">
          {items.map(item =>
            <div className="flex items-center justify-between" key={item.name}>
              <span>{item.name}</span>
              <span>{formatIDR(item.price)}</span>
            </div>
          )}
          <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
            <span>Total</span>
            <span>{formatIDR(items.reduce((prev, item) => prev + item.price, 0))}</span>
          </div>
        </div>
        <button className="btn btn-primary w-full text-center">
          Bayar Sekarang
        </button>
        <p className="text-sm text-slate-600">
          Setelah pembayaran selesai, status pemesanan akan muncul pada cart
          Anda.
        </p>
      </div>
    </div>
  </form >
}