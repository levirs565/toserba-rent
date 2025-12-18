import { Checkout } from "@/app/(customer)/components/Checkout";
import { payReturn } from "@/lib/actions/rent";
import { getRentReturn } from "@/lib/rent";
import { notFound } from "next/navigation";

export default async function PayReturnPage(
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const {id} = await params;

  const rentReturn = await getRentReturn(id);

  if (!rentReturn) return notFound();

  const items = [
    {
      name: `${rentReturn.product.name} (50%)`,
      price: ((rentReturn.rent.rentPrice ?? 0) * rentReturn.rent.durationDay) / 2
    }
  ]

  if (rentReturn.denda && rentReturn.denda > 0) {
    items.push({
      name: "Denda",
      price: rentReturn.denda
    })
  }

  return <Checkout items={items} onSubmit={payReturn.bind(null, id)}/>
}