import { getVerificationState } from "@/lib/auth";
import Verify from "./Verify";
import { notFound } from "next/navigation";
import { VerificationState } from "../../generated/prisma/enums";
import { getCurrentUser, getUser } from "@/lib/user";

export default async function VerifyPage() {
  const state = await getVerificationState();

  if (!state) return notFound();

  if (state.changedTime && state.state == VerificationState.ACCEPTED) return notFound();

  const user = await getCurrentUser()

  if (!user) return notFound();

  return <Verify hasKtpImage={user.hasKtp ?? false}
    isRejected={state.state == VerificationState.REJECTED}
    isWaiting={(state.changedTime && state.state == VerificationState.PENDING) ?? false}
    nik={user.nik ?? undefined}
    birthPlace={user.birthPlace ?? undefined}
    birthDate={user.birthDate ?? undefined}
  />
}

