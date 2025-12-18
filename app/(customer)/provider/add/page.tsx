import { getUserProducts } from "@/lib/products";
import { formatIDR } from "@/app/lib/products";
import { AddProduct } from "./AddProduct";

export default async function ProviderPage() {
  return <div className="space-y-6 text-white">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-3xl font-bold">
          Tambah Barang
        </h1>
      </div>
    </div>

      <AddProduct />
  </div>
}
