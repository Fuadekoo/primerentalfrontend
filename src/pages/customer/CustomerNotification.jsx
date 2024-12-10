import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helpers/axiousInstance'; // Import the axios instance
import { message } from 'antd';

function CustomerNotification() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get('/bookings/mybookings');
        const approvedBookings = response.data.bookings.filter(booking => booking.status === 'approved');
        setBookings(approvedBookings);
      } catch (error) {
        message.error('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const isToday = (date) => {
    const today = new Date();
    const givenDate = new Date(date);
    return (
      today.getFullYear() === givenDate.getFullYear() &&
      today.getMonth() === givenDate.getMonth() &&
      today.getDate() === givenDate.getDate()
    );
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Approved Bookings</h1>
      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className={`bg-white shadow-lg rounded-lg p-4 ${isToday(booking.updated_at) ? 'bg-red-100' : ''}`}
            >
              <h2 className="text-xl font-bold mb-2">Booking ID: {booking.id}</h2>
              <p className="text-gray-700 mb-2">Property ID: {booking.property_id}</p>
              <p className="text-gray-700 mb-2">User ID: {booking.user_id}</p>
              <p className="text-gray-700 mb-2">Phone Number: {booking.phone_number}</p>
              <p className="text-gray-700 mb-2">Description: {booking.description}</p>
              <p className="text-gray-700 mb-2">Status: {booking.status}</p>
              <p className="text-gray-700 mb-2">booked Date: {new Date(booking.created_at).toLocaleDateString()}</p>
              <p className="text-gray-700 mb-2">Approved Date: {new Date(booking.updated_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No approved bookings available.</p>
      )}
    </div>
  );
}

export default CustomerNotification;