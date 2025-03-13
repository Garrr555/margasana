import { MdDashboard } from "react-icons/md";
import { FaBox, FaCartShopping } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

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
    title: "Profile",
    url: "/admin/profile",
    icon: CgProfile,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: FaUsers,
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
    icon: FaCartShopping ,
  },
  {
    title: "Profile",
    url: "/member/profile",
    icon: CgProfile,
  },
];


