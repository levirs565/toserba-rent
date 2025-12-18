import { Checkout } from "@/app/(customer)/components/Checkout";
import { payProduct } from "@/lib/actions/cart";
import { getProduct } from "@/lib/products";
import { SearchParams } from "next/dist/server/request/search-params";
import { notFound } from "next/navigation";

export default async function ProductCheckoutPage({
  params,
  searchParams
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>
}) {
  const id = (await params).id
  const product = await getProduct(id)
  if (!product) return notFound();
  const urlParams = await searchParams;
  if (!urlParams) return notFound()
  const durationDays = parseInt(String(urlParams["durationDays"]))
  if (isNaN(durationDays)) return notFound()
  const needDeliver = String(urlParams["needDeliver"]) == String(true);

  const items = [{
    name: `${product.name} (50%)`,
    price: (durationDays * product.pricePerDay) / 2
  }]

  if (needDeliver) {
    items.push({ name: `${product.name} (Pengiriman)`, price: 25000 })
  }

  items.push({ name: `${product.name} (Asuransi)`, price: 5000 })

  return <Checkout items={items} onSubmit={payProduct.bind(null, { id, durationDay: durationDays, needDeliver })} />
}