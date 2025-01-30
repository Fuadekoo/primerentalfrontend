import React from "react";
import { motion } from "framer-motion";
import { FaTelegram, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      className="bg-black text-white py-4 bottom-0 w-full z-10"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="text-gray-400 text-xs">
            <ul className="flex item -skew-x-2 m-2 p-2">
              <li className="m-2 font-bold ">
                <a href="/Register">SignUp</a>
              </li>
              <li className="m-2  font-bold ">
                <a href="/login">Login</a>
              </li>
              <li className="m-2 font-bold ">
                <a href="/">Property</a>
              </li>
              <li className="m-2  font-bold ">Terms</li>
              <li className="m-2  font-bold ">Privacy</li>
            </ul>
            <p>&copy; 2024 PrimeRental. All rights reserved.</p>
          </div>
          <div className="flex space-x-4 m-1">
            <a
              href="https://www.tiktok.com/@prime_rental"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white "
            >
              <FaTiktok className="w-4 h-4" />
            </a>
            <a
              href="https://t.me/Rental_house"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaTelegram />
            </a>
            <a
              href="https://www.instagram.com/prime_rental1/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/prime_rental"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
            >
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
