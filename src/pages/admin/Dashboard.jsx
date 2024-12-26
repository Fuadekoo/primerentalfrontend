import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helpers/axiousInstance';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import Loading from '../../components/Loader';
import { HideLoading, ShowLoading } from '../../redux/alertSlice';
import { useDispatch } from 'react-redux';
import { message } from 'antd';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell
} from 'recharts';

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

  const houseData = [
    { name: 'Active Houses', value: data.active_houses },
    { name: 'Inactive Houses', value: data.inactive_houses },
  ];

  const bookingData = [
    { name: 'Pending', value: data.total_bookings.pending },
    { name: 'Approved', value: data.total_bookings.approved },
    { name: 'Rejected', value: data.total_bookings.rejected },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Total Houses</h2>
          <p className="text-gray-600">{data.total_houses}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Accepted Bookings</h2>
          <p className="text-gray-600">{data.total_bookings.approved}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold">Rejected Bookings</h2>
          <p className="text-gray-600">{data.total_bookings.rejected}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">House Status</h2>
          <PieChart width={300} height={300}>
            <Pie
              data={houseData}
              cx={150}
              cy={150}
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {houseData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4">Booking Status</h2>
          <BarChart
            width={300}
            height={300}
            data={bookingData}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
      {/* <div className="bg-white shadow rounded-lg p-4 mt-4">
        <h2 className="text-xl font-bold">Total Users</h2>
        <p className="text-gray-600">{data.total_users}</p>
      </div> */}
      <Footer /> 
    </div>
     

  );
};

export default Dashboard;