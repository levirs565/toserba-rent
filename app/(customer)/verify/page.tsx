import { getVerificationState, hasKtp } from "@/lib/auth";
import Verify from "./Verify";
import { notFound } from "next/navigation";
import { VerificationState } from "../../generated/prisma/enums";

export default async function VerifyPage() {
  const state = await getVerificationState();

  if (!state) return notFound();

  const hasKtpImage = await hasKtp();

  if (state.changedTime && state.state == VerificationState.ACCEPTED) return notFound();

  return <Verify hasKtpImage={hasKtpImage}
    isRejected={state.state == VerificationState.REJECTED}
    isWaiting={(state.changedTime && state.state == VerificationState.PENDING) ?? false} />
}

