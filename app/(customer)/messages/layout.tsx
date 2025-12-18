import { getChatPartners } from "@/lib/chat";
import Link from "next/link";

export default async function MessagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const partners = await getChatPartners();

  return <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
    <div className="card space-y-4 border-white/10 bg-white/10 p-6 text-white">
      <h2 className="text-lg font-semibold">Percakapan</h2>
      <div className="space-y-3">
        {partners.map((partner) => (
          <Link
          href={`/messages/${partner.id}`}
            key={partner.id}
            className="rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <div className="flex items-center justify-between text-sm">
              <p className="font-semibold">{partner.name}</p>
              {/* <span className="text-slate-200">{chat.time}</span> */}
            </div>
            {/* <p className="text-sm text-slate-200">{chat.preview}</p> */}
          </Link>
        ))}
      </div>
    </div>

    {children}
  </div>
}