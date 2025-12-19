"use client";
import { addProduct } from "@/lib/actions/product";
import { ChangeEvent, useActionState, useState } from "react";

const SIZE_LIMIT = 1024 * 1024;
function checkSizeLimit(event: ChangeEvent) {
  const element = event.currentTarget as HTMLInputElement
  if (element.files![0].size > SIZE_LIMIT) {
    alert("File is too big")
    element.value = ""
  }
}

export function AddProduct({ addresses }: { addresses: { id: string, name: string, address: string }[] }) {
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
          minLength={4}
          required
        />
        {state?.errors.name && <p>{state.errors.name}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-500">
          Kategori
        </label>
        <input
          name="category"
          className="input bg-white/10 text-slate-700!"
          defaultValue={state?.category}
          placeholder="Kamera, Audio, Fashion..."
          minLength={4}
          required
        />
        {state?.errors.category && <p>{state.errors.category}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-500">
          Deskripsi
        </label>
        <textarea
          name="description"
          className="input bg-white/10 text-slate-700!"
          defaultValue={state?.description}
          minLength={10}
          required
        />
        {state?.errors.description && <p>{state.errors.description}</p>}
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
          required
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-500">
          Gambar Produk
          <input
            name="image"
            type="file"
            accept="image/*"
            className="input bg-white/10 text-slate-700!"
            onChange={checkSizeLimit}
            required
          />
        </label>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-500">
          Alamat Produk (Tambah di Profil Jika Kosong)
        </label>
        <select name="address" className="w-full" required>
          {addresses.map((address) => <option key={address.id} value={address.id}>{address.name} ({address.address})</option>)}
        </select>
      </div>
      {state?.errors.price && <p>{state.errors.price}</p>}
      <button className="btn btn-primary w-full" type="submit">
        Simpan produk
      </button>
    </form>
  </div>
}