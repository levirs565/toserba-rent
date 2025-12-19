"use client"

import { useSearchParams } from "next/navigation"

export function SearchForm() {
  const params = useSearchParams()
  return <form className="relative ml-auto hidden flex-1 items-center md:flex" action="/" method="GET">
    {params.has("category") && <input key={params.get("category")} type="hidden" name="category" value={params.get("category") as string} />}
    <input
      name="q"
      type="search"
      placeholder="Cari kamera, alat musik, perabot..."
      className="input bg-white/10 pr-12 text-sm"
    />
    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-200">
      ⌕
    </span>
  </form>
}