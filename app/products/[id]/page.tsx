"use server";

import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductDetails } from "./ProductDetails";
import { Product } from "@/app/lib/products";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const product = await getProduct((await params).id)
  if (!product) return notFound();

  return <ProductDetails product={product as Product} />
}

