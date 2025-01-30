import React, { useState, useRef } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { useClickAway } from "react-use";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To toggle burger menu
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useClickAway(menuRef, () => setIsMenuOpen(false));

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    console.log("Logout successful");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-black p-4 border-b-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/">
            <img
              src="/pp.png"
              alt="Prime Rental Logo"
              className="h-8 sm:h-11"
            />
          </Link>
          <h1 className="text-white hidden sm:block">{user?.name}</h1>

          {/* Burger Menu Button */}
          <button
            className="sm:hidden text-2xl text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Menu items */}
          <ul className="hidden sm:flex sm:gap-4">
            <Link to="/">
              <li className="text-white hover:underline p-2 sm:p-0">Home</li>
            </Link>

            <Link to="/contact">
              <li className="text-white hover:underline p-2 sm:p-0">Contact</li>
            </Link>

            <Link to="/about">
              <li className="text-white hover:underline p-2 sm:p-0">About</li>
            </Link>

            <Link to="/login">
              <li className="text-white hover:underline p-2 sm:p-0">Sign In</li>
            </Link>

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
              animate={{ width: "70%", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="sm:hidden bg-black p-4 absolute top-16 right-0 z-10 border-l border-green-600 rounded-l-lg"
            >
              <ul className="flex flex-col gap-4">
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  <motion.li
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-white hover:bg-green-600 p-2 rounded border border-gray-600"
                  >
                    Home
                  </motion.li>
                </Link>

                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <motion.li
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white hover:bg-green-600 p-2 rounded border border-gray-600"
                  >
                    Contact
                  </motion.li>
                </Link>

                <Link to="/about" onClick={() => setIsMenuOpen(false)}>
                  <motion.li
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white hover:bg-green-600 p-2 rounded border border-gray-600"
                  >
                    About
                  </motion.li>
                </Link>

                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                  {user ? (
                    <div className="flex items-center gap-2 text-white hover:bg-green-600 p-2 rounded border border-gray-600">
                      <img
                        className="rounded-full h-7 w-7 object-cover"
                        src={user.avatar}
                        alt="profile"
                      />
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
                    className="text-white hover:bg-green-600 p-2 rounded border border-gray-600"
                  >
                    <FaShoppingCart />
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

export default Navbar;
