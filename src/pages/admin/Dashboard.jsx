import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helpers/axiousInstance';
import { motion } from 'framer-motion';
import Loading from '../../components/Loader';
import { HideLoading, ShowLoading } from '../../redux/alertSlice';
import { useDispatch } from 'react-redux';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await axiosInstance.get('/dashboard');
        setData(response.data);
        dispatch(HideLoading());
      } catch (error) {
        dispatch(HideLoading());
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  if (!data) {
    return <Loading />;
  }

  const cards = [
    { title: 'total Users', count: data.userCount },
    { title: 'blocked user', count: data.houseCount },
    { title: 'unblock user', count: data.bookingCount },
    { title: 'total House', count: data.bookingCount },
    { title: 'blocked House', count: data.bookingCount },
    { title: 'active House', count: data.bookingCount },


  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <h2 className="text-xl font-bold mb-2">{card.title}</h2>
          <p className="text-3xl">{card.count}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Dashboard;