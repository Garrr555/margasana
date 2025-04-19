import Link from "next/link";
import Navbar from "../Navbar";
import LoginOutView from "@/components/layouts/loginout";
import UserBtn from "@/components/layouts/userbtn";
import { useSession } from "next-auth/react";

export default function Header() {
  const {data} = useSession()
  return (
    <header className="py-5 xl:py-9 sticky top-0 h-fit z-50 bg-primary">
      <div className="container flex justify-between dark:text-white ">
        <Link href={"/"}>
          <h1 className="text-4xl font-semibold dark:text-white">
            Marga<span className="text-accent">.</span>
          </h1>
        </Link>
        {/* Desktop Navbar */}
        <div className="hidden xl:flex items-center justify-center gap-8">
          <Navbar />
          <UserBtn data={data} />
        </div>

        {/* Mobile Navbar */}
        <div className="xl:hidden flex items-center justify-center gap-4">
          <Navbar />
          <UserBtn data={data} />
        </div>
      </div>
    </header>
  );
}
