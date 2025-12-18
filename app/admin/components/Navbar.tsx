import Link from "next/link";
import { ReactNode } from "react";
import { getCurrentUser } from "@/lib/auth"

const navItems: { href: string; label: string }[] = [
  { href: "/", label: "Beranda" },
  { href: "/cart", label: "Keranjang" },
  { href: "/messages", label: "Pesan" },
  { href: "/provider", label: "Penyedia" },
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

        <div className="flex-grow"/>

        <div className="flex items-center gap-3">
          {user && <div className="flex items-center gap-2">
            <Icon>👤</Icon>
            <span className="hidden text-sm font-semibold md:block">{user.name}</span>
          </div>}
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
      </div>
    </header>
  );
}