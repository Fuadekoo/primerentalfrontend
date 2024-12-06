import React, { useEffect, useState } from 'react';
import axiosInstance from '../helpers/axiosInstance';
import { Spin, message } from 'antd';

const withCartCheck = (WrappedComponent) => {
  return (props) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
      try {
        const response = await axiosInstance.get('/bookings/mybookings');
        setBookings(response.data.bookings);
        setLoading(false);
      } catch (error) {
        message.error('Error fetching bookings');
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchBookings();
    }, []);

    if (loading) {
      return <Spin size="large" />;
    }

    if (bookings.length === 0) {
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
          <p className="text-center text-gray-500">Your cart is empty.</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

export default withCartCheck;