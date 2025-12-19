import { VerificationState } from "@/app/generated/prisma/enums";
import { logout } from "@/lib/actions/auth";
import { getCurrentUser, getCurrentUserProfile } from "@/lib/user";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use } from "react";

const statusMap: Record<VerificationState, String> = {
  ACCEPTED: "Diterima",
  PENDING: "Menunggu Peresetujuan",
  REJECTED: "Ditolak"
}

export default async function UserInfoPage() {
  const user = await getCurrentUserProfile();

  if (!user) return notFound();

  const fields = Object.entries({
    "Email": user.email,
    "Nomor Telepon": user.phone,
    "Tempat/Tanggal Lahir": `${user.birthPlace ?? "-"}, ${user.birthDate?.toISOString().split('T')[0] ?? "-"}`,
    "Status Verifikasi": user.verificationStateChangedTime ? statusMap[user.verificationState] : "Belum Mengirim Identitas"
  })

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold">Profil Pengguna</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="card space-y-3 border-white/10 bg-white/10 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Detail Akun</h2>
          {fields.map(([key, value]) => <div className="rounded-xl bg-slate-50 p-3 border border-slate-200" key={key}>
            <p className="text-sm text-slate-500">{key}</p>
            <p className="text-sm font-semibold text-slate-900">
              {value}
            </p>
          </div>)}

          {user.verificationState != "ACCEPTED" && <Link href="/verify" className="block btn flex-grow btn-primary text-center">
            Halaman Verifikasi Identitas
          </Link>}
          <form className="flex-grow">
            <button formAction={logout} className="block w-full btn btn-primary text-center">Logout</button>
          </form>
        </div>

        <div className="card space-y-3 border-white/10 bg-white/90 p-6 text-slate-900">
          <h2 className="text-lg font-semibold text-slate-900">
            Alamat
          </h2>

          {user.addresses.map((address) => <div className="rounded-xl bg-slate-50 p-3 border border-slate-200" key={address.id}>
            <p className="text-sm font-semibold text-slate-900">{address.name}</p>
            <p className="text-sm text-slate-500">
              {address.address}
            </p>
          </div>)}
          {user.addresses.length == 0 &&
            <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
              <p className="text-sm font-semibold text-slate-900">
                Belum Ada Alamat
              </p>
            </div>}

          <Link href="/user/address/add" className="block btn flex-grow btn-primary text-center">
            Tambah Alamat
          </Link>
        </div>
      </div>
    </div>
  );
}

