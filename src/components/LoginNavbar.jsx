import React, { useState } from 'react';
import { FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const LoginNavbar = ({ menu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // To toggle burger menu
  const { user } = useSelector(state => state.users);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="bg-gray-800 p-4 border-b-4 border-green-600">
        <div className="container mx-auto flex justify-between items-center">
          <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex'>
              <span className='text-slate-500'>House</span>
              <span className='text-slate-700'>Rent</span>
            </h1>
          </Link>

          {/* Burger Menu Button */}
          <button className='sm:hidden text-2xl' onClick={toggleMenu}>
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Menu items (Responsive with hamburger) */}
          <ul className={`sm:flex sm:gap-4 ${isMenuOpen ? 'block' : 'hidden'} absolute sm:static left-0 right-0 top-16 bg-gray-800 sm:bg-transparent p-4 sm:p-0 z-10`}>
            {menu.map((item, index) => (
              <Link key={index} to={item.path}>
                <li className='text-white hover:underline p-2 sm:p-0'>{item.name}</li>
              </Link>
            ))}
            
            <Link to='/profile'>
              {user ? (
                <div className='flex items-center gap-2'>
                  <img className='rounded-full h-7 w-7 object-cover' src={user.avatar} alt='profile' />
                  <span className='text-white'>{user.name}</span>
                </div>
              ) : (
                <li className='text-white hover:underline p-2 sm:p-0'>Sign In</li>
              )}
            </Link>
            {user && (
              <li className='text-white hover:underline p-2 sm:p-0 cursor-pointer' onClick={() => console.log('Logout')}>
                Logout
              </li>
            )}

            <Link to='/mybooking'>
              <li className='text-white hover:underline p-2 sm:p-0 m-2 hover:text-red-600'>
                <FaShoppingCart />
              </li>
            </Link>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default LoginNavbar;