'use client'

import Header from "../../header";
import { usePathname } from "next/navigation";

const disableNavbar = ["/login", "/register"];
export default function Layout({ children }) {
    const pathname = usePathname();
    return (
      <div>
        {!disableNavbar.includes(pathname) && <Header />}
        {children}
      </div>
    );
}