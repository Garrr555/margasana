"use client";

import { usePathname } from "next/navigation";
import LoginOutView from "../../layouts/loginout";
import Link from "next/link";
import links from "@/data/links";
import { useSession } from "next-auth/react";

interface CustomUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string;
}

interface CustomSession {
  user?: CustomUser;
}

export default function NavbarView() {
  const { data: session } = useSession() as { data: CustomSession | null };
  const pathname = usePathname();

  if (!session || session.user?.role === "member") {
    return (
      <nav className="flex gap-8">
        {links
          .filter((link) => link.role === "member")
          .map((link, i) => {
            const IconComponent = link.logo;
            return (
              <Link
                href={link.path}
                key={i}
                className={`${
                  link.path === pathname &&
                  "text-accent border-b-2 border-accent"
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
  return (
    <nav className="flex gap-8">
      {links
        .map((link, i) => {
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
