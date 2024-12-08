import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helpers/axiousInstance';
import { motion } from 'framer-motion';
import Loading from '../../components/Loader';
import { HideLoading, ShowLoading } from '../../redux/alertSlice';
import { useDispatch } from 'react-redux';
import { message } from 'antd';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axiosInstance.get('/dashboard');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        message.error('Failed to load dashboard data.');
      } finally {
        dispatch(HideLoading());
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Total Houses</h2>
          <p className="text-gray-600">{data.total_houses}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Accepted Bookings</h2>
          <p className="text-gray-600">{data.accepted_bookings}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Rejected Bookings</h2>
          <p className="text-gray-600">{data.rejected_bookings}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;