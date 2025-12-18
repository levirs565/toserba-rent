"use server";

import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductDetails } from "./ProductDetails";
import { Product } from "@/app/lib/products";
import { isInCart } from "@/lib/cart";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;
  const product = await getProduct(productId)
  if (!product) return notFound();

  const inCart = await isInCart(productId)

  return <ProductDetails product={product as Product} inCart={inCart} />
}

