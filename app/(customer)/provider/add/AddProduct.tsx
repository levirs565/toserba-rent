"use client";
import { addProduct } from "@/lib/actions/product";
import { useActionState } from "react";

export function AddProduct() {
  const [state, action, pending] = useActionState(addProduct, null)

  return <div className="card space-y-4 border-white/10 bg-white/10 p-6">
    <h2 className="text-lg font-semibold text-slate-700">
      Barang Baru
    </h2>
    <form
      className="space-y-3"
      action={action}
    >
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-500">
          Nama produk
        </label>
        <input
          name="name"
          defaultValue={state?.name}
          className="input bg-white/10 text-slate-700!"
          placeholder="Contoh: Kamera DSLR Pro"
        />
        {state?.errors.name && <p>{state.errors.name}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-500">
          Kategori
        </label>
        <input
          className="input bg-white/10 text-slate-700!"
          placeholder="Kamera, Audio, Fashion..."
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-500">
          Harga per hari
        </label>
        <input
          name="price"
          type="number"
          defaultValue={state?.price}
          className="input bg-white/10 text-slate-700!"
          placeholder="Contoh: 250000"
        />
      </div>
      {state?.errors.price && <p>{state.errors.price}</p>}
      <button className="btn btn-primary w-full" type="submit">
        Simpan produk
      </button>
    </form>
  </div>
}