"use client";

import { TiHome } from "react-icons/ti";
import { RiCustomerService2Fill, RiRobot3Fill } from "react-icons/ri";
import { FaUserCog, FaMapMarkedAlt, FaBoxes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";

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
    name: "Product",
    path: "/products",
    logo: FaBoxes,
    role: "member",
  },
  {
    name: "Orders",
    path: "/cart",
    logo: FaCartShopping,
    role: "member",
  },
  {
    name: "Admin",
    path: "/admin",
    logo: FaUserCog,
    role: "admin",
  },
];

export default links;
