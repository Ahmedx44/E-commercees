// chatWidget.jsx

import React, { useState, useEffect } from "react";
import { BsFillChatFill } from "react-icons/bs";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Assuming your socket.io server is running on the same URL

const ChatWidget = ({ currentUser }) => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const toggleChat = () => {
    setShowChat(!showChat);
    if (showChat) setSelectedUser(null);
  };

  const sendMessage = () => {
    if (inputValue.trim() !== "" && selectedUser) {
      socket.emit("message", {
        text: inputValue,
        recipientId: selectedUser._id,
      });
      setInputValue("");
    }
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    // Fetch messages with the selected user
    // You can make an API call here to fetch messages with this user
  };

  return (
    <div className="chat-widget fixed bottom-5 right-5">
      <button
        className="chat-button bg-green-500 text-white rounded-full p-2 hover:bg-green-700"
        onClick={toggleChat}
      >
        <BsFillChatFill className="text-2xl" />
      </button>
      {showChat && (
        <div className="chat-interface bg-white rounded-lg shadow-lg p-5">
          <h2 className="text-lg font-semibold mb-4">Customer Assistance</h2>
          <div className="user-list">
            {currentUser && currentUser.role === "customer_assistance" && (
              <>
                <h3>Users with Messages</h3>
                <ul>
                  {/* Iterate over users with messages */}
                  {/* On click of user, call selectUser(user) */}
                </ul>
              </>
            )}
          </div>
          {selectedUser && (
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.sentBy === "user" ? "sent" : "received"
                  }`}
                >
                  <div
                    className={`chat-bubble ${
                      message.sentBy === "user" ? "bg-green-200" : "bg-blue-200"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message here.."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <button
              className="bg-green-500 text-white rounded-full p-2 hover:bg-green-700"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
