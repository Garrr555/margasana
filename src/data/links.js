import { TiHome } from "react-icons/ti";
import { RiCustomerService2Fill } from "react-icons/ri";
import { MdWork } from "react-icons/md";
import { IoMdContact } from "react-icons/io";
import { FaUserEdit, FaUserCog } from "react-icons/fa";

const links = [
  {
    name: "home",
    path: "/",
    logo: TiHome,
  },
  {
    name: "services",
    path: "/services",
    logo: RiCustomerService2Fill,
  },
  {
    name: "resume",
    path: "/resume",
    logo: MdWork,
  },
  {
    name: "Member",
    path: "/member",
    logo: FaUserEdit,
  },
  {
    name: "Admin",
    path: "/admin",
    logo: FaUserCog,
  },
];

export default links;
