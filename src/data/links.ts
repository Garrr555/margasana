"use client";

import { TiHome } from "react-icons/ti";
import { RiCustomerService2Fill, RiRobot3Fill } from "react-icons/ri";
import { FaUserCog, FaMapMarkedAlt, FaBoxes } from "react-icons/fa";
import { FaCartShopping, FaUsers } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";

const links = [
  {
    name: "home",
    path: "/",
    logo: TiHome,
    role: "member",
  },
  {
    name: "Map",
    path: "/map",
    logo: FaMapMarkedAlt,
    role: "member",
  },
  {
    name: "AI",
    path: "/ai",
    logo: RiRobot3Fill,
    role: "member",
  },
  {
    name: "Statistic",
    path: "/products",
    logo: IoStatsChart,
    role: "member",
  },
  {
    name: "Admin",
    path: "/admin/users",
    logo: FaUserCog,
    role: "admin",
  },
];

export default links;
