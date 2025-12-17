'use client'

import { register } from "@/lib/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, null)

  return (
    <div className="mx-auto max-w-2xl space-y-6 text-white">
      <div className="text-center space-y-1">
        <p className="text-sm uppercase tracking-[0.2em] text-sky-100">
          Toserba Rent
        </p>
        <h1 className="text-3xl font-bold">Daftar akun baru</h1>
        <p className="text-slate-200">
          Buat akun untuk mulai menyewa atau menjadi penyedia barang.
        </p>
      </div>

      <div className="card border-white/10 bg-white/10 p-6 text-slate-50 space-y-4">
        <form className="space-y-4" action={action}>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nama lengkap
              </label>
              <input
                name="name"
                className="input bg-white/10 text-slate-800!"
                defaultValue={state?.name}
                placeholder="Nama sesuai KTP"
              />
               {state?.errors?.name && <p>{state.errors.name.join(". ")}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Nomor HP
              </label>
              <input
                name="phone"
                className="input bg-white/10 text-slate-800!"
                defaultValue={state?.phone}
                placeholder="08xxxxxxxxxx"
              />
              {state?.errors?.phone && <p>{state.errors.phone.join(". ")}</p>}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="input bg-white/10 text-slate-800!"
              defaultValue={state?.email}
              placeholder="nama@email.com"
            />
            {state?.errors?.email && <p>{state.errors.email.join(". ")}</p>}
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                className="input bg-white/10 text-slate-800!"
                defaultValue={state?.password}
                placeholder="••••••••"
              />
              {state?.errors?.password && <p>{state.errors.password.join(". ")}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="passwordRepeat"
                className="input bg-white/10 text-slate-800!"
                 defaultValue={state?.passwordRepeat}
                placeholder="Ulangi password"
              />
              {state?.errors?.passwordRepeat && <p>{state.errors.passwordRepeat.join(". ")}</p>}
            </div>
          </div>
           {state?.globalError && <p>{state.globalError}</p>}
          <button type="submit" className="btn btn-primary w-full">
            Daftar
          </button>
        </form>
        <p className="text-center text-sm text-slate-500">
          Sudah punya akun?{" "}
          <Link href="/login" className="font-semibold text-sky-500">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}

