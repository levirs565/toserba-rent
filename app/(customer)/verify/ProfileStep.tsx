"use client"

import { sendProfile } from "@/lib/actions/verify"
import { useActionState, useEffect } from "react"

export function ProfileStep({ onNextStep, nik, birthPlace, birthDate }:
  { onNextStep: () => void, nik?: string, birthPlace?: string, birthDate?: Date }) {
  const [state, action, pending] = useActionState(sendProfile, null);

  useEffect(() => {
    if (state?.success) {
      onNextStep()
    }
  }, [state])

  return <div className="card space-y-4 border-white/10 bg-white/10 p-6">
    <h2 className="text-lg font-semibold text-slate-700">Data diri</h2>
    <form
      className="space-y-3"
      action={action}
    >
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-500">NIK</label>
        <input
          name="nik"
          className="input bg-white/10 text-slate-700!"
          placeholder="NIK"
          required
          defaultValue={state && "errors" in state ? state.nik : nik}
        />
        {state && "errors" in state && state?.errors?.nik && <p>{state.errors.nik.join(". ")}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-500">
          Tempat Lahir
        </label>
        <input
          name="birthPlace"
          className="input bg-white/10 text-slate-700!"
          placeholder="Nama Kota"
          required
          defaultValue={state && "errors" in state ? state.birthPlace : birthPlace}
        />
        {state && "errors" in state && state?.errors?.birthPlace && <p>{state.errors.birthPlace.join(". ")}</p>}
      </div>
      <div className="space-y-1">
        <label className="text-sm font-semibold text-slate-500">
          Tanggal Lahir
        </label>
        <input
          name="birthDate"
          type="date"
          className="input bg-white/10 text-slate-700!"
          placeholder="Tanggal Lahir"
          required
          defaultValue={(state && "errors" in state ? state.birthDate : birthDate)?.toISOString().split('T')[0]}
        />
        {state && "errors" in state && state?.errors?.birthDate && <p>{state.errors.birthDate.join(". ")}</p>}
      </div>
      <button className="btn btn-primary w-full" type="submit">
        Kirim Identitas
      </button>
    </form>
  </div>
}