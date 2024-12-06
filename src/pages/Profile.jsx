import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../helpers/axiousInstance'; // Import the axios instance
import { message } from 'antd';

const Profile = () => {
  const fileInputRef = useRef(null);
  const { user } = useSelector((state) => state.users); // Get user from Redux store
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    confirmPassword: '',
    avatar: null,
  });
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch user profile
    axiosInstance
      .get('/getprofilephoto')
      .then((response) => {
        const { name, avatar_url } = response.data.data;
        setFormData((prev) => ({ ...prev, name }));
        setPreview(avatar_url);
      })
      .catch((error) => {
        message.error('Failed to load profile.');
      });
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, avatar: file }));
    setPreview(URL.createObjectURL(file));

    const data = new FormData();
    data.append('avatar', file);

    try {
      setLoading(true);
      const response = await axiosInstance.post('/profile/photo', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        message.success('Profile photo updated successfully.');
        setPreview(response.data.data.avatar_url); // Update the preview with the new avatar URL
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error('Failed to update profile photo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      message.error('Passwords do not match.');
      return;
    }

    const data = {
      name: formData.name,
    };
    if (formData.password) {
      data.password = formData.password;
      data.password_confirmation = formData.confirmPassword;
    }

    try {
      setLoading(true);
      const response = await axiosInstance.put('/profile/info', data);

      if (response.data.success) {
        message.success('Profile information updated successfully.');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      message.error('Failed to update profile information.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl font-bold text-center mb-4">Update Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />
        <img
          src={preview}
          alt="Profile"
          className="h-24 w-24 rounded-full object-cover mx-auto cursor-pointer"
          onClick={() => fileInputRef.current.click()}
        />
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Name"
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          id="email"
          value={user.email} // Display user email from Redux store
          placeholder="Email"
          className="border p-2 rounded"
          disabled
        />
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleInputChange}
          placeholder="New Password"
          className="border p-2 rounded"
        />
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          placeholder="Confirm Password"
          className="border p-2 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;