'use client'

import Sidebar from "../../fragments/sidebar";
import listSideBar from "../../../data/admin";

export default function AdminLayout(props){
    const {children} = props
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 ml-64">{children}</div>
      </div>
    );
}