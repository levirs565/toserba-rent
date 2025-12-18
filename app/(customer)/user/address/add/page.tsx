"use client"

import { addUserAddress } from "@/lib/actions/user";
import { useActionState } from "react";

export default function AddUserAddressPage() {
  const [state, action, pending] = useActionState(addUserAddress, null);
  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-bold">Tambah Alamat</h1>
      </div>

      <div className="space-y-6 text-white">
        <div className="card space-y-4 border-white/10 bg-white/10 p-6">
          <h2 className="text-lg font-semibold text-slate-700">Alamat</h2>
          <form
          action={action}
            className="space-y-3"
          >
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-500">Nama</label>
              <input
                name="name"
                className="input bg-white/10 text-slate-700!"
                placeholder="Nama"
                required
              defaultValue={state && "errors" in state ? state.name : ""}
              />
              {state && "errors" in state && state?.errors?.name && <p>{state.errors.name.join(". ")}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-500">Alamat</label>
              <input
                name="address"
                className="input bg-white/10 text-slate-700!"
                placeholder="Alamat"
                required
              defaultValue={state && "errors" in state ? state.address : ""}
              />
              {state && "errors" in state && state?.errors?.address && <p>{state.errors.address.join(". ")}</p>}
            </div>
            <button className="btn btn-primary w-full" type="submit">
              Tambah Alamat
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

