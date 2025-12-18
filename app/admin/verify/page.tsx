import { getVerificationRequstList } from "@/lib/user";
import Link from "next/link";

export default async function AdminVerifyPage() {
  const users = await getVerificationRequstList();

  return (
    <div className="space-y-6 text-white">
      <h1 className="text-3xl font-bold">Verifikasi Identitas Pengguna</h1>

      {users.map((user) =>
        <Link
          href={`/admin/verify/${user.id}`}
          key={user.id}
          className="card flex flex-col gap-3 border-white/10 bg-white/90 p-4 text-slate-900 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex items-center gap-3">
            <div>
              <p className="text-lg font-semibold text-slate-900">
                {user.name}
              </p>
              <p className="text-sm text-slate-600">{user.email} - {user.phone}</p>
            </div>
          </div>
        </Link>
      )}

      {users.length == 0 && <div className="card flex flex-col gap-3 border-white/10 bg-white/90 p-4 text-slate-900 md:flex-row md:items-center md:justify-between">Belum Ada Permintaan Verifikasi</div>}
    </div>
  );
}

