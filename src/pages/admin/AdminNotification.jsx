import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '../../helpers/axiousInstance'; // Import the axios instance
import { message } from 'antd';
import { Link } from 'react-router-dom';
import Loading from '../../components/Loader';
import { HideLoading, ShowLoading } from '../../redux/alertSlice';
import { useDispatch } from 'react-redux';

const AdminNotification = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState({});
  const [properties, setProperties] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3; // Adjust this value for the number of bookings per page
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const dispatch = useDispatch();

  const TABS = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Done", value: "done" },
    { label: "Rejected", value: "rejected" },
  ];

  const TABLE_HEAD = [
    "User",
    "Property",
    "Phone Number",
    "Booked Date",
    "Status",
  ];

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axiosInstance.get('/bookings');
        setBookings(response.data.data);
        setFilteredBookings(response.data.data);
      } catch (error) {
        message.error('Failed to load bookings.');
      } finally {
        dispatch(HideLoading());
        setLoading(false);
      }
    };

    const fetchUsers = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axiosInstance.get('/getUsers');
        const usersData = response.data.data.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUsers(usersData);
      } catch (error) {
        message.error('Failed to load users.');
      } finally {
        dispatch(HideLoading());
      }
    };

    const fetchProperties = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axiosInstance.get('/properties');
        const propertiesData = response.data.data.reduce((acc, property) => {
          acc[property.id] = property;
          return acc;
        }, {});
        setProperties(propertiesData);
      } catch (error) {
        message.error('Failed to load properties.');
      } finally {
        dispatch(HideLoading());
      }
    };

    fetchBookings();
    fetchUsers();
    fetchProperties();
  }, [dispatch]);

  useEffect(() => {
    filterBookings();
  }, [statusFilter, searchTerm, bookings]);

  const filterBookings = () => {
    let filtered = bookings;

    if (statusFilter !== 'all') {
      filtered = filtered.filter((booking) => booking.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter((booking) =>
        booking.phone_number.toString().includes(searchTerm)
      );
    }

    setFilteredBookings(filtered);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-full w-full mt-1">
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center justify-between gap-1">
          <div>
            <h5 className="text-xl font-bold text-gray-800">Bookings</h5>
            <p className="text-gray-600 mt-1">See all bookings</p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-1 md:flex-row mt-4">
          <div className="w-full md:w-max flex gap-2">
            {TABS.map(({ label, value }) => (
              <button
                key={value}
                className={`px-4 py-2 rounded ${statusFilter === value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                onClick={() => setStatusFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="w-full md:w-72 mt-4 md:mt-0">
            <form onSubmit={(e) => e.preventDefault()} className='bg-slate-100 p-1 rounded-lg flex items-center'>
              <input 
                value={searchTerm} 
                onChange={handleSearchChange} 
                type='text' 
                placeholder='Search by phone number...' 
                className='bg-transparent focus:outline-none w-24 sm:w-64' 
              />
              <button type="submit">
                <FaSearch className='text-slate-600' />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="overflow-scroll px-0 mt-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1"
                >
                  <span className="text-sm font-normal text-blue-gray-600 opacity-70">
                    {head}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking) => {
              const user = users[booking.user_id];
              const property = properties[booking.property_id];
              return (
                <tr key={booking.id} className="cursor-pointer">
                  <td className="p-2 border-b border-blue-gray-50">
                    {user ? (
                      <div className="flex items-center gap-2">
                        <img src={user.avatar} alt={user.name} className="rounded-full h-10 w-10 object-cover" />
                        <div className="flex flex-col">
                          <span className="text-sm font-normal text-blue-gray-600">{user.name}</span>
                          <span className="text-sm font-normal text-blue-gray-400">{user.email}</span>
                        </div>
                      </div>
                    ) : (
                      'Loading...'
                    )}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50">
                    {property ? (
                      <Link to={`/property/${property.id}`} className="text-blue-500 hover:underline">
                        {property.title}
                      </Link>
                    ) : (
                      'Loading...'
                    )}
                  </td>
                  <td className="p-2 border-b border-blue-gray-50">{booking.phone_number}</td>
                  <td className="p-2 border-b border-blue-gray-50">{new Date(booking.created_at).toLocaleDateString()}</td>
                  <td className="p-2 border-b border-blue-gray-50">{booking.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t border-blue-gray-50 p-1 mt-4">
        <div className="flex items-center">
          <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
          <div className="inline-flex">
            <button
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-l'
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-r'
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
        <span className="text-sm font-normal text-blue-gray-600">
          Total: {filteredBookings.length}
        </span>
      </div>
    </div>
  );
};

export default AdminNotification;