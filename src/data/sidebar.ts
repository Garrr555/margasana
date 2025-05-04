import { MdDashboard } from "react-icons/md";
import { FaBox, FaCartShopping } from "react-icons/fa6";
import { FaUsers, FaMapMarkedAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoStatsChart } from "react-icons/io5";

export const listSideBarAdmin = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: MdDashboard,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: FaBox,
  },
  {
    title: "Orders",
    url: "/admin/orders",
    icon: FaCartShopping,
  },
  // {
  //   title: "Profile",
  //   url: "/admin/profile",
  //   icon: CgProfile,
  // },
  {
    title: "Users",
    url: "/admin/users",
    icon: FaUsers,
  },
  {
    title: "Statistic",
    url: "/admin/stat",
    icon: IoStatsChart,
  },
  {
    title: "Map",
    url: "/admin/map",
    icon: FaMapMarkedAlt,
  },
];
export const listSideBarMember = [
  {
    title: "Dashboard",
    url: "/member",
    icon: MdDashboard,
  },
  {
    title: "Orders",
    url: "/member/orders",
    icon: FaCartShopping,
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: CgProfile,
  },
];
