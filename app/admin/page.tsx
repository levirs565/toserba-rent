import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="space-y-6 text-white">
      <h1 className="text-3xl font-bold">Admin</h1>

      <Link href="/admin/verify" className="block card space-y-4 border-white/10 bg-white/10 p-6">
        <h2 className="text-lg font-semibold text-slate-700">
          Verifikasi Identitas Pengguna
        </h2>
      </Link> 
    </div>
  );
}

