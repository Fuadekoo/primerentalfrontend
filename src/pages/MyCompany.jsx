import React from "react";

const MyCompany = () => {
  const description =
    "PrimeRental is a trusted real estate company located in Addis Ababa, Ethiopia. We specialize in selling and renting houses, offering quality homes tailored to your needs. Whether you're looking for your dream home or a rental property, PrimeRental is here to help.";

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start justify-center min-h-screen bg-gray-100 p-6">
      {/* Logo on the Left */}
      <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
      <img
        src="/logo192.png"
        alt="Prime Rental Logo"
        className="h-200 w-200 sm:h-12 sm:w-120"
      />
    </div>

      {/* Description on the Right */}
      <div className="md:w-2/3 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">PrimeRental</h1>
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MyCompany;
