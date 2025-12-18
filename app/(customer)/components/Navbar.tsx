import Link from "next/link";
import { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth"

const navItems: { href: string; label: string }[] = [
  { href: "/", label: "Beranda" },
  { href: "/cart", label: "Keranjang" },
  { href: "/messages", label: "Pesan" },
  { href: "/provider", label: "Penyedia" },
  { href: "/renter", label: "Penyewa"}
];

function Icon({ children }: { children: ReactNode }) {
  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg text-white">
      {children}
    </span>
  );
}

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-[#0f1f38]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white">
            TR
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-sky-100">
              Toserba Rent
            </p>
            <p className="text-[12px] text-slate-300">Sewa mudah & elegan</p>
          </div>
        </Link>

        <form className="relative ml-auto hidden flex-1 items-center md:flex">
          <input
            type="search"
            placeholder="Cari kamera, alat musik, perabot..."
            className="input bg-white/10 pr-12 text-sm"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-200">
            ⌕
          </span>
        </form>

        <div className="flex items-center gap-3">
          {!user &&
            <Link href="/login" className="btn btn-ghost flex items-center gap-2">
              <Icon>👤</Icon>
              <span className="hidden text-sm font-semibold md:block">Login</span>
            </Link>}
          <Link href="/cart" className="btn btn-ghost flex items-center gap-2">
            <Icon>🛒</Icon>
            <span className="hidden text-sm font-semibold md:block">
              Keranjang
            </span>
          </Link>
          <Link href="/messages" className="btn btn-primary text-sm">
            Obrolan
          </Link>
          {user && <Link href="/user" className="flex items-center gap-2">
            <Icon>👤</Icon>
            <div className="flex flex-col">
              <span className="hidden text-sm font-semibold md:block">{user.name}</span>
              {user.verification != "ACCEPTED" &&
                <span className="hidden text-xs font-semibold md:block text-red-300">
                  {user.verification == "PENDING" ? "Menunggu Verifikasi Admin"
                    : user.verification == "REJECTED" ? "Identitas Ditolak"
                      : "Verifikasi Identitas Diperlukan"}</span>}
            </div>
          </Link>}
        </div>
      </div>

      <div className="mx-auto hidden max-w-6xl items-center gap-4 px-4 pb-3 text-sm font-medium text-slate-200 md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10"
          >
            {item.label}
          </Link>
        ))}
        <div className="ml-auto flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          Live chat siap membantu
        </div>
      </div>
    </header>
  );
}