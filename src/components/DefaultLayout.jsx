import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginNavbar from "./LoginNavbar"; // Adjust the import path as needed

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);

  const userMenu = [
    { name: "Home", path: "/user/home" },
    { name: "Bookings", path: "/user/bookings" },
    {name: "chat", path: "/user/chat"},
    { name: "Notification", path: "/user/notification" },
  ];

  const adminMenu = [
    { name: "Home", path: "/admin/home" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "AllUser", path: "/manage/users" },
    { name: "HomeType", path: "/manage/hometype" },
    { name: "AllProperty", path: "/manage/property" },
    { name: "chat", path: "/admin/chat" },
    { name: "Notification", path: "/admin/notification" },
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