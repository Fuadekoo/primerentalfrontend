import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helpers/axiousInstance'; // Import the axios instance
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import Loading from '../../components/Loader';
import { HideLoading, ShowLoading } from '../../redux/alertSlice';
import { useDispatch } from 'react-redux';

function EditHomeType() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [homeType, setHomeType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch home type details
    axiosInstance
      .get(`/hometypes/${id}`)
      .then((response) => {
        setHomeType(response.data.home_type.home_type);
      })
      .catch((error) => {
        message.error('Failed to load home type.');
      });
  }, [id]);

  const handleChange = (e) => {
    setHomeType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      dispatch(ShowLoading());
      const response = await axiosInstance.put(`/hometypes/${id}`, { home_type: homeType });

      if (response.data.message) {
        message.success(response.data.message);
        navigate('/manage/hometype');
      } else {
        message.error('Failed to update home type.');
      }
    } catch (error) {
      message.error('Failed to update home type.');
    } finally {
      setLoading(false);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="h-full w-full mt-1">
      {loading && <Loading />}
      <div className="bg-white shadow rounded-lg p-4">
        <h5 className="text-xl font-bold text-gray-800">Edit Home Type</h5>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="home_type">
              Home Type
            </label>
            <input
              type="text"
              name="home_type"
              value={homeType}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Home Type
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHomeType;