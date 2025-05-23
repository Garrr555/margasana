import LoginOutView from "@/components/layouts/loginout";
import Button from "@/components/ui/button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { IconType } from "react-icons";

type PropsType = {
  lists: Array<{
    title: string;
    url: string;
    icon: IconType;
  }>;
  role?: string;
  label: string;
};

export default function Sidebar(props: PropsType){

    const {lists, role, label} = props
    const {pathname} = useRouter()

    return (
      <div className="w-64 h-screen bg-layout border-r border-primary text-third p-6 flex flex-col justify-between fixed top-0 left-0">
        <div>
          <div className="text-2xl font-bold mb-8">
            <Link href="/">
              {label} Marga<span className="text-accent">.</span>
            </Link>
          </div>
          <div className="space-y-4 flex flex-col gap-0">
            {lists.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                className={`${
                  item.url === pathname && "text-primary bg-accent  px-3"
                } py-2 rounded-xl capitalize font-medium  transition-all duration-500 ease-in-out flex gap-2 hover:bg-accent-hover hover:text-primary hover:px-3`}
              >
                <div className="text-2xl">
                  <item.icon />
                </div>
                {item.title}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <LoginOutView classname={"text-center"} />
        </div>
      </div>
    );
}