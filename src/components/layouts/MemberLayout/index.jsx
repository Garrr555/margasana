'use client'

import Sidebar from "../../fragments/sidebar";
import { listSideBarMember } from "../../../data/sidebar";

export default function MemberLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar data={listSideBarMember}/>
      <div className="flex-1 p-6 ml-64">{children}</div>
    </div>
  );
}
