import { getCartProducts } from "@/lib/cart";
import { Checkout } from "../../components/Checkout";
import { payCart } from "@/lib/actions/cart";

export default async function CheckoutPage() {
  const items = await getCartProducts()

  const checkoutItems: { name: string, price: number }[] = [];

  for (const item of items) {
    checkoutItems.push({
      name: `${item.product.name} (50%)`,
      price: (item.durationDay * item.product.pricePerDay) / 2
    })

    if (item.needDeliver) {
      checkoutItems.push({ name: `${item.product.name} (Pengiriman)`, price: 25000 })
    }

    checkoutItems.push({ name: `${item.product.name} (Asuransi)`, price: 5000 })
  }
 return <Checkout items={checkoutItems} onSubmit={payCart} />
}

