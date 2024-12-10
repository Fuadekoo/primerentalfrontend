import React, { useEffect, useState } from 'react';
import { FaSearch, FaUser, FaHome } from 'react-icons/fa';
import axiosInstance from '../../helpers/axiousInstance'; // Import the axios instance
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loader';
import { HideLoading, ShowLoading } from '../../redux/alertSlice';
import { useDispatch } from 'react-redux';

const AdminNotification = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3; // Adjust this value for the number of bookings per page
  const totalPages = Math.ceil(filteredBookings.length / bookingsPerPage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const TABS = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];

  const TABLE_HEAD = [
    "User ID",
    "Property ID",
    "Phone Number",
    "Booked Date",
    "Status",
    "Actions",
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

    fetchBookings();
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

  const handleStatusChange = async (bookingId, status) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.put(`/bookings/${bookingId}/status`, { status });
      if (response.data.success) {
        message.success(`Booking ${status} successfully.`);
        setBookings((prev) =>
          prev.map((booking) =>
            booking.id === bookingId ? { ...booking, status } : booking
          )
        );
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      message.error('Failed to update booking status.');
    } finally {
      dispatch(HideLoading());
    }
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
            {currentBookings.map((booking) => (
              <tr key={booking.id} className="cursor-pointer">
                <td className="p-2 border-b border-blue-gray-50">
                  <FaUser
                    className="text-xl text-blue-500 cursor-pointer"
                    onClick={() => navigate(`/user/${booking.user_id}`)}
                  />
                  <span className="ml-2">{booking.user_id}</span>
                </td>
                <td className="p-2 border-b border-blue-gray-50">
                  <FaHome
                    className="text-xl text-blue-500 cursor-pointer"
                    onClick={() => navigate(`/property-detail/${booking.property_id}`)}
                  />
                  <span className="ml-2">{booking.property_id}</span>
                </td>
                <td className="p-2 border-b border-blue-gray-50">{booking.phone_number}</td>
                <td className="p-2 border-b border-blue-gray-50">{new Date(booking.created_at).toLocaleDateString()}</td>
                <td className="p-2 border-b border-blue-gray-50">{booking.status}</td>
                <td className="p-2 border-b border-blue-gray-50">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleStatusChange(booking.id, 'approved')}
                  >
                    Verify
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleStatusChange(booking.id, 'rejected')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
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