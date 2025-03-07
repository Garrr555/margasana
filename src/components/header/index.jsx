import Link from "next/link";
import NavbarView from "../layouts/navbar";
import LoginOutView from "../layouts/loginout";

export default function Header() {
    return (
      <header className="container py-5 xl:py-9">
        <div className="flex justify-between">
          <Link href={"/"}>
            <h1 className="text-4xl font-semibold">
              Marga<span className="text-accent">.</span>
            </h1>
          </Link>
          {/* Desktop Navbar */}
          <div className="hidden xl:flex items-center justify-center gap-8">
            <NavbarView />
            <LoginOutView />
          </div>

          {/* Mobile Navbar */}
          <div className="xl:hidden flex items-center justify-center gap-4">
            <NavbarView />
            <LoginOutView />
          </div>
        </div>
      </header>
    );
}