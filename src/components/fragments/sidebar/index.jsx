"use client";

import { usePathname } from "next/navigation";
import { listSideBar } from "../../../data/sidebar";
import Link from "next/link";
import LoginOutView from "../../layouts/loginout";

export default function Sidebar({ data = [] }) {
  const pathname = usePathname();
  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-gray-800 text-white/80 p-6 flex flex-col justify-between fixed top-0 left-0">
      <div>
        <div className="text-2xl mb-8">
          <Link href="/">
            Admin Marga<span className="text-accent">.</span>
          </Link>
        </div>
        <div className="space-y-4 flex flex-col gap-0">
          {data.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              className={`${
                item.url === pathname && "text-primary bg-accent  px-3"
              } py-2 rounded-xl capitalize font-medium  transition-all duration-500 ease-in-out flex gap-2 hover:bg-accent-hover hover:text-primary hover:px-3`}
            >
              <item.icon className="text-2xl" />
              {item.title}
            </Link>
          ))}
        </div>
      </div>

      <div>
        <LoginOutView classname={"text-center"} />
      </div>
    </div>
  );
}
