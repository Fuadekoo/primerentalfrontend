import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../helpers/axiousInstance";
import { message } from "antd";
import { usePopper } from "react-popper";
import {
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaTiktok,
  FaBath,
  FaBed,
  FaCar,
  FaRulerCombined,
  FaUtensils,
  FaStar,
  FaRegStar,
  FaShareAlt,
} from "react-icons/fa";

const BookNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(5);
  const [showWidget, setShowWidget] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false); // State to control booking form visibility
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [typeName, setTypeName] = useState(""); // State to store the type name
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: "offset", options: { offset: [10, 10] } }],
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Check if the page has been loaded before
  useEffect(() => {
    if (!sessionStorage.getItem("hasLoadedBookNow")) {
      sessionStorage.setItem("hasLoadedBookNow", "true");
      window.location.reload();
    }
  }, []);

  const fetchProperty = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/properties/${id}`);
      setProperty(response.data.property);
      fetchTypeName(response.data.property.type_id); // Fetch the type name
    } catch (error) {
      message.error("Error fetching property details");
    }
  }, [id]);

  const fetchTypeName = async (typeId) => {
    try {
      const response = await axiosInstance.get(`/myHomeType/${typeId}`);
      setTypeName(response.data.home_type);
    } catch (error) {
      message.error("Error fetching type name");
    }
  };

  const fetchFeedbacks = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/feedback/${id}`);
      setFeedbacks(response.data.feedback);
    } catch (error) {}
  }, [id]);

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/feedback/${id}`, { feedback, rating });
      setFeedback("");
      setRating(5);
      fetchFeedbacks();
      message.success("Feedback submitted successfully");
    } catch (error) {
      message.error("Error submitting feedback");
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
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
      setPhoneNumber("");
      setDescription("");
      navigate("/cart"); // Redirect to cart page
    } catch (error) {
      message.error("Error creating booking");
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchProperty();
    fetchFeedbacks();
  }, [fetchProperty, fetchFeedbacks]);

  useEffect(() => {
    if (showBookingForm) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  }, [showBookingForm]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Validate and transform YouTube URL
  const getYouTubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (
        urlObj.hostname.includes("youtube.com") &&
        urlObj.searchParams.get("v")
      ) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
      }
      if (urlObj.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
      }
    } catch {
      return null;
    }
    return null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(property.youtube_link);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    message.success("URL copied to clipboard!");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="flex flex-col">
          <div className="relative h-[320px] sm:h-[220px] md:h-[500px] w-full">
            {property.images && property.images.length > 0 && (
              <img
                src={property.images[currentImageIndex]}
                alt={`property-image-${currentImageIndex}`}
                className="h-full w-full object-cover"
              />
            )}
            {property.images && property.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
                >
                  <FaChevronLeft />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
          {youtubeEmbedUrl && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-4">
                Property Video{" "}
                {property.tiktok_link && (
                  <a
                    href={property.tiktok_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 text-gray-700 hover:text-gray-900"
                  >
                    <FaTiktok size={24} />
                  </a>
                )}
              </h2>
              <div className="h-[320px] sm:h-[220px] md:h-[500px]">
                <iframe
                  className="w-full h-full"
                  src={youtubeEmbedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
            <button
              onClick={handleShare}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <FaShareAlt className="inline-block mr-2" />
              Share
            </button>
          </div>
          <p className="text-gray-700 mb-4">{property.description}</p>
          <p className="text-gray-700 mb-4">Location: {property.location}</p>
          <p className="text-gray-700 mb-4">Price: ${property.price}</p>
          <p className="text-gray-700 mb-4">Type: {typeName}</p>
          <p className="text-gray-700 mb-4">
            Status: {property.status ? "Active" : "Not Active"}
          </p>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center text-gray-700">
              <FaBed className="mr-2 text-xl" /> {property.bedrooms} Bedrooms
            </div>
            <div className="flex items-center text-gray-700">
              <FaBath className="mr-2 text-xl" /> {property.bathrooms} Bathrooms
            </div>
            <div className="flex items-center text-gray-700">
              <FaUtensils className="mr-2 text-xl" /> {property.kitchen} Kitchen
            </div>
            <div className="flex items-center text-gray-700">
              <FaRulerCombined className="mr-2 text-xl" />{" "}
              {property.squaremeters} m²
            </div>
            <div className="flex items-center text-gray-700">
              <FaCar className="mr-2 text-xl" /> {property.parking} Parking
            </div>
          </div>
          <button
            onClick={() => setShowBookingForm(!showBookingForm)}
            className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            Next
            <FaChevronDown className="inline-block ml-2" />
          </button>
        </div>
      </div>

      {/* Booking Form */}
      {showBookingForm && (
        <div className="bg-white shadow-lg rounded-lg p-4 mt-4">
          <h2 className="text-xl font-bold mb-4">Book this House</h2>
          <form onSubmit={handleBookingSubmit}>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-700 font-bold mb-2"
              >
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
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
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
              className="bg-slate-800 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Submit Booking
            </button>
          </form>
        </div>
      )}

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
                <p>
                  Rating:{" "}
                  {Array.from({ length: fb.rating }, (_, i) => (
                    <FaStar key={i} className="text-yellow-500 inline-block" />
                  ))}
                  {Array.from({ length: 5 - fb.rating }, (_, i) => (
                    <FaRegStar
                      key={i}
                      className="text-yellow-500 inline-block"
                    />
                  ))}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(fb.created_at).toLocaleString()}
                </p>
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
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((rate) => (
                  <FaStar
                    key={rate}
                    className={`cursor-pointer ${
                      rate <= rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => setRating(rate)}
                  />
                ))}
              </div>
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
