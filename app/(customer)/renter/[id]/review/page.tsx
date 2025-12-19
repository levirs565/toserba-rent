import { Checkout } from "@/app/(customer)/components/Checkout";
import { addReview } from "@/lib/actions/product";
import { payReturn } from "@/lib/actions/rent";
import { getRentReturn } from "@/lib/rent";
import { notFound } from "next/navigation";

export default async function ReviewPage(
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const rentReturn = await getRentReturn(id);


  if (!rentReturn || !rentReturn.paymentId) return notFound();

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold">Tambah Review</h1>
      </div>

      <div className="space-y-6 text-white">
        <div className="card space-y-4 border-white/10 bg-white/10 p-6">
          <h2 className="text-lg font-semibold text-slate-700">Review</h2>
          <form
            className="space-y-3"
            action={addReview.bind(null, rentReturn.product.id)}
          >
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-500">Review</label>
              <textarea
                name="review"
                className="input bg-white/10 text-slate-700!"
                placeholder="Review"
                required
                minLength={10}
              />
            </div>
            <button className="btn btn-primary w-full" type="submit">
              Kirim Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}