import React, { useEffect, useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axiosInstance from '../../helpers/axiousInstance';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const PropertyManage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [homeTypes, setHomeTypes] = useState([]);
    const [activeTab, setActiveTab] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const propertiesPerPage = 3; // Adjust this value for the number of properties per page
    const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

    const TABS = [
        { label: "All", value: "all" },
        { label: "Active Houses", value: "active" },
        { label: "Rented/Sold Houses", value: "rented_sold" },
    ];

    const TABLE_HEAD = [
        "Title",
        "Location",
        "Price",
        "Type",
        "Status",
        "Actions"
    ];

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`/getproperty?searchTerm=${searchTerm}`);
            setFilteredProperties(response.data);
            setCurrentPage(1); // Reset to first page on new search
        } catch (error) {
            console.error("Error fetching properties:", error);
            message.error("Error fetching properties");
        }
    };

    const handleEdit = (propertyId) => {
        navigate(`/edit-property/${propertyId}`);
    };

    const handleDelete = async (propertyId) => {
        try {
            await axiosInstance.delete(`/properties/${propertyId}`);
            const response = await axiosInstance.get('/getproperty');
            setProperties(response.data);
            setFilteredProperties(response.data);
            message.success("Property deleted successfully");
        } catch (error) {
            console.error("Error deleting property:", error);
            message.error("Error deleting property");
        }
    };

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axiosInstance.get('/getproperty');
                setProperties(response.data);
                setFilteredProperties(response.data); // Initialize filtered properties
            } catch (error) {
                console.error("Error fetching properties:", error);
                message.error("Error fetching properties");
            }
        };

        const fetchHomeTypes = async () => {
            try {
                const response = await axiosInstance.get('/hometypes');
                setHomeTypes(response.data);
            } catch (error) {
                console.error("Error fetching home types:", error);
                message.error("Error fetching home types");
            }
        };

        fetchProperties();
        fetchHomeTypes();
    }, []);

    useEffect(() => {
        let filtered;
        if (activeTab === 'all') {
            filtered = properties;
        } else if (activeTab === 'active') {
            filtered = properties.filter(property => property.status === 1);
        } else if (activeTab === 'rented_sold') {
            filtered = properties.filter(property => property.status === 0);
        }
        setFilteredProperties(filtered);
        setCurrentPage(1); // Reset to first page when tab changes
    }, [activeTab, properties]);

    useEffect(() => {
        setFilteredProperties(properties.filter(property =>
            property.title.includes(searchTerm) ||
            property.location.includes(searchTerm)
        ));
        setCurrentPage(1); // Reset to first page when search term changes
    }, [searchTerm, properties]);

    // Get current properties based on pagination
    const indexOfLastProperty = currentPage * propertiesPerPage;
    const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
    const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const getTypeName = (typeId) => {
        const type = homeTypes.find(type => type.id === typeId);
        return type ? type.home_type : 'Unknown';
    };

    return (
        <div className="h-full w-full mt-1">
            <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center justify-between gap-1">
                    <div>
                        <h5 className="text-xl font-bold text-gray-800">Properties</h5>
                        <p className="text-gray-600 mt-1">See all properties</p>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => navigate('/add-property')}
                    >
                        <FaPlus className="inline-block mr-2" />
                        Add Property
                    </button>
                </div>
                <div className="flex flex-col items-center justify-between gap-1 md:flex-row mt-4">
                    <div className="w-full md:w-max flex gap-2">
                        {TABS.map(({ label, value }) => (
                            <button
                                key={value}
                                className={`px-4 py-2 rounded ${activeTab === value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                                onClick={() => setActiveTab(value)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                    <div className="w-full md:w-72 mt-4 md:mt-0">
                        <form onSubmit={handleSearch} className='bg-slate-100 p-1 rounded-lg flex items-center'>
                            <input 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                type='text' 
                                placeholder='Search...' 
                                className='bg-transparent focus:outline-none w-24 sm:w-64' 
                            />
                            <button type="submit">
                                <FaSearch className='text-slate-600' />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="overflow-scroll px-0 mt-4">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-1"
                                >
                                    <span className="text-sm font-normal text-blue-gray-600 opacity-70">
                                        {head}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentProperties.map(
                            ({ id, title, location, price, type_id, status, image }, index) => {
                                const isLast = index === currentProperties.length - 1;
                                const classes = isLast
                                    ? "p-2"
                                    : "p-2 border-b border-blue-gray-50";

                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-1">
                                                <img
                                                    src={image}
                                                    alt={title}
                                                    className="h-10 w-10 object-cover cursor-pointer"
                                                    onClick={() => navigate(`/property-detail/${id}`)}
                                                />
                                                <div className="flex flex-col">
                                                    <span
                                                        className="text-sm font-normal text-blue-gray-600 cursor-pointer"
                                                        onClick={() => navigate(`/property-detail/${id}`)}
                                                    >
                                                        {title}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-normal text-blue-gray-600">
                                                    {location}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-normal text-blue-gray-600">
                                                    {price}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-normal text-blue-gray-600">
                                                    {getTypeName(type_id)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                <span className={`px-2 py-1 rounded-full text-sm ${status ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                                    {status ? "Active" : "Not Active"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    className="text-blue-600 hover:text-blue-800"
                                                    onClick={() => handleEdit(id)}
                                                >
                                                    <FaEdit className="h-4 w-4" />
                                                </button>
                                                <button
                                                    className="text-red-600 hover:text-red-800"
                                                    onClick={() => handleDelete(id)}
                                                >
                                                    <FaTrash className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between border-t border-blue-gray-50 p-1 mt-4">
                <div className="flex items-center">
                    <span className="mx-2">{`Page ${currentPage} of ${totalPages}`}</span>
                    <div className="inline-flex">
                        <button
                            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-l'
                            onClick={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-4 rounded-r'
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
                <span className="text-sm font-normal text-blue-gray-600">
                    Total: {filteredProperties.length}
                </span>
            </div>
        </div>
    );
}

export default PropertyManage;