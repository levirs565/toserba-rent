"use server";
import { setVerificationState } from "@/lib/actions/verify";
import { getUser } from "@/lib/user";
import { notFound } from "next/navigation";
export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;
  const user = await getUser(userId)
  if (!user || !user.verificationStateChangedTime || user.verificationState != "PENDING") return notFound();

  const fields = Object.entries({
    "Email": user.email,
    "Nomor Telepon": user.phone,
    "NIK": user.nik,
    "Tempat/Tanggal Lahir": `${user.birthPlace}, ${user.birthDate}`
  })

  return <div className="space-y-6 text-white">
    <h1 className="text-3xl font-bold">Verifikasi Identitas Pengguna</h1>

    <div className="card space-y-4 border-white/10 bg-white/10 p-6">
      <h2 className="text-lg font-semibold text-slate-700">
        {user.name}
      </h2>

      <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
        {fields.map(([key, value]) => <div className="rounded-xl bg-slate-50 p-3" key={key}>
          <p className="text-slate-500">{key}</p>
          <p className="text-lg font-semibold text-slate-900">
            {value}
          </p>
        </div>)}
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Foto KTP</p>
          <img className="mt-2" src={`/api/admin/user-identity/${userId}/ktp`} />
        </div>
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Foto Selfie</p>
          <img className="mt-2" src={`/api/admin/user-identity/${userId}/selfie`} />
        </div>
      </div>

      <form className="flex flex-row gap-3">
        <button formAction={setVerificationState.bind(null, userId, "reject")} className="btn flex-grow btn-ghost text-center text-red-500!">
          Tolak
          </button>
        <button formAction={setVerificationState.bind(null, userId, "accept")} className="btn flex-grow btn-primary text-center">
          Setujui
        </button>
      </form>
    </div>
  </div>
}

