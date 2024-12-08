import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginNavbar from "./LoginNavbar"; // Adjust the import path as needed
import { BiHomeAlt2 } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { IoPricetagsOutline } from 'react-icons/io5';
import { PiChatCircleBold } from 'react-icons/pi';
import { FaBell } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { FaUsers, FaHome } from 'react-icons/fa';

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  const userMenu = [
    { name: "Home", path: "/myhome", Icon: BiHomeAlt2 },
    { name: "Chat", path: "/user/chat", Icon: PiChatCircleBold },
    { name: "Notification", path: "/user/notification", Icon: FaBell },
  ];

  const adminMenu = [
    { name: "Home", path: "/myhome", Icon: BiHomeAlt2 },
    { name: "Dashboard", path: "/dashboard", Icon: MdDashboard },
    { name: "Users", path: "/manage/users", Icon: FaUsers },
    { name: "HomeType", path: "/manage/hometype", Icon: FaHome },
    { name: "Property", path: "/manage/property", Icon: IoPricetagsOutline },
    { name: "Chat", path: "/admin/chat", Icon: PiChatCircleBold },
    { name: "Notification", path: "/admin/notification", Icon: FaBell },
  ];

  const menuToBeRendered = user?.role === 'admin' ? adminMenu : userMenu;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const loginNavbar = (menu) => {
    return menu.map(item => ({
      ...item,
      onClick: item.path === "/logout" ? handleLogout : () => navigate(item.path)
    }));
  };

  return (
    <div className='flex flex-col h-screen bg-gray-200'>
      <LoginNavbar menu={loginNavbar(menuToBeRendered)} />
      <div className='flex-1 p-4'>
        <div className='scroll-m-1'>
          {/* Body */}
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;