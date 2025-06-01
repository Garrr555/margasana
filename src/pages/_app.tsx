import Header from "@/components/fragments/Header";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "boxicons/css/boxicons.min.css";
import { useRouter } from "next/router";
import Toaster from "@/components/ui/Toaster";
import { JetBrains_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import ModeButton from "@/components/ui/mode";
config.autoAddCss = false;

declare global {
  interface Window {
    snap: any;
  }
}

const disableNavbar = [
  "auth",
  "admin",
  "member",
  "cart",
  "checkout",
  "products/",
  "rtrw-stat",
  "rt-rw"
];

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains-mono",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();
  const [toaster, setToaster] = useState<any>({});

  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 5000);
    }
  }, [toaster]);

  return (
    <SessionProvider session={session}>
      <div
        className={`${jetbrainsMono.variable} antialiased bg-primary font-primary`}
      >
        {!disableNavbar.includes(pathname.split("/")[1]) && <Header />}
        <Component {...pageProps} setToaster={setToaster} />
        {Object.keys(toaster).length > 0 && (
            <Toaster variant={toaster.variant} message={toaster.message} />
          )}
      </div>
    </SessionProvider>
  );
}
