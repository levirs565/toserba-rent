import { Checkout } from "@/app/checkout/Checkout";
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


  return <Checkout delivery={needDeliver ? 25000 : 0}
    subtotal={product.pricePerDay * durationDays}
    durationDay={durationDays}
    productId={id}
    needDeliver={needDeliver} />
}