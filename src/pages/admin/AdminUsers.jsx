import React, { useEffect, useState } from 'react';
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import { FaSearch } from 'react-icons/fa';
import axiosInstance from '../../helpers/axiousInstance';
import { message } from 'antd';
import Loading from '../../components/Loader';
import { HideLoading, ShowLoading } from '../../redux/alertSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [blockStatus, setBlockStatus] = useState({});
  const [activeTab, setActiveTab] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const usersPerPage = 3; // Adjust this value for the number of users per page
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const dispatch = useDispatch();

  const TABS = [
    { label: "All", value: "all" },
    { label: "Blocked", value: "blocked" },
    { label: "Unblocked", value: "unblocked" },
  ];

  const TABLE_HEAD = [
    "Member",
    "Role",
    "Status",
    "Date",
    ""
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading state
      dispatch(ShowLoading());
      const response = await axiosInstance.get(`/getUsers?searchTerm=${searchTerm}`);
      setFilteredUsers(response.data);
      setCurrentPage(1); // Reset to first page on new search
    } catch (error) {
      console.error("Error fetching users:", error);
      message.error("Error fetching users");
    } finally {
      dispatch(HideLoading());
      setLoading(false); // Unset loading state
    }
  };

  const handleBlockUnblock = async (userId, isBlocked) => {
    Swal.fire({
      title: `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`,
      text: `This user will be ${isBlocked ? 'unblocked' : 'blocked'}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${isBlocked ? 'unblock' : 'block'} it!`
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true); // Set loading state
          dispatch(ShowLoading());
          await axiosInstance.put(`/toggleBlockUser/${userId}/block`, { isBlocked: !isBlocked });
          const response = await axiosInstance.get('/getUsers');
          setUsers(response.data);

          const updatedBlockStatus = {};
          response.data.forEach(user => {
            updatedBlockStatus[user.id] = user.isBlocked;
          });
          setBlockStatus(updatedBlockStatus);
          message.success(`User ${isBlocked ? 'unblocked' : 'blocked'} successfully`);
        } catch (error) {
          console.error("Error updating block status:", error);
          message.error("Error updating block status");
        } finally {
          dispatch(HideLoading());
          setLoading(false); // Unset loading state
        }
      }
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true); // Set loading state
        dispatch(ShowLoading());
        const response = await axiosInstance.get('/getUsers');
        setUsers(response.data);
        const initialBlockStatus = {};
        response.data.forEach(user => {
          initialBlockStatus[user.id] = user.isBlocked;
        });
        setBlockStatus(initialBlockStatus);
        setFilteredUsers(response.data); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
        message.error("Error fetching users");
      } finally {
        dispatch(HideLoading());
        setLoading(false); // Unset loading state
      }
    };
    fetchUsers();
  }, [dispatch]);

  // Filter users based on the selected tab
  useEffect(() => {
    let filtered;
    if (activeTab === 'all') {
      filtered = users;
    } else if (activeTab === 'blocked') {
      filtered = users.filter(user => user.isBlocked);
    } else if (activeTab === 'unblocked') {
      filtered = users.filter(user => !user.isBlocked);
    }
    setFilteredUsers(filtered);
    setCurrentPage(1); // Reset to first page when tab changes
  }, [activeTab, users]);

  useEffect(() => {
    setFilteredUsers(users.filter(user =>
      user.name.includes(searchTerm) ||
      user.email.includes(searchTerm)
    ));
    setCurrentPage(1); // Reset to first page when search term changes
  }, [searchTerm, users]);

  // Get current users based on pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

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
      {loading && <Loading />}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex items-center justify-between gap-1">
          <div>
            <h5 className="text-xl font-bold text-gray-800">Members</h5>
            <p className="text-gray-600 mt-1">See all members</p>
          </div>
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
            {currentUsers.map(
              ({ id, name, email, phone, avatar, role, isBlocked, created_at }, index) => {
                const isLast = index === currentUsers.length - 1;
                const classes = isLast
                  ? "p-2"
                  : "p-2 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-1">
                        <img src={avatar} alt={name} className='rounded-full h-10 w-10 object-cover' />
                        <div className="flex flex-col">
                          <span className="text-sm font-normal text-blue-gray-600">
                            {name}
                          </span>
                          <span className="text-sm font-normal text-blue-gray-400">
                            {email}
                          </span>
                          <span className="text-sm font-normal text-blue-gray-400">
                            {phone}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <span className="text-sm font-normal text-blue-gray-600">
                          {role}
                        </span>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <span className={`px-2 py-1 rounded-full text-sm ${isBlocked ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                          {isBlocked ? "Blocked" : "UnBlocked"}
                        </span>
                      </div>
                    </td>
                    <td className={classes}>
                      <span className="text-sm font-normal text-blue-gray-600">
                        {created_at}
                      </span>
                    </td>
                    <td className={classes}>
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleBlockUnblock(id, blockStatus[id])}
                      >
                        {blockStatus[id] ? (
                          <LockClosedIcon className="h-4 w-4" />
                        ) : (
                          <LockOpenIcon className="h-4 w-4" />
                        )}
                      </button>
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
          Total: {filteredUsers.length}
        </span>
      </div>
    </div>
  );
}

export default AdminUsers;