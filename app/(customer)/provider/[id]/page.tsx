"use server";

import { getProduct, getProductWithRent } from "@/lib/products";
import { notFound } from "next/navigation";

import { formatIDR } from "@/app/lib/products";
import { setRentRequestResult, setRentReturnRequestResult } from "@/lib/actions/rent";
import { RequestState } from "@/app/generated/prisma/enums";
import Link from "next/link";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;
  const product = await getProductWithRent(productId)
  if (!product) return notFound();

  const activeRents = product.rents.filter(rent => rent.requestState == RequestState.ACCEPTED && !rent.rentReturn?.paymentId)
  const pendingRents = product.rents.filter(rent => rent.requestState == RequestState.PENDING)
  const inactiveRents = product.rents.filter(rent => rent.rentReturn?.paymentId || rent.requestState == RequestState.REJECTED)

  return <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
    <div className="card overflow-hidden border-white/10 bg-white/90">
      <div className="relative h-72">
        <img src={`/api/get-product-image/${product.id}`} className="w-full h-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-semibold capitalize text-white">
          {product.category}
        </span>
      </div>
      <div className="space-y-4 p-5 text-slate-900">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {product.name}
            </h1>
            <p className="text-slate-500">{product.address?.address}</p>
          </div>
        </div>
        <p className="text-slate-700">{product.description}</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-slate-700">
          <div className="rounded-xl bg-slate-50 p-3">
            <p className="text-slate-500">Harga</p>
            <p className="text-lg font-semibold text-slate-900">
              {formatIDR(product.pricePerDay)}/hari
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-3">
      <div className="card h-fit space-y-4 border-white/10 bg-white/90 p-5 text-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Sewa Aktif
          </h2>
        </div>
        {activeRents.map((rent) => <div className="rounded-xl bg-slate-50 p-3 border border-slate-200" key={rent.id}>
          <p className="text-sm font-semibold text-slate-900">{rent.user.name}</p>
          <p className="text-sm text-slate-500">
            {rent.startDate?.toISOString().split('T')[0] ?? "."} - {rent.durationDay} hari
          </p>
          <p className="text-sm text-slate-500">
            {rent.needDeliver ? `Perlu Dikirim ke ${rent.deliverAddress?.name} (${rent.deliverAddress?.address})` : "Diambil Sendiri"}
          </p>
          {rent.rentReturn?.requestState == "ACCEPTED" &&
            <span
              className={`mt-2 pill bg-amber-100 text-amber-700`}
            >Menunggu Pembayaran</span>}

          <form className="flex flex-row gap-3 mt-2">
            <Link href={`/messages/${rent.user.id}`} className="block btn flex-grow btn-primary text-center space-y-3">Chat Penyewa</Link>
            {rent.rentReturn?.requestState == "PENDING" && <>
              <button formAction={setRentReturnRequestResult.bind(null, rent.id, false)} className="btn flex-grow btn-ghost text-center text-red-500!">
                Tolak Pengembalian
              </button>
              <button formAction={setRentReturnRequestResult.bind(null, rent.id, true)} className="btn flex-grow btn-primary text-center">
                Terima Pengembalian
              </button></>
            }
          </form>
        </div>)}
        {activeRents.length == 0 && <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Belum Ada Sewa Aktif
          </p>
        </div>}
      </div>
      <div className="card h-fit space-y-4 border-white/10 bg-white/90 p-5 text-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Permintaan Sewa
          </h2>
        </div>

        {pendingRents.map((rent) => <div className="rounded-xl bg-slate-50 p-3 border border-slate-200" key={rent.id}>
          <p className="text-sm font-semibold text-slate-900">{rent.user.name}</p>
          <p className="text-sm text-slate-500">
            {rent.startDate?.toISOString().split('T')[0] ?? "."} - {rent.durationDay} hari
          </p>
          <p className="text-sm text-slate-500">
            {rent.needDeliver ? `Perlu Dikirim ke ${rent.deliverAddress?.name} (${rent.deliverAddress?.address})` : "Diambil Sendiri"}
          </p>
          <form className="flex flex-row gap-3 mt-2">
            <Link href={`/messages/${rent.user.id}`} className="block btn flex-grow btn-primary text-center space-y-3">Chat Penyewa</Link>
            <button formAction={setRentRequestResult.bind(null, rent.id, false)} className="btn flex-grow btn-ghost text-center text-red-500!">
              Tolak
            </button>
            <button formAction={setRentRequestResult.bind(null, rent.id, true)} className="btn flex-grow btn-primary text-center">
              Terima
            </button>
          </form>
        </div>)}

        {pendingRents.length == 0 && <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Belum Ada Permintaan
          </p>
        </div>}
      </div>

      <div className="card h-fit space-y-4 border-white/10 bg-white/90 p-5 text-slate-900">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            Sewa Inaktif
          </h2>
        </div>

        {inactiveRents.map((rent) => <div className="rounded-xl bg-slate-50 p-3 border border-slate-200" key={rent.id}>
          <p className="text-sm font-semibold text-slate-900">{rent.user.name}</p>
          <p className="text-sm text-slate-500">
            {rent.startDate?.toISOString().split('T')[0] ?? "."} - {rent.durationDay} hari
          </p>
          <p className="text-sm text-slate-500">
            {rent.needDeliver ? `Perlu Dikirim ke ${rent.deliverAddress?.name} (${rent.deliverAddress?.address})` : "Diambil Sendiri"}
          </p>
          <span
            className={`mt-2 pill bg-amber-100 text-amber-700`}
          >{rent.requestState == RequestState.REJECTED ? "Ditolak" : "Selesai"}</span>
          <form className="flex flex-row gap-3 mt-2">
            <Link href={`/messages/${rent.user.id}`} className="btn block flex-grow btn-primary text-center space-y-3">Chat Penyewa</Link>
          </form>
        </div>)}

        {inactiveRents.length == 0 && <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            Belum Ada Sewa Inaktif
          </p>
        </div>}
      </div>
    </div>

    <div className="card h-fit space-y-4 border-white/10 bg-white/90 p-5 text-slate-900">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Review
        </h2>
      </div>

      {product.reviews.map((review) => <div className="rounded-xl bg-slate-50 p-3 border border-slate-200" key={review.id}>
        <p className="text-sm font-semibold text-slate-900">{review.user.name}</p>
        <p className="text-sm text-slate-500">
          {review.content}
        </p>
      </div>)}
      {product.reviews.length == 0 &&
        <div className="rounded-xl bg-slate-50 p-3 border border-slate-200">
          <p className="text-sm font-semibold text-slate-900">
            Belum Ada Review
          </p>
        </div>}

    </div>
  </div>
}

