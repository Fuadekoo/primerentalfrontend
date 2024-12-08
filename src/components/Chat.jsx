import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { subscribeToChannel } from '../utils/pusher';

const Chat = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const channel = subscribeToChannel(userId);

    channel.bind('App\\Events\\MessageSent', (data) => {
      setMessages((prevMessages) => [...prevMessages, data.message]);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [userId]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      await axios.post('http://your-laravel-api-url/api/send-message', {
        content: newMessage,
        to_user_id: userId, // Specify the recipient (admin or user)
      });
      setNewMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ color: msg.is_admin ? 'blue' : 'black' }}>
            {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
