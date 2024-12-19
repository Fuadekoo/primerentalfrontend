import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../helpers/axiousInstance";

const AdminChatList = () => {
  const [users, setUsers] = useState([]); // List of users
  const navigate = useNavigate();

  // Fetch list of users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get("/listreply");
        const data = response.data.data;

        // Process the response data to extract user information and latest message
        const processedUsers = data.map((item) => ({
          id: item.sender_id,
          email: item.sender_email,
          latest_message: item.message,
          created_at: item.created_at,
        }));

        setUsers(processedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Navigate to ReplyChat.jsx with the selected user ID
  const handleUserClick = (userId) => {
    navigate(`/reply-chat/${userId}`);
  };

  return (
    <div className="w-1/3 border-r border-gray-300 overflow-y-auto">
      <h2 className="text-xl font-bold p-4">User Messages</h2>
      {users.map((user) => (
        <div
          key={user.id}
          className="flex items-center p-3 cursor-pointer hover:bg-gray-200"
          onClick={() => handleUserClick(user.id)}
        >
          <div>
            <p className="font-semibold">{user.email}</p>
            <p className="text-sm text-gray-600 truncate">
              {user.latest_message}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(user.created_at).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminChatList;