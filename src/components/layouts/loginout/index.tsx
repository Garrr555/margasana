"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";

export default function LoginOutView({ classname }: any) {
  const { data } = useSession();
  return (
    <Link
      href={"/auth/login"}
      className={`bg-red-500 hover:bg-red-500/80 px-4 py-2 rounded-xl text-primary font-bold cursor-pointer ${classname} flex`}
    >
      <button
        onClick={() => (data ? signOut() : signIn())}
        className={`${
          data ? " font-extrabold text-xl" : ""
        } flex items-center justify-center w-full`}
      >
        {data ? (
          <div className="flex items-center justify-between text-white/80 w-full">
            <div>Logout</div>
            <div className="text-3xl font-extrabold">
              <IoIosLogOut />
            </div>
          </div>
        ) : (
          "Login"
        )}
      </button>
    </Link>
  );
}
