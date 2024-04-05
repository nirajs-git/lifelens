import { IoIosPaper } from "react-icons/io";
import {
  FaGear,
  FaUserPen,
  FaTable,
  FaRightFromBracket,
} from "react-icons/fa6";
import { ImBooks } from "react-icons/im";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { BiSolidDashboard } from "react-icons/bi";

export const menuItems = [
  {
    title: "Dashboard",
    icon: <BiSolidDashboard className="w-10" />,
    path: "/dashboard",
  },
  {
    title: "Manage Patients",
    icon: <FaUserPen className="w-10" />,
    path: "/dashboard/manage-patients",
  },
];

export const accountItems = [
  {
    title: "Logout",
    icon: <FaRightFromBracket className="w-10" />,
  },
];
