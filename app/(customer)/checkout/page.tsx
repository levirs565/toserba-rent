import { getCartProducts } from "@/lib/cart";
import { Checkout } from "./Checkout";

export default async function CheckoutPage() {
  const items = await getCartProducts()
  const subtotal = items.reduce((a, b) => a + b.durationDay * b.product.pricePerDay, 0)
  const delivery = items.reduce((a, b) => a + (b.needDeliver ? 25000 : 0), 0)

  return <Checkout subtotal={subtotal} delivery={delivery}/>
}

