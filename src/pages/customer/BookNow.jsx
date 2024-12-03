import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../helpers/axiousInstance';
import { message } from 'antd';
import { usePopper } from 'react-popper';

const BookNow = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);
  const [showWidget, setShowWidget] = useState(false);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [description, setDescription] = useState('');
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'offset', options: { offset: [10, 10] } }],
  });

  const fetchProperty = async () => {
    try {
      const response = await axiosInstance.get(`/properties/${id}`);
      setProperty(response.data.property);
    } catch (error) {
      message.error('Error fetching property details');
    }
  };

  const fetchFeedbacks = async () => {
    try {
      const response = await axiosInstance.get(`/feedback/${id}`);
      setFeedbacks(response.data.feedback);
    } catch (error) {
      message.error('Error fetching feedbacks');
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/feedback/${id}`, { feedback, rating });
      setFeedback('');
      setRating(5);
      fetchFeedbacks();
      message.success('Feedback submitted successfully');
    } catch (error) {
      message.error('Error submitting feedback');
    }
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/bookings/properties/${id}`, {
        phone_number: phoneNumber,
        description,
      });
      message.success(response.data.message);
      setPhoneNumber('');
      setDescription('');
    } catch (error) {
      message.error('Error creating booking');
    }
  };

  useEffect(() => {
    fetchProperty();
    fetchFeedbacks();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={property.image} alt={property.title} className="w-full h-64 object-cover" />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
          <p className="text-gray-700 mb-4">{property.description}</p>
          <p className="text-gray-700 mb-4">Location: {property.location}</p>
          <p className="text-gray-700 mb-4">Price: ${property.price}</p>
          <p className="text-gray-700 mb-4">Type: {property.type_id}</p>
          <p className="text-gray-700 mb-4">Status: {property.status ? 'Active' : 'Not Active'}</p>
        </div>
      </div>

      {/* Booking Form */}
      <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
        <h2 className="text-xl font-bold mb-4">Book this House</h2>
        <form onSubmit={handleBookingSubmit}>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-400 rounded-md"
              placeholder="Enter additional details"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Submit Booking
          </button>
        </form>
      </div>

      <button
        onClick={() => setShowWidget(!showWidget)}
        ref={setReferenceElement}
        className="fixed bottom-4 right-4 p-2 rounded-l-lg rounded-t-lg bg-blue-700 hover:bg-blue-600 shadow-md hover:shadow-lg text-white"
        type="button"
      >
        Feedback?
      </button>
      {showWidget && (
        <div
          className="bg-white p-4 rounded-md shadow-lg max-w-xs sm:max-w-md w-full fixed bottom-16 right-4 sm:relative sm:bottom-auto sm:right-auto"
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          <h2 className="text-xl font-bold mb-4">Feedbacks</h2>
          {feedbacks.length > 0 ? (
            feedbacks.map((fb, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg mb-4">
                <p>{fb.feedback}</p>
                <p>Rating: {fb.rating}</p>
                <p className="text-gray-500 text-sm">{new Date(fb.created_at).toLocaleString()}</p>
              </div>
            ))
          ) : (
            <p>No feedbacks available.</p>
          )}
          <form onSubmit={handleFeedbackSubmit}>
            <label htmlFor="feedback">How can we improve?</label>
            <div className="flex flex-col space-y-2">
              <textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="p-2 h-24 w-full border border-gray-400 rounded-md"
                placeholder="Leave your feedback"
              ></textarea>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="p-2 border border-gray-400 rounded-md"
              >
                {[1, 2, 3, 4, 5].map((rate) => (
                  <option key={rate} value={rate}>
                    {rate}
                  </option>
                ))}
              </select>
              <button
                className="p-2 ml-auto rounded-lg bg-blue-700 hover:bg-blue-600 shadow-md hover:shadow-lg text-white"
                type="submit"
              >
                Send Feedback
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookNow;
