import React, { useState, useEffect, useRef } from 'react';
import Pusher from 'pusher-js';
import axiosInstance from '../../helpers/axiousInstance';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null); // Reference to the end of the messages

  const userId = localStorage.getItem('user_id'); // Logged-in user ID
  const adminId = 1; // Assuming admin ID is 1

  // Fetch existing messages when the component loads
  const fetchMessages = async () => {
    try {
      const response = await axiosInstance.get('/messages/for-user');
      setMessages(response.data.data || []); // Ensure messages is an array
      scrollToBottom(); // Scroll to the bottom after fetching messages
    } catch (error) {
      console.error('Error fetching messages:', error);
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
      setMessages((prevMessages) => [...prevMessages, data]);
      scrollToBottom(); // Scroll to the bottom when a new message is received
    });

    return () => {
      pusher.unsubscribe('message-channel');
    };
  }, []);

  // Scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Send a new message
  const sendMessage = async () => {
    if (message.trim() === '') return;

    try {
      const response = await axiosInstance.post('/send-message', {
        message,
      });

      if (response.data.success) {
        const newMessage = {
          ...response.data.data,
          sender_id: userId, // Ensure the sender_id is set correctly
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage(''); // Clear the input field
        scrollToBottom(); // Scroll to the bottom after sending a message
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when messages change
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <h1>Chat with Admin</h1>
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg max-w-xs ${
              msg.sender_id === adminId
                ? 'bg-green-500 text-white ml-auto' // Admin messages (right side, green background)
                : 'bg-gray-300 text-black mr-auto' // User messages (left side)
            }`}
          >
            <p>{msg.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(msg.created_at).toLocaleString()}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="p-4 bg-white flex">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-lg p-2"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="ml-2 bg-blue-500 text-white p-2 rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>

      {/* Scroll to Bottom Button */}
      <button
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg"
        onClick={scrollToBottom}
      >
        ↓
      </button>
    </div>
  );
};

export default Chat;