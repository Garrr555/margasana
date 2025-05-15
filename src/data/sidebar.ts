import {FaPerson, FaUsers } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiCustomerService2Fill, RiUserSettingsFill } from "react-icons/ri";

export const listSideBarAdmin = [
  // {
  //   title: "Dashboard",
  //   url: "/admin",
  //   icon: MdDashboard,
  // },
  {
    title: "Users",
    url: "/admin/users",
    icon: RiUserSettingsFill,
  },
  {
    title: "Resident",
    url: "/admin/products",
    icon: FaPerson,
  },
  {
    title: "Villages",
    url: "/admin/stat",
    icon: FaUsers,
  },
  {
    title: "Map",
    url: "/admin/map",
    icon: FaMapMarkedAlt,
  },
];
export const listSideBarMember = [
  // {
  //   title: "Dashboard",
  //   url: "/member",
  //   icon: MdDashboard,
  // },
  {
    title: "Profile",
    url: "/member/profile",
    icon: CgProfile,
  },
];
