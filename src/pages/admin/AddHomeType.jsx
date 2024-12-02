import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axiousInstance';
import { message } from 'antd';

const AddHomeType = () => {
    const navigate = useNavigate();
    const [homeType, setHomeType] = useState({
        home_type: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHomeType(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/hometypes', homeType);
            message.success("Home type added successfully");
            navigate('/manage/hometype');
        } catch (error) {
            console.error("Error adding home type:", error);
            message.error("Error adding home type");
        }
    };

    return (
        <div className="h-full w-full mt-1">
            <div className="bg-white shadow rounded-lg p-4">
                <h5 className="text-xl font-bold text-gray-800">Add Home Type</h5>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="home_type">
                            Home Type
                        </label>
                        <input
                            type="text"
                            name="home_type"
                            value={homeType.home_type}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Add
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/manage/hometype')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHomeType;