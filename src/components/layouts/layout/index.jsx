'use client'

import Header from "../../header";
import { usePathname } from "next/navigation";

const disableNavbar = ["login", "register", "admin", "member"];
export default function Layout({ children }) {
    const pathname = usePathname();
    return (
      <div>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Header />}
        {children}
      </div>
    );
}