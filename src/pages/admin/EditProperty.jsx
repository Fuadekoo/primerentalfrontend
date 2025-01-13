import React, { useState, useEffect } from "react";
import axiosInstance from "../../helpers/axiousInstance"; // Import the axios instance
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import Loading from "../../components/Loader";
import { HideLoading, ShowLoading } from "../../redux/alertSlice";
import { useDispatch } from "react-redux";
import { FaTimes } from "react-icons/fa";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [property, setProperty] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    currency: "",
    type_id: "",
    youtube_link: "",
    tiktok_link: "",
    offer_type: "",
    status: 1,
    quantity: 1,
    bathrooms: "",
    kitchen: "",
    bedrooms: "",
    squaremeters: "",
    parking: "",
  });
  const [homeTypes, setHomeTypes] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHomeTypes = async () => {
      try {
        const response = await axiosInstance.get("/hometypes");
        setHomeTypes(response.data);
      } catch (error) {
        console.error("Error fetching home types:", error);
        message.error("Error fetching home types");
      }
    };
    fetchHomeTypes();
  }, []);

  useEffect(() => {
    // Fetch property details
    axiosInstance
      .get(`/properties/${id}`)
      .then((response) => {
        const property = response.data.property;
        setProperty({
          title: property.title,
          description: property.description,
          offer_type: property.offer_type,
          location: property.location,
          price: property.price,
          currency: property.currency,
          type_id: property.type_id,
          images: [],
          youtube_link: property.youtube_link,
          tiktok_link: property.tiktok_link,
          status: property.status,
          quantity: property.quantity,
          bathrooms: property.bathrooms,
          kitchen: property.kitchen,
          bedrooms: property.bedrooms,
          squaremeters: property.squaremeters,
          parking: property.parking,
        });
        setExistingImages(property.images);
      })
      .catch((error) => {
        message.error("Failed to load property.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProperty((prev) => ({ ...prev, images: [...e.target.files] }));
  };

  const handleRemoveImage = (index) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(property).forEach((key) => {
      if (key === "images") {
        property.images.forEach((image) => {
          formData.append("images[]", image);
        });
      } else {
        formData.append(key, property[key]);
      }
    });
    existingImages.forEach((image) => {
      formData.append("existing_images[]", image);
    });

    try {
      setLoading(true);
      dispatch(ShowLoading());
      const response = await axiosInstance.put(`/properties/${id}`, property, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        message.success("Property updated successfully.");
        navigate(`/properties/${id}`);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            message.error(`${key}: ${errors[key][0]}`);
          }
        }
      } else if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error response:", error.response.data);
        message.error(
          error.response.data.message || "Failed to update property"
        );
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error request:", error.request);
        message.error("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error message:", error.message);
        message.error("Failed to update property");
      }
    } finally {
      setLoading(false);
      dispatch(HideLoading());
    }
  };

  return (
    <div className="h-full w-full mt-1">
      {loading && <Loading />}
      <div className="bg-white shadow rounded-lg p-4">
        <h5 className="text-xl font-bold text-gray-800">Edit Property</h5>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              value={property.title}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="offer_type"
            >
              Offer Type
            </label>
            <select
              name="offer_type"
              value={property.offer_type}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Offer Type</option>
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Location
            </label>
            <input
              type="text"
              name="location"
              value={property.location}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              value={property.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="currency"
            >
              Currency
            </label>
            <select
              name="currency"
              value={property.currency}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Currency</option>
              <option value="ETB">ETB</option>
              <option value="USD">USD</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="type_id"
            >
              Home Type
            </label>
            <select
              name="type_id"
              value={property.type_id}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Select Home Type</option>
              {homeTypes.map((homeType) => (
                <option key={homeType.id} value={homeType.id}>
                  {homeType.home_type}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="images"
            >
              Images
            </label>
            {/* <input
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            /> */}
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {existingImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Property ${index}`}
                  className="w-24 h-24 object-cover rounded"
                />
                {/* <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <FaTimes />
                </button> */}
              </div>
            ))}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="youtube_link"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="tiktok_link"
            >
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quantity"
            >
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={property.quantity}
              onChange={handleChange}
              min="1"
              max="50"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bathrooms"
              >
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={property.bathrooms}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="kitchen"
              >
                Kitchen
              </label>
              <input
                type="number"
                name="kitchen"
                value={property.kitchen}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="bedrooms"
              >
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={property.bedrooms}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="squaremeters"
              >
                Square Meters
              </label>
              <input
                type="number"
                name="squaremeters"
                value={property.squaremeters}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="parking"
              >
                Parking
              </label>
              <select
                name="parking"
                value={property.parking}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Parking</option>
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
