import React, { useState, useEffect } from 'react';
import axiosInstance from '../helpers/axiousInstance'; // Correct import

const Filter = ({ onSearch }) => {
  const [listingTypes, setListingTypes] = useState([]);
  const [type, setType] = useState('');
  const [offerType, setOfferType] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchListingTypes = async () => {
      try {
        const response = await axiosInstance.get('/hometypes'); // Adjust the endpoint as necessary
        setListingTypes(response.data);
      } catch (error) {
        console.error('Error fetching listing types:', error);
      }
    };

    fetchListingTypes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ type, offerType, city });
  };

  return (
    <div
      className="container mx-auto mt-8 bg-cover bg-center p-6 rounded-lg shadow-lg bg-slate-800"
      style={{ backgroundImage: "url('images/hero_bg_1.jpg')" }} // Replace with your image URL
    >
      <div className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label htmlFor="list-types" className="block text-gray-700">Listing Types</label>
              <select
                id="list-types"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Select Type</option>
                {listingTypes.map((listingType) => (
                  <option key={listingType.id} value={listingType.id}>
                    {listingType.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="offer-types" className="block text-gray-700">Offer Type</label>
              <select
                id="offer-types"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                value={offerType}
                onChange={(e) => setOfferType(e.target.value)}
              >
                <option value="">Select Offer Type</option>
                <option value="For Sale">For Sale</option>
                <option value="For Rent">For Rent</option>
              </select>
            </div>
            <div>
              <label htmlFor="select-city" className="block text-gray-700">Select City</label>
              <input
                type="text"
                id="select-city"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
              />
            </div>
            <div className="flex items-end">
              <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-sm">Search</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;