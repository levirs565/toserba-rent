import { addChat } from "@/lib/actions/chat";
import { getChatParnerData, getChatPartners } from "@/lib/chat";
import { notFound } from "next/navigation";

export default async function MessagesPage(
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const data = await getChatParnerData(id);

  if (!data) return notFound();

  return <div className="card space-y-4 border-white/10 bg-white/90 p-6 text-slate-900" style={{
    minHeight: "calc(100vh - 192px)"
  }}>
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-slate-900">
          {data.user.name}
        </h2>
      </div>
    </div>
    <div className="h-64 space-y-2 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 flex flex-col">
      {data.messages.map((message) => <div className="flex flex-col gap-1" key={message.id}>
        <div className={`w-fit rounded-lg bg-slate-200 px-3 py-2 ${message.isCurrentUser ? "self-start" : "self-end"}`}>
          {message.message}
        </div>
      </div>)}

    </div>
    <form
      className="flex gap-3"
      action={addChat.bind(null, id)}
    >
      <input
        name="message"
        className="input flex-1 bg-white/60 text-slate-900!"
        required
      />
      <button className="btn btn-primary" type="submit">
        Kirim
      </button>
    </form>
  </div>
}

