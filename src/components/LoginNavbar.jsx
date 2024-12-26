import React, { useState, useRef } from 'react';
import { FaBars,FaUser, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickAway } from 'react-use';
import profileImage from "../images/profile.png";

const LoginNavbar = ({ menu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To toggle burger menu
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useClickAway(menuRef, () => setIsMenuOpen(false));

  const handleLogout = () => {
    console.log('Logout successful');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4 border-b-4 border-green-600">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
          <img src="/pp.png" alt="Prime Rental Logo" className="h-8 sm:h-11" />
          </Link>
          <h1 className="text-white hidden sm:block">{user?.name}</h1>

          {/* Burger Menu Button */}
          <button className="sm:hidden text-2xl" onClick={() => setIsMenuOpen((prev) => !prev)}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Menu items */}
          <ul className="hidden sm:flex sm:gap-4">
            {menu.map((item, index) => (
              <Link key={index} to={item.path}>
                <li className="text-white hover:underline p-2 sm:p-0 flex items-center gap-2">
                  <item.Icon />
                  {item.name}
                </li>
              </Link>
            ))}

            <Link to="/profile">
              {user ? (
                <div className="flex items-center gap-2">
                  <img
                    className="rounded-full h-7 w-7 object-cover"
                    src={profileImage}
                    alt="profile"
                  />
                </div>
              ) : (
                <li className="text-white hover:underline p-2 sm:p-0">Sign In</li>
              )}
            </Link>
            {user && (
              <li
                className="text-white hover:underline p-2 sm:p-0 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}

            <Link to="/mybooking">
              <li className="text-white hover:underline p-2 sm:p-0 m-2 hover:text-red-600">
                <FaShoppingCart />
              </li>
            </Link>
          </ul>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: '70%', opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden bg-gray-800 p-4 absolute top-16 right-0 z-10 border-l border-green-600 rounded-l-lg"
            >
              <ul className="flex flex-col gap-4">
                {menu.map((item, index) => (
                  <Link key={index} to={item.path} onClick={() => setIsMenuOpen(false)}>
                    <motion.li
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="text-white hover:bg-green-600 p-2 rounded border border-gray-600 flex items-center gap-2"
                    >
                      <item.Icon />
                      {item.name}
                    </motion.li>
                  </Link>
                ))}

                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  {user ? (
                    <div className="flex items-center gap-2 text-white hover:bg-green-600 p-2 rounded border border-gray-600">
                      <FaUser className="mr-2" />
                      profile
                    </div>
                  ) : (
                    <motion.li
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 50, opacity: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-white hover:bg-green-600 p-2 rounded border border-gray-600"
                    >
                      Sign In
                    </motion.li>
                  )}
                </Link>
                {user && (
                  <motion.li
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-white hover:bg-green-600 p-2 rounded border border-gray-600 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </motion.li>
                )}

                <Link to="/mybooking" onClick={() => setIsMenuOpen(false)}>
                  <motion.li
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-white hover:bg-green-600 p-2 rounded border border-gray-600 flex items-center gap-2"
                  >
                    <FaShoppingCart />
                    My Booking
                  </motion.li>
                </Link>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default LoginNavbar;