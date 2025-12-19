"use server";

import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductDetails } from "./ProductDetails";
import { Product } from "@/app/lib/products";
import { isInCart } from "@/lib/cart";
import { getSession } from "@/lib/session";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;
  const product = await getProduct(productId)
  if (!product) return notFound();

  const inCart = await isInCart(productId)
  const isLogged = !!(await getSession()).userId;

  return <ProductDetails product={product as Product} inCart={inCart} userId={product.userId} isLogged={isLogged}/>
}

