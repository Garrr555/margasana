"use client";

import Sidebar from "../../fragments/sidebar";
import { listSideBarAdmin } from "../../../data/sidebar";

export default function AdminLayout(props) {
  const { children } = props;
  return (
    <div className="flex">
      <Sidebar data={listSideBarAdmin} />
      <div className="flex-1 p-6 ml-64">{children}</div>
    </div>
  );
}
