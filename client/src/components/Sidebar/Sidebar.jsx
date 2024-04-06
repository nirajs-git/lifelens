import React, { useState } from "react";
import { FaChevronLeft, FaUserPen, FaRightFromBracket } from "react-icons/fa6";
import Logo from "../../assets/img/logo/logo.svg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { FaNotesMedical } from "react-icons/fa";

const Sidebar = ({ setAuthenticated }) => {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
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
    {
      title: "Risk Assessment",
      icon: <FaNotesMedical className="w-10" />,
      path: "/dashboard/risk-assessment",
    },
  ];

  const accountItems = [
    {
      title: "Logout",
      icon: <FaRightFromBracket className="w-10" />,
      onClick: () => {
        localStorage.removeItem("jwtToken");
        setAuthenticated(false);
        navigate("/");
      },
    },
  ];

  return (
    <div
      className={`${
        open ? "w-72" : "w-20"
      } flex flex-col justify-between duration-500 h-screen p-5 pt-8 bg-dark relative`}
    >
      <div>
        <span
          className={`absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 px-2 py-1 duration-500 bg-white border-dark ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        >
          <FaChevronLeft className="text-dark w-full" />
        </span>
        <div className="flex gap-x-4 items-center">
          <img
            src={Logo}
            className={`w-10 cursor-pointer duration-500 ${
              open ? "rotate-0" : "rotate-[360deg]"
            }`}
            alt=""
          />
          <h1
            className={`text-white origin-left font-medium ${
              !open ? "scale-x-0" : "scale-x-100"
            } duration-300`}
          >
            LifeLens
          </h1>
        </div>
        <ul className="flex flex-col gap-4 pt-6">
          {menuItems.map((menu, index) => (
            <NavLink
              key={index}
              to={menu.path}
              title={menu.title}
              className={`h-10 flex items-center gap-x-4 cursor-pointer py-2 duration-300 rounded-md ${
                location.pathname === menu.path
                  ? "bg-green text-white"
                  : "text-gray-300 hover:bg-slate-600"
              }`}
            >
              <div className="">{menu.icon}</div>
              <span
                className={`${
                  !open ? "scale-x-0" : "scale-x-100"
                } origin-left duration-300`}
              >
                {menu.title}
              </span>
            </NavLink>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 pt-6">
        {accountItems.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            title={item.title}
            className={`h-10 flex items-center gap-x-4 cursor-pointer py-2 duration-300 rounded-md ${
              location.pathname === item.path
                ? "bg-green text-white"
                : "text-gray-300 hover:bg-slate-600"
            }`}
          >
            <div className="">{item.icon}</div>
            <span
              className={`${
                !open ? "scale-x-0" : "scale-x-100"
              } origin-left duration-300`}
            >
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
