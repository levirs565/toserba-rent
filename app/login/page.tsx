'use client'

import { login } from "@/lib/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, null)
  return (
    <div className="mx-auto max-w-xl space-y-6 text-white">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-sky-100">
          Toserba Rent
        </p>
        <h1 className="text-3xl font-bold">Masuk ke akun Anda</h1>
        <p className="text-slate-200">
          Tampilan elegan minimalis dengan nuansa navy blue.
        </p>
      </div>

      <div className="card border-white/10 bg-white/10 p-6 text-slate-50">
        <form className="space-y-4" action={action}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="nama@email.com"
              className="input bg-white/10 text-slate-700!"
              defaultValue={state?.email}
            />
            {state?.errors?.email && <p>{state.errors.email.join(". ")}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="input bg-white/10 text-slate-700!"
              defaultValue={state?.password}
            />
            {state?.errors?.password && <p>{state.errors.password.join(". ")}</p>}
          </div>
          {state?.globalError && <p>{state.globalError}</p>}
          <button type="submit" className="btn btn-primary w-full">
            Masuk
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-slate-200">
          Belum punya akun?{" "}
          <Link href="/register" className="font-semibold text-sky-100">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}

