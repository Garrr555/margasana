'use client'

import { signIn, signOut, useSession } from "next-auth/react";

export default function LoginOutView() {
  const { data } = useSession();
  return (
    <div className="bg-accent hover:bg-accent-hover px-4 py-2 rounded-xl text-primary font-bold cursor-pointer">
      <button onClick={() => (data ? signOut() : signIn())}>
        {data ? "Logout" : "Login"}
      </button>
    </div>
  );
}
