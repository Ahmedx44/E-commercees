import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import UserList from "../ui/UserList"; // Component to display list of users
import Conversation from "../ui/Conversation"; // Component to display conversation

const socket = io("http://localhost:4000");

const CustomerAssistanceInterface = () => {
  const [usersWithMessages, setUsersWithMessages] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch users with messages
    const fetchUsersWithMessages = async () => {
      try {
        const response = await fetch("http://127.0.0.1:4000/api/message/users");
        const data = await response.json();
        setUsersWithMessages(data);
        console.log(usersWithMessages);
      } catch (error) {
        console.error("Error fetching users with messages:", error);
      }
    };
    fetchUsersWithMessages();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r p-4">
        <h2 className="text-xl mb-4">Users with Messages</h2>
        <UserList users={usersWithMessages} setSelectedUser={setSelectedUser} />
      </div>
      <div className="w-3/4 p-4">
        {selectedUser ? (
          <Conversation
            recipientId={selectedUser._id}
            recipientName={selectedUser.userName}
            socket={socket}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg">Select a user to start conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerAssistanceInterface;
