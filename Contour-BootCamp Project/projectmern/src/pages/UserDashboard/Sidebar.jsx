import React, { useState } from "react";
import { AiFillHome, AiOutlineHistory, AiFillSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { control } from "../../assets";
const Sidebar = ({routes}) => {
    console.log('====>', routes)
  const menuItem = [
    {
      key: "Dashboard",
      name: "Dashboard",
      icon: <AiFillHome />,
      path: "/dashboard",
    },
    {
      key: "history",
      name: "History",
      path: "/history",
      icon: <AiOutlineHistory />,
    },
    {
      key: "profile",
      name: "Profile",
      path: "/userProfile",
      icon: <AiFillSetting />,
      gap: true,
    },
    {
      key: "logout",
      name: "Logout",
      path: "/logout",
      icon: <FiLogOut />,
      
    },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-72" : "w-20"
        } duration-300 h-screen bg-mainBgColor relative`}
      >
        <img
          src={control}
          alt="side bar toggle Button"
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-mainBgColor rounded-full
            ${!open && "rotate-180"}
            `}
          onClick={() => setOpen(!open)}
        />
        <ul className="pt-6 mr-100">
        {menuItem.map((menu, index) => {
          return (
            <NavLink
              to={menu.path}
              key={index}
              className="link"
            >
              <div className={`text-[white] text-grey-300 text-[40px] flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md active:bg-slate-300 ${menu.gap ? "mt-20" : "mt-4"}`}>
                {menu.icon}
              <span className={`${!open && 'hidden'} text-[20px] origin-left duration-200`}>{menu.name}</span>
              </div>
            </NavLink>
          );
        })}
      </ul>
      </div>
      <div className="p-7 text-2x1 font-semibold">
      {/* <main>{children}</main> */}
      </div>
    </div>
  );
};

export default Sidebar;
