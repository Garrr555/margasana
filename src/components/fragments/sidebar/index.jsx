'use client'

import { usePathname } from "next/navigation";
import {listSideBar} from "../../../data/admin";
import Link from "next/link";
import LoginOutView from "../../layouts/loginout";

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <div className="w-64 h-screen bg-gray-900 border-r border-white/80 text-white/80 p-6 flex flex-col justify-between ">
      <div>
        <h2 className="text-2xl mb-8">
          Admin Sidebar<span className="text-accent">.</span>
        </h2>
        <div className="space-y-4 flex flex-col gap-3">
          {listSideBar.map((item, i) => (
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
