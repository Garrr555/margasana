import Image from "next/image";
import { Inter } from "next/font/google";
import { useSession } from "next-auth/react";
import Navbar from "@/components/fragments/Navbar";
import DashboardView from "@/components/views/dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data } = useSession();
  console.log(data);

  return (
    <main className=" w-full">
      <DashboardView/>
    </main>
  );
}
