import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MdLocationOn } from 'react-icons/md';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HouseCard = ({ house }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? house.images.length - 1 : prevIndex - 1
        );
    };

    const handleNextImage = (e) => {
        e.preventDefault();
        setCurrentImageIndex((prevIndex) => 
            prevIndex === house.images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="bg-white pt-2 shadow-md hover:shadow-lg  transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
            <Link to={`/booknow/${house.id}`}>
                <div className="relative h-[320px] sm:h-[220px] w-full">
                    {house.images && house.images.length > 0 && (
                        <img
                            src={house.images[currentImageIndex]}
                            alt={`house-image-${currentImageIndex}`}
                            className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    )}
                    {house.images && house.images.length > 1 && (
                        <>
                            <button 
                                onClick={handlePrevImage} 
                                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
                            >
                                <FaChevronLeft />
                            </button>
                            <button 
                                onClick={handleNextImage} 
                                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
                            >
                                <FaChevronRight />
                            </button>
                        </>
                    )}
                    <div
                        className={`absolute top-2 left-2 px-2 py-1 rounded text-white font-bold ${
                            house.offer_type === 'For Rent' ? 'bg-red-500' : 'bg-green-500'
                        }`}
                    >
                        {house.offer_type}
                    </div>
                </div>
                <div className="p-3 flex flex-col gap-2 w-full">
                    <p className="truncate text-lg font-semibold text-slate-700">{house.title}</p>
                    <div className="flex items-center gap-1">
                        <MdLocationOn className="h-4 w-4 text-green-700" />
                        <p className="text-sm text-gray-600 truncate w-full">{house.location}</p>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{house.description}</p>
                    <p className="text-slate-500 mt-2 font-semibold">
                        ${house.price.toLocaleString()}/month
                    </p>
                    {/* <div className="text-slate-700 flex gap-2">
                        <div className="font-bold text-xs">
                            {house.bedrooms > 1 ? `${house.bedrooms} beds` : `${house.bedrooms} bed`}
                        </div>
                        <div className="font-bold text-xs">
                            {house.bathrooms > 1 ? `${house.bathrooms} baths` : `${house.bathrooms} bath`}
                        </div>
                    </div> */}
                    <div className="pt-1">
                        <button 
                            color="blue" 
                            className="w-full transform transition-transform duration-300 hover:scale-105 bg-slate-800 text-white p-1 rounded-sm hover:opacity-750  rounded-lg"
                        >
                            More Info
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default HouseCard;