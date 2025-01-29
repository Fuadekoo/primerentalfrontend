import React from "react";
import { Link } from "react-router-dom";
import Drone from "../images/drone.jpg";
import shooting from "../images/shooting.jpg";
import keyaccept from "../images/keyaccept.jpg";

const ExplorePage = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Section 1 */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-12">
        <div className="w-full lg:w-1/2">
          <img
            src={shooting}
            alt="Explore Image 1"
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">
            Are you ready to sale or rent your property? Register now and rest
            your stress on us!
          </h2>
          <p className="text-gray-600 mb-6">
            Register your property on the well know platform in Ethiopia, where
            your property can get rented or bought easily through our network.
            This is a digital Ethiopian platform that makes your life so easy!
            Get your property registered now!
          </p>
          <Link
            to="/explore"
            className="bg-slate-800 text-white py-2 px-1 rounded-lg hover:bg-green-700 text-center"
          >
            Register Your Property
          </Link>
        </div>
      </div>

      {/* Section 2 */}
      {/* <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-6 mb-12">
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-4">Shoot Your Property</h2>
          <p className="text-gray-600 mb-6">
            We can shoot your property with professional materials, drones, and photography. Please click the link below and register your property.contact prime rental for more information on +251- 911- 11-11-11
          </p>
          <Link to="/explore" className="bg-slate-800 text-white py-2 px-1 rounded-lg hover:bg-green-700 text-center">
            Register Your Property
          </Link>
        </div>
        <div className="w-full lg:w-1/2">
          <img
            src={Drone}
            alt="Explore Image 2"
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
      </div> */}
    </div>
  );
};

export default ExplorePage;
