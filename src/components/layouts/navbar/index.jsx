'use client'

import { usePathname } from "next/navigation";
import LoginOutView from "../loginout";
import Link from "next/link";
import links from "../../../data/links";

export default function NavbarView() {
    const pathname = usePathname();
  return (
    <nav className="flex gap-8">
      {links.map((link, i) => {
        const IconComponent = link.logo;
        return (
          <Link
            href={link.path}
            key={i}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-medium transition-all hover:text-accent flex gap-2`}
          >
            <IconComponent className="text-2xl" />
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
