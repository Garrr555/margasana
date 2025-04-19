"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";

export default function LoginOutView({ classname }:any) {
  const { data } = useSession();
  return (
    <Link
      href={"/auth/login"}
      className={`bg-accent hover:bg-accent-hover px-4 py-2 rounded-xl text-primary font-bold cursor-pointer ${classname} flex`}
    >
      <button
        onClick={() => (data ? signOut() : signIn())}
        className={`${data ? "text-red-500 font-extrabold text-2xl" : ""} flex items-center justify-center`}
      >
        <div className="font-bold text-lg text-primary">{data ? data?.user?.email : ""}</div>
        {data ? <IoIosLogOut /> : "Login"}
      </button>
    </Link>
  );
}
