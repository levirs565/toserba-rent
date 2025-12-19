"use server";

import { getProduct } from "@/lib/products";
import { notFound } from "next/navigation";
import { ProductDetails } from "./ProductDetails";
import { Product } from "@/app/lib/products";
import { isInCart } from "@/lib/cart";
import { getSession } from "@/lib/session";
import { canTransaction, getUserAddress } from "@/lib/user";

export default async function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;
  const product = await getProduct(productId)
  if (!product) return notFound();

  const inCart = await isInCart(productId)
  const currentUserId = (await getSession()).userId;
  const isLogged = !!currentUserId;
  const addresses = await getUserAddress();
  const can = await canTransaction();

  return <ProductDetails
    product={product as Product}
    inCart={inCart} 
    userId={product.userId} 
    isLogged={isLogged} 
    addresses={addresses} 
    can={can} 
    isCurrentUser={currentUserId == product.userId} />
}

