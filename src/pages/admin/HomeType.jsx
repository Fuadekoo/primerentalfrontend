import React, { useEffect, useState } from 'react';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axiosInstance from '../../helpers/axiousInstance';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const HomeType = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [homeTypes, setHomeTypes] = useState([]);
    const [filteredHomeTypes, setFilteredHomeTypes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const homeTypesPerPage = 3; // Adjust this value for the number of home types per page
    const totalPages = Math.ceil(filteredHomeTypes.length / homeTypesPerPage);

    const TABLE_HEAD = [
        "Home Type",
        "Actions"
    ];

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.get(`/hometypes?searchTerm=${searchTerm}`);
            setFilteredHomeTypes(response.data);
            setCurrentPage(1); // Reset to first page on new search
        } catch (error) {
            console.error("Error fetching home types:", error);
            message.error("Error fetching home types");
        }
    };

    const handleEdit = (homeTypeId) => {
        navigate(`/edit-hometype/${homeTypeId}`);
    };

    const handleDelete = async (homeTypeId) => {
        try {
            await axiosInstance.delete(`/hometypes/${homeTypeId}`);
            const response = await axiosInstance.get('/hometypes');
            setHomeTypes(response.data);
            setFilteredHomeTypes(response.data);
            message.success("Home type deleted successfully");
        } catch (error) {
            console.error("Error deleting home type:", error);
            message.error("Error deleting home type");
        }
    };

    useEffect(() => {
        const fetchHomeTypes = async () => {
            try {
                const response = await axiosInstance.get('/hometypes');
                setHomeTypes(response.data);
                setFilteredHomeTypes(response.data); // Initialize filtered home types
            } catch (error) {
                console.error("Error fetching home types:", error);
                message.error("Error fetching home types");
            }
        };
        fetchHomeTypes();
    }, []);

    useEffect(() => {
        setFilteredHomeTypes(homeTypes.filter(homeType =>
            (homeType.home_type && homeType.home_type.includes(searchTerm)) ||
            (homeType.description && homeType.description.includes(searchTerm))
        ));
        setCurrentPage(1); // Reset to first page when search term changes
    }, [searchTerm, homeTypes]);

    // Get current home types based on pagination
    const indexOfLastHomeType = currentPage * homeTypesPerPage;
    const indexOfFirstHomeType = indexOfLastHomeType - homeTypesPerPage;
    const currentHomeTypes = filteredHomeTypes.slice(indexOfFirstHomeType, indexOfLastHomeType);

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

    return (
        <div className="h-full w-full mt-1">
            <div className="bg-white shadow rounded-lg p-4">
                <div className="flex items-center justify-between gap-1">
                    <div>
                        <h5 className="text-xl font-bold text-gray-800">Home Types</h5>
                        <p className="text-gray-600 mt-1">See all home types</p>
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => navigate('/add-hometype')}
                    >
                        <FaPlus className="inline-block mr-2" />
                        Add Home Type
                    </button>
                </div>
                <div className="flex flex-col items-center justify-between gap-1 md:flex-row mt-4">
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
                        {currentHomeTypes.map(
                            ({ id, home_type, description }, index) => {
                                const isLast = index === currentHomeTypes.length - 1;
                                const classes = isLast
                                    ? "p-2"
                                    : "p-2 border-b border-blue-gray-50";

                                return (
                                    <tr key={id}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-1">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-normal text-blue-gray-600">
                                                        {home_type}
                                                    </span>
                                                </div>
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
                    Total: {filteredHomeTypes.length}
                </span>
            </div>
        </div>
    );
}

export default HomeType;