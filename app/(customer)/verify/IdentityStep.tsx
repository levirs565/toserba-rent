'use client'

import { sendKtp } from "@/lib/actions/verify";
import { ChangeEvent, useActionState, useEffect, useMemo, useState } from "react";

const SIZE_LIMIT = 1024 * 1024;
function checkSizeLimit(event: ChangeEvent) {
  const element = event.currentTarget as HTMLInputElement
  if (element.files![0].size > SIZE_LIMIT) {
    alert("File is too big")
    element.value = ""
  }
}

function changeImage(event: ChangeEvent, setter: (url: string) => void) {
  const element = event.currentTarget as HTMLInputElement
  if (!element.files || !element.files[0]) return;

  setter(URL.createObjectURL(element.files[0]))
}

export function IdentityStep({ hasImage, onNextStep }: { hasImage: boolean, onNextStep: () => void }) {
  const [state, action, pending] = useActionState(sendKtp, null);

  const [ktpImageUrl, setKtpImageUrl] = useState(hasImage ? "/api/get-ktp" : null)
  const [selfieImageUrl, setSelfieImageUrl] = useState(hasImage ? "/api/get-selfie" : null)

  useEffect(() => {
    if (state && state.success) {
      onNextStep()
    }
  }, [state])

  return <div className="card space-y-4 border-white/10 bg-white/10 p-6">
    <h2 className="text-lg font-semibold text-slate-700">
      Unggah KTP & Selfie
    </h2>
    <p className="text-slate-500">
      Kirim foto KTP dan selfie memegang KTP untuk memastikan keaslian.
    </p>
    <form action={action}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-100 text-slate-500">
          Foto KTP
          <input
            name="ktp"
            type="file"
            accept="image/*"
            className="input bg-white/10 text-slate-700!"
            onChange={(e) => { checkSizeLimit(e); changeImage(e, setKtpImageUrl) }}
            required={!hasImage}
          />
          {ktpImageUrl && <img src={ktpImageUrl} className="mb-4" />}
        </label>
        <label className="space-y-2 text-sm text-slate-100 text-slate-500">
          Foto selfie dengan KTP
          <input
            name="selfie"
            type="file"
            accept="image/*"
            className="input bg-white/10 text-slate-700!"
            onChange={(e) => { checkSizeLimit(e); changeImage(e, setSelfieImageUrl) }}
            required={!hasImage}
          />
          {selfieImageUrl && <img src={selfieImageUrl} className="mb-4" />}
        </label>
      </div>
      <button className="btn btn-primary w-full">
        Kirim
      </button>
    </form>
  </div>
}