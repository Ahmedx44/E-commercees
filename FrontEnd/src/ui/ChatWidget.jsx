import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { BsFillChatFill } from "react-icons/bs";

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]); // Initialize messages as an empty array
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

  useEffect(() => {
    // Fetch messages when the chatId is available
    if (chatId) {
      fetchChatMessages();
    }
  }, [chatId]);

  const fetchChatId = async (userId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/api/users/${userId}/chatId`
      );
      if (response.data.status === "success") {
        setChatId(response.data.data.chatId);
      } else {
        console.error("Failed to fetch chatId:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching chatId:", error);
    }
  };

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/api/chat/messages/${chatId}`
      );
      setMessages(response.data.chat.messages);
      console.log(response.data.chat.messages);
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
        className="bg-indigo-500 text-white rounded-full p-3 hover:bg-indigo-400 focus:outline-none"
        onClick={toggleChat}
      >
        <BsFillChatFill />
      </button>
      <div className="fixed bottom-16 right-16 z-50 w-96 bg-slate-50  rounded-lg shadow-lg">
        {showChat && (
          <>
            <div className="h-96 overflow-y-auto px-4 py-2">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={`flex ${
                      message.sender === userId
                        ? "justify-end"
                        : "justify-start"
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
                className="mt-2 bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-400"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
