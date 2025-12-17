import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface Session {
    userId: string | undefined
}

export async function getSession() {
    return await getIronSession<Session>(await cookies(), {
        password: process.env.SESSION_PASSWORD!,
        cookieName: "session"
    })
}