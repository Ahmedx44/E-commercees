import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("ahmed");
  const [chatId, setChatId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      setUserName(decodedToken.userName);
      // Fetch chatId when the component mounts
      fetchChatId(decodedToken.id);
    }
  }, []);

  const fetchChatId = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/api/users/${userId}/chatId`
      );
      if (response.data.status === "success") {
        setChatId(response.data.data.chatId);
        // Fetch messages when the chatId is available
        fetchChatMessages(response.data.data.chatId);
      } else {
        console.error("Failed to fetch chatId:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching chatId:", error);
    }
  };

  const fetchChatMessages = async (chatId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/api/chat/messages/${chatId}`
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const sendMessage = async () => {
    if (inputValue.trim() !== "") {
      const message = {
        text: inputValue,
        sender: userId,
        recipient: "66100272885b8ec4444466ea", // Assuming recipient ID
        name: userName,
      };

      try {
        // Send message if chatId is available or not

        // Save the message to the database
        const savedMessage = await axios.post(
          "http://127.0.0.1:4000/api/messages/send",
          message
        );

        // Add the message to the local messages state
        setMessages([...messages, savedMessage.data.message]);

        // Clear the input field
        setInputValue("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-700 focus:outline-none"
        onClick={toggleChat}
      >
        Toggle Chat
      </button>
      {showChat && (
        <div className="fixed bottom-0 right-0 z-50 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="h-48 overflow-y-auto px-4 py-2">
            {messages.map((message, index) => (
              <div key={index}>
                <div
                  className={`flex ${
                    message.sender === userId ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`p-2 ${
                      message.sender === userId
                        ? "bg-green-100 text-green-800"
                        : "bg-blue-100 text-blue-800"
                    } rounded-lg`}
                  >
                    <p className="break-words">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="Type your message here.."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none"
            />
            <button
              className="mt-2 bg-green-500 text-white rounded-full p-2 hover:bg-green-700"
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
