"use client";

import userServices from "@/services/user";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";

type Data = {
  data: any;
};

export default function UserBtn({ data }: Data) {

  console.log("data: ", data?.user?.image);

  return (
    <Link
      href="/member/profile"
      className={`"text-accent"
         font-medium transition-all hover:text-accent  text-lg`}
    >
      {data ? (
        <div className="flex items-center justify-center gap-1">
          <Image
            className="rounded-full w-[80%] h-[80%] border border-accent object-scale-down"
            src={`${data?.user?.image}`}
            alt="profile"
            width={40}
            height={40}
          />
        </div>
      ) : (
        <button
          onClick={() => (data ? "" : signIn())}
          className="bg-accent p-2 text-primary rounded-xl hover:bg-accent-hover transition-all duration-500"
        >
          {data ? "" : "Login"}
        </button>
      )}
    </Link>
  );
}
