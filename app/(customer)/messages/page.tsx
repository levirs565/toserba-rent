import { getChatPartners } from "@/lib/chat";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";

export default async function MessagesPage() {
  if (!(await getSession()).userId) return notFound();

  return <div className="card space-y-4 border-white/10 bg-white/90 p-6 text-slate-900 flex items-center justify-center h-72">
    <h2 className="text-lg">Pilih Pengguna di Kiri</h2>
  </div>
}

