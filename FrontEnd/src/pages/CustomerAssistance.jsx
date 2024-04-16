import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { useRef } from "react";

const CustomerAssistance = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const socket = useRef(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    socket.current = io("http://localhost:4000");

    // Fetch chats and messages for the customer assistance
    fetchChats();
    fetchMessages();

    // Listen for new messages
    socket.current.on("new_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up when the component unmounts
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const fetchChats = async () => {
    // Fetch chats for the customer assistance
    // You can use your existing API endpoint to fetch chats
  };

  const fetchMessages = async (chatId) => {
    // Fetch messages for the selected chat
    // You can use your existing API endpoint to fetch messages
  };

  const handleChatSelect = async (chat) => {
    setSelectedChat(chat);
    fetchMessages(chat._id);
  };

  const handleSendMessage = async (text) => {
    // Send a new message to the server
    socket.current.emit("send_message", {
      chatId: selectedChat._id,
      sender: "customer_assistance",
      text,
    });

    // Add the message to the local state
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "customer_assistance", text },
    ]);
  };

  return (
    <div>
      {/* Render the list of chats */}
      {chats.map((chat) => (
        <div key={chat._id} onClick={() => handleChatSelect(chat)}>
          {chat.participants.map((participant) => participant.userName)}
        </div>
      ))}

      {/* Render the selected chat and messages */}
      {selectedChat && (
        <div>
          {/* Render the chat information */}
          <div>
            {selectedChat.participants.map(
              (participant) => participant.userName
            )}
          </div>

          {/* Render the messages */}
          {messages.map((message, index) => (
            <div key={index}>
              <div>{message.sender}:</div>
              <div>{message.text}</div>
            </div>
          ))}

          {/* Render the message input field */}
          <input
            type="text"
            placeholder="Type your message here.."
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e.target.value);
                e.target.value = "";
              }
            }}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerAssistance;
