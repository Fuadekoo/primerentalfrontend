import React from 'react';

const Filter = () => {
  return (
    <div className="container mx-auto mt-8">
      <form className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="list-types" className="block text-gray-700">Listing Types</label>
            <select id="list-types" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option value="">Condo</option>
              <option value="">Commercial Building</option>
              <option value="">Land Property</option>
            </select>
          </div>
          <div>
            <label htmlFor="offer-types" className="block text-gray-700">Offer Type</label>
            <select id="offer-types" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option value="">For Sale</option>
              <option value="">For Rent</option>
              <option value="">For Lease</option>
            </select>
          </div>
          <div>
            <label htmlFor="select-city" className="block text-gray-700">Select City</label>
            <select id="select-city" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">
              <option value="">New York</option>
              <option value="">Brooklyn</option>
              <option value="">London</option>
              <option value="">Japan</option>
              <option value="">Philippines</option>
            </select>
          </div>
          <div className="flex items-end">
            <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm">Search</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filter;