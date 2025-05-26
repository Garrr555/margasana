"use client";

import { usePathname } from "next/navigation";
import LoginOutView from "../../layouts/loginout";
import Link from "next/link";
import links from "@/data/links";
import { useSession } from "next-auth/react";
import ModeButton from "@/components/ui/mode";

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
      <nav className="flex gap-8 items-center">
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
        <div>
          <ModeButton />
        </div>
      </nav>
    );
  } 
  return (
    <nav className="flex gap-6 items-center">
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
      <div>
        <ModeButton />
      </div>
    </nav>
  );
}
