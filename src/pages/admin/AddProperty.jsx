import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helpers/axiousInstance'; // Import the axios instance
import { useParams, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { FaTimes } from 'react-icons/fa';

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    offer_type: '',
    location: '',
    price: '',
    type_id: '',
    images: [],
  });
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch property details
    axiosInstance
      .get(`/properties/${id}`)
      .then((response) => {
        const property = response.data.property;
        setFormData({
          title: property.title,
          description: property.description,
          offer_type: property.offer_type,
          location: property.location,
          price: property.price,
          type_id: property.type_id,
          images: [],
        });
        setExistingImages(property.images);
      })
      .catch((error) => {
        console.error('Failed to load property:', error);
        message.error('Failed to load property.');
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleRemoveImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('offer_type', formData.offer_type);
    data.append('location', formData.location);
    data.append('price', formData.price);
    data.append('type_id', formData.type_id);
    formData.images.forEach((image) => {
      data.append('images[]', image);
    });
    existingImages.forEach((image) => {
      data.append('existing_images[]', image);
    });

    try {
      setLoading(true);
      const response = await axiosInstance.put(`/properties/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        message.success('Property updated successfully.');
        navigate(`/properties/${id}`);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Failed to update property:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            message.error(errors[key][0]);
          }
        }
      } else {
        message.error('Failed to update property.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl font-bold text-center mb-4">Edit Property</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="border p-2 rounded"
          required
        />
        <textarea
          id="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          id="offer_type"
          value={formData.offer_type}
          onChange={handleInputChange}
          placeholder="Offer Type"
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={handleInputChange}
          placeholder="Location"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          id="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          id="type_id"
          value={formData.type_id}
          onChange={handleInputChange}
          placeholder="Type ID"
          className="border p-2 rounded"
          required
        />
        <input
          type="file"
          id="images"
          multiple
          onChange={handleFileChange}
          className="border p-2 rounded"
        />
        <div className="flex flex-wrap gap-2">
          {existingImages.map((image, index) => (
            <div key={index} className="relative">
              <img src={image} alt={`Property ${index}`} className="w-24 h-24 object-cover rounded" />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Updating...' : 'Update Property'}
        </button>
      </form>
    </div>
  );
};

export default EditProperty;