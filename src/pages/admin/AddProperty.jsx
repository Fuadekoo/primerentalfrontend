import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../helpers/axiousInstance';
import { message } from 'antd';

const AddProperty = () => {
    const navigate = useNavigate();
    const [property, setProperty] = useState({
        title: '',
        description: '',
        location: '',
        price: '',
        type_id: '',
        images: [],
        youtube_link: '',
        tiktok_link: '',
        offer_type: '', 
        status: 1
    });
    const [homeTypes, setHomeTypes] = useState([]);

    useEffect(() => {
        const fetchHomeTypes = async () => {
            try {
                const response = await axiosInstance.get('/hometypes');
                setHomeTypes(response.data);
            } catch (error) {
                console.error("Error fetching home types:", error);
                message.error("Error fetching home types");
            }
        };
        fetchHomeTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        setProperty(prevState => ({
            ...prevState,
            images: [...e.target.files]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(property).forEach(key => {
            if (key === 'images') {
                property.images.forEach(image => {
                    formData.append('images[]', image);
                });
            } else {
                formData.append(key, property[key]);
            }
        });

        try {
            await axiosInstance.post('/properties', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            message.success("Property added successfully");
            navigate('/manage/property');
        } catch (error) {
            console.error("Error adding property:", error);
            if (error.response && error.response.data) {
                message.error(`Error: ${error.response.data.message}`);
            } else {
                message.error("Error adding property");
            }
        }
    };

    return (
        <div className="h-full w-full mt-1">
            <div className="bg-white shadow rounded-lg p-4">
                <h5 className="text-xl font-bold text-gray-800">Add Property</h5>
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={property.title}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={property.description}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="offer_type">
                            Offer Type
                        </label>
                        <select
                            name="offer_type"
                            value={property.offer_type}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Offer Type</option>
                            <option value="sell">sell</option>
                            <option value="rent">Rent</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={property.location}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={property.price}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type_id">
                            Home Type
                        </label>
                        <select
                            name="type_id"
                            value={property.type_id}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        >
                            <option value="">Select Home Type</option>
                            {homeTypes.map(homeType => (
                                <option key={homeType.id} value={homeType.id}>
                                    {homeType.home_type}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="images">
                            Images
                        </label>
                        <input
                            type="file"
                            name="images"
                            multiple
                            onChange={handleImageChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="youtube_link">
                            YouTube Link
                        </label>
                        <input
                            type="text"
                            name="youtube_link"
                            value={property.youtube_link}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tiktok_link">
                            TikTok Link
                        </label>
                        <input
                            type="text"
                            name="tiktok_link"
                            value={property.tiktok_link}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                            onClick={() => navigate('/manage/property')}
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

export default AddProperty;