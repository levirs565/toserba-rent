export type ProductStatus = "ready" | "rented";

export type Product = {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  description: string;
  status: ProductStatus;
  address?: {
    name: string;
    address: string;
  };
  reviews: {
    id: string;
    user: {
      name: string;
    };
    content: string;
  }[];
};

export function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}
