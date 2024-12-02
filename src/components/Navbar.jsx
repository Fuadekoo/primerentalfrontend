import React, { useState } from 'react';
import { FaBars, FaTimes,FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ImageSlider from '../components/ImageSlider'; // Adjust the import path as needed

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false); // To toggle burger menu
    const { user } = useSelector(state => state.users);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="bg-green-800 p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <Link to='/'>
                        <h1 className='font-bold text-sm sm:text-xl flex'>
                            <span className='text-slate-500'>Prime</span>
                            <span className='text-slate-700'>Rental</span>
                        </h1>
                    </Link>

                    {/* Burger Menu Button */}
                    <button className='sm:hidden text-2xl' onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Menu items (Responsive with hamburger) */}
                    <ul className={`sm:flex sm:gap-4 ${isMenuOpen ? 'block' : 'hidden'} absolute sm:static left-0 right-0 top-16 bg-green-800 sm:bg-transparent p-4 sm:p-0 z-10`}>
                        <Link to='/'>
                            <li className='text-white hover:underline p-2 sm:p-0'>Home</li>
                        </Link>

                        <Link to='/contact'>
                            <li className='text-white hover:underline p-2 sm:p-0'>Contact</li>
                        </Link>

                        <Link to='/about'>
                            <li className='text-white hover:underline p-2 sm:p-0'>About</li>
                        </Link>

                        <Link to='/profile'>
                            {user ? (
                                <img className='rounded-full h-7 w-7 object-cover' src={user.avatar} alt='profile' />
                            ) : (
                                <li className='text-white hover:underline p-2 sm:p-0'>Sign In</li>
                            )}
                        </Link>

                        {/* Cart Icon */}
            <Link to='/mybooking'>
              <li className='text-white hover:underline p-2 sm:p-0'>
                <FaShoppingCart />
              </li>
            </Link>
                    </ul>
                </div>
            </nav>
            {/* <ImageSlider /> */}
        </div>
    );
};

export default Navbar;