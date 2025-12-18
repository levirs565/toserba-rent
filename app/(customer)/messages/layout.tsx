import { getChatPartners } from "@/lib/chat";
import Link from "next/link";
import { ChatNav } from "./ChatNav";

export default async function MessagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const partners = await getChatPartners();

  return <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
    <div className="card space-y-4 border-white/10 bg-white/10 p-6 text-white">
      <h2 className="text-lg font-semibold">Percakapan</h2>
      <ChatNav partners={partners}/>
    </div>

    {children}
  </div>
}