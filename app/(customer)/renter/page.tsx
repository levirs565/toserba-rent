import Link from "next/link";
import { getUserRents } from "@/lib/rent";
import { returnRent } from "@/lib/actions/rent";

export default async function ProviderPage() {
  const rents = await getUserRents();

  return <div className="space-y-6 text-white">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold">
          Barang Sewaan
        </h1>
      </div>
    </div>

    <div className="card space-y-4 border-white/10 bg-white/90 p-6 text-slate-900">
      <h2 className="text-lg font-semibold text-slate-900">
        Barang
      </h2>
      <div className="grid gap-3">
        {rents.map((rent) => (
          <div
            key={rent.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
          >
            <div>
              <p className="font-semibold text-slate-900">{rent.product.name}</p>
              <p className="text-slate-600">
                {rent.startDate?.toISOString().split('T')[0] ?? "."} - {rent.durationDay} hari
              </p>

              <form className="mt-2 flex flex-row gap-3">
                <Link href={`/products/${rent.product.id}`} className="block btn flex-grow btn-primary text-center">Lihat Poduk</Link>
                <Link href={`/messages/${rent.product.userId}`} className="block btn flex-grow btn-primary text-center">Chat Pemilik</Link>
                {((!rent.rentReturn?.requestState && rent.requestState == "ACCEPTED") || (rent.rentReturn?.requestState == "REJECTED")) && <button formAction={returnRent.bind(null, rent.id)} className="btn btn-primary text-center">
                  Kembalikan
                </button>}
                {(rent.rentReturn?.requestState == "ACCEPTED" && !rent.rentReturn.paymentId) && <Link href={`/renter/${rent.id}/pay-return`} className="block btn btn-primary text-center">
                  Bayar Pengembalian
                </Link>}
              </form>
            </div>
            <span
              className={`pill bg-amber-100 text-amber-700`}
            >
              {rent.rentReturn?.paymentId ? "Pengembalian Selesai" :
                rent.rentReturn?.requestState == "ACCEPTED" ? "Pengembalian Diterima"
                  : rent.rentReturn?.requestState == "REJECTED" ? "Pengembalian Diotal"
                    : rent.rentReturn?.requestState == "PENDING" ? "Menunggu Konfirmasi Pengembalian"
                      : rent.requestState == "ACCEPTED" ? "Sewa Diterima"
                        : rent.requestState == "PENDING" ? "Menunggu Konfirmas Sewa"
                          : "Sewa Ditolak"}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
}
