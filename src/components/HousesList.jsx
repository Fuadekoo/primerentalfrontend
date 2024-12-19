import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '../helpers/axiousInstance';
import HouseCard from './HouseCard';
import { message } from 'antd';
import homePhoto from '../images/hero_bg_1.jpg';
import noData from '../images/nodatafound.png';
import Loading from './Loader';
import { HideLoading, ShowLoading } from '../redux/alertSlice';
import { useDispatch } from 'react-redux';

const HousesList = () => {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // Tab state
  const [homeTypes, setHomeTypes] = useState([]);
  const [selectedHomeType, setSelectedHomeType] = useState('');
  const dispatch = useDispatch();

  const TABS = [
    { label: "All", value: "all" },
    { label: "Rent", value: "rent" },
    { label: "Sell", value: "sell" },
  ];

  // Fetch all houses
  const fetchHouses = async () => {
    try {
      setLoading(true); // Set loading state
      dispatch(ShowLoading());
      const response = await axiosInstance.get('/getproperty');
      setHouses(response.data);
      setFilteredHouses(response.data);
    } catch (err) {
      setError('Failed to fetch houses');
      message.error("Error fetching houses");
    } finally {
      dispatch(HideLoading());
      setLoading(false); // Unset loading state
    }
  };

  // Fetch home types
  const fetchHomeTypes = async () => {
    try {
      const response = await axiosInstance.get('/hometypesearch');
      setHomeTypes(response.data);
    } catch (err) {
      message.error("Error fetching home types");
    }
  };

  useEffect(() => {
    fetchHouses();
    fetchHomeTypes();
  }, []);

  // Combined filter logic
  useEffect(() => {
    let filtered = houses;

    if (activeTab !== 'all') {
      filtered = filtered.filter(house => house.offer_type.toLowerCase() === activeTab);
    }

    if (searchTerm) {
      filtered = filtered.filter(house =>
        (house.title && house.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (house.location && house.location.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedHomeType) {
      filtered = filtered.filter(house => house.type_id === parseInt(selectedHomeType));
    }

    setFilteredHouses(filtered);
  }, [activeTab, searchTerm, selectedHomeType, houses]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Direct filtering is handled in useEffect
  };

  return (
    <div className="h-full w-full mt-1">
      <div
        className="relative bg-cover bg-center h-[400px] flex flex-col items-center justify-center rounded-xl"
        style={{ backgroundImage: `url(${homePhoto})` }}
      >
        <h1 className="text-white text-4xl font-bold mb-4"><span className='text-black'>Discover</span> <span className='text-red-800'>Dream Home</span></h1>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* TABS */}
          <div className="w-full md:w-auto flex gap-2">
            {TABS.map(({ label, value }) => (
              <button
                key={value}
                className={`px-4 py-2 rounded ${activeTab === value ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setActiveTab(value)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* HOME TYPE DROPDOWN */}
          <div className="w-full md:w-72 mt-4 md:mt-0">
            <select
              value={selectedHomeType}
              onChange={(e) => setSelectedHomeType(e.target.value)}
              className="bg-slate-100 p-2 rounded-lg w-full"
            >
              <option value="">Select Home Type</option>
              {homeTypes.map((homeType) => (
                <option key={homeType.id} value={homeType.id}>
                  {homeType.home_type}
                </option>
              ))}
            </select>
          </div>

          {/* SEARCH BAR */}
          <div className="w-full md:w-72 mt-4 md:mt-0">
            <form onSubmit={handleSearch} className="bg-slate-100 p-2 rounded-lg flex items-center">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search by title or location..."
                className="bg-transparent focus:outline-none w-full"
              />
              <button type="submit">
                <FaSearch className="text-slate-600" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* HOUSES LIST */}
      <div className="flex p-2 flex-wrap justify-center gap-6 overflow-y-auto h-70">
        {loading && <Loading />}
        {!loading && error && <p className="text-red-500">{error}</p>}
        {!loading && filteredHouses.length === 0 && <p>No houses found</p>}
        {!loading && filteredHouses.length > 0 && filteredHouses.map(house => (
          <HouseCard key={house.id} house={house} />
        ))}
      </div>
    </div>
  );
};

export default HousesList;