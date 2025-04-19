"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

type Data ={
  data: any
}

export default function UserBtn({data}:Data) {
  
  console.log("data: ", data?.user);
  return (
    <Link
      href="/member"
      className={`"text-accent"
         font-medium transition-all hover:text-accent  text-lg`}
    >
      {data ? (
        <div className="flex items-center justify-center gap-1">
          <div className="text-2xl">
            <FaUserCircle />
          </div>
          {data?.user?.fullname} 
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
