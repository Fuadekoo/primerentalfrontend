import React, { useEffect, useState } from 'react';
import axiosInstance from '../helpers/axiousInstance'; // Correct import
import HouseCard from './HouseCard';

const HousesList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axiosInstance.get('/properties');
        setHouses(response.data);
      } catch (err) {
        setError('Failed to fetch houses');
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="flex p-2 flex-wrap justify-center gap-6 overflow-y-auto h-70">
      {houses.map((house) => (
        <HouseCard key={house.id} house={house} />
      ))}
    </div>
  );
};

export default HousesList;