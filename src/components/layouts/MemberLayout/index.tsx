import Sidebar from "@/components/fragments/Sidebar";
import { listSideBarMember } from "@/data/sidebar";
import { url } from "inspector";
import { title } from "process";

type PropsType = {
  children: React.ReactNode;
};

export default function MemberLayout(props: PropsType) {
  const { children } = props;

  return (
    <div className="flex">
      <Sidebar label="Member" lists={listSideBarMember} />
      <div className="flex-1 p-6 ml-64">{children}</div>
    </div>
  );
}
