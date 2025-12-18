"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function ChatNav({
  partners
}: {
  partners: { id: string, name: string }[]
}) {
const path = usePathname();

  return <div className="space-y-3">
    {partners.map((partner) => (
      <Link
        href={`/messages/${partner.id}`}
        key={partner.id}
        className={`block p-3 rounded-xl border border-slate-200 ${path == `/messages/${partner.id}` ? "bg-sky-100" : "bg-slate-50"}`}
      >
        <div className="flex items-center justify-between text-sm">
          <p className="font-semibold">{partner.name}</p>
          {/* <span className="text-slate-200">{chat.time}</span> */}
        </div>
        {/* <p className="text-sm text-slate-200">{chat.preview}</p> */}
      </Link>
    ))}
  </div>
}