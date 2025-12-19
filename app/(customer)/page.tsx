import Link from "next/link";
import { formatIDR } from "../lib/products";
import { getAllCategories, getAllProducts } from "@/lib/products";

function createCategoryUrl(q: string | undefined, category: string | undefined) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (category) params.set("category", category);
  return params.toString();
}

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = (await searchParams)?.q;
  const category = (await searchParams)?.category;
  const categories = await getAllCategories();
  const queryStr = typeof query == "string" ? query : undefined;
  const categoryStr = typeof category == "string" ? category : undefined;
  const products = await getAllProducts(queryStr, categoryStr);

  return (
    <div className="space-y-10 text-white">
      <section className="space-y-4">
        <div className="space-y-2 text-white">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold">Daftar Barang</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`?${createCategoryUrl(queryStr, undefined)}`}
            className={`capitalize pill border ${categoryStr == undefined
              ? "border-sky-200 bg-white/20 text-white"
              : "border-white/20 bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
          >
            Semua
          </Link>
          {categories.map((cat) => (
            <Link
              href={`?${createCategoryUrl(queryStr, cat)}`}
              key={cat}
              className={`capitalize pill border ${categoryStr == cat
                ? "border-sky-200 bg-white/20 text-white"
                : "border-white/20 bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id}
              className="card group flex h-full flex-col overflow-hidden border-white/10 bg-white/90 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <img
                src={`/api/get-product-image/${product.id}`}
                className="h-40 w-full object-cover"
              />
              <div className="flex flex-1 flex-col gap-3 p-4">
                <div className="flex items-center justify-between">
                  <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 capitalize">
                    {product.category}
                  </p>
                  <span
                    className={`pill ${product.status === "ready"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-800"
                      }`}
                  >
                    {product.status === "ready" ? "Tersedia" : "Disewakan"}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {product.name}
                </h3>
                <div className="mt-auto flex items-center justify-between text-sm font-semibold text-slate-900">
                  <span>{formatIDR(product.pricePerDay)}/hari</span>
                  {/* <span className="text-slate-500">{product.location}</span> */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
