import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Pusher from 'pusher-js';
import axiosInstance from "../../helpers/axiousInstance";

const ReplyChat = () => {
  const { userId } = useParams(); // Get user ID from the URL
  const [messages, setMessages] = useState([]); // Messages between admin and user
  const [replyMessage, setReplyMessage] = useState(""); // Admin's reply message

  // Fetch messages between admin and the selected user
  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get(`/messages/with-user/${userId}`);
      setMessages(response.data.data || []); // Ensure messages is an array
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages();

    // Initialize Pusher
    const pusher = new Pusher('ffc1213c9bb622bea8b8', {
      cluster: 'ap2',
    });

    const channel = pusher.subscribe('message-channel');
    channel.bind('message-event', (data) => {
      if (data.sender_id === parseInt(userId) || data.receiver_id === parseInt(userId)) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }
    });

    return () => {
      pusher.unsubscribe('message-channel');
    };
  }, [userId]);

  // Handle reply submission
  const handleReply = async () => {
    if (replyMessage.trim() === "") {
      alert("Message cannot be empty!");
      return;
    }

    try {
      const response = await axiosInstance.post(`/reply-message/${userId}`, {
        message: replyMessage,
      });

      if (response.data.success) {
        const newMessage = {
          ...response.data.data,
          type: 'sent', // Ensure the type is set correctly
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setReplyMessage(""); // Clear the input field
      } else {
        alert("Failed to send reply.");
      }
    } catch (error) {
      console.error("Error sending reply:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <h1>Chat with User {userId}</h1>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg max-w-xs ${
              msg.sender_id === parseInt(userId)
                ? 'bg-gray-300 text-black mr-auto' // User messages (left side)
                : 'bg-green-500 text-white ml-auto' // Admin messages (right side, green background)
            }`}
          >
            <p>{msg.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-2"
          placeholder="Type your message..."
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
          onClick={handleReply}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ReplyChat;