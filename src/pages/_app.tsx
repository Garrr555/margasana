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
import { use, useEffect, useState } from "react";
config.autoAddCss = false;

const disableNavbar = ["auth", "admin", "member", "cart"];

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
  const [toaster, setToaster] = useState<any>({
    
  });

  useEffect(() => {
    document.documentElement.classList.add("dark"); // Paksa dark mode
  }, []);

  useEffect(() => {
    if(Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 5000);
    }
  }, [toaster]);

  return (
    <SessionProvider session={session}>
      <div className={`${jetbrainsMono.variable} antialiased dark:bg-primary font-primary dark:text-white`}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Header />}
        <Component {...pageProps} setToaster={setToaster}/>
        {Object.keys(toaster).length > 0 && (
          <Toaster variant={toaster.variant} message={toaster.message}/>
        )} 
      </div>
    </SessionProvider>
  );
}
