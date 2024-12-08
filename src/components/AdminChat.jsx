import React, { useState } from 'react';
import Chat from './Chat';

const AdminChat = ({ userList }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <h3>Users</h3>
        {userList.map((user) => (
          <button key={user.id} onClick={() => setSelectedUser(user.id)}>
            Chat with {user.name}
          </button>
        ))}
      </div>
      <div>
        {selectedUser ? (
          <Chat userId={selectedUser} />
        ) : (
          <p>Select a user to chat with.</p>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
