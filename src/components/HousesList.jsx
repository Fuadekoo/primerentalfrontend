import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '../helpers/axiousInstance'; // Correct import
import HouseCard from './HouseCard';
import { message } from 'antd';

const HousesList = () => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchHouses = async (searchTerm = '') => {
    try {
      const response = await axiosInstance.get('/getproperty', {
        params: { searchTerm }
      });
      setHouses(response.data);
      setFilteredHouses(response.data);
    } catch (err) {
      setError('Failed to fetch houses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.get('/getproperty', {
        params: { searchTerm }
      });
      setFilteredHouses(response.data);
    } catch (error) {
      console.error("Error fetching houses:", error);
      message.error("Error fetching houses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFilteredHouses(houses.filter(house =>
      (house.title && house.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (house.location && house.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (house.description && house.description.toLowerCase().includes(searchTerm.toLowerCase()))
    ));
  }, [searchTerm, houses]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <div className="flex items-center bg-slate-100 p-1 rounded-lg">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search houses..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </div>
      </form>
      <div className="flex p-2 flex-wrap justify-center gap-6 overflow-y-auto h-70">
        {filteredHouses.map((house) => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default HousesList;