import React, { useState, useEffect } from "react";
import { BsFillChatFill } from "react-icons/bs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const sendMessage = async () => {
    if (inputValue.trim() !== "") {
      const message = {
        text: inputValue,
        recipient: "66100272885b8ec4444466ea", // Replace with the recipient's ID
      };

      try {
        const response = await axios.post(
          "http://localhost:4000/api/messages/send",
          message
        );
        const savedMessage = response.data.message;
        setMessages((prevMessages) => [...prevMessages, savedMessage]);
        setInputValue("");
      } catch (error) {
        console.error("Error sending message:", error);
        // Handle error as needed
      }
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/messages/user/${userId}`
        );
        const fetchedMessages = response.data.messages;
        console.log(fetchedMessages);
        setMessages([]); // Clear previous messages
        setMessages(fetchedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
        // Handle error as needed
      }
    };

    if (userId) {
      fetchMessages();
    }
  }, [userId]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        className="bg-blue-500 text-white rounded-full p-3 hover:bg-blue-700 focus:outline-none"
        onClick={toggleChat}
      >
        <BsFillChatFill className="text-2xl" />
      </button>
      {showChat && (
        <div className="fixed bottom-0 right-0 z-50 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="h-48 overflow-y-auto px-4 py-2">
            {messages.map((message, index) => (
              <div key={index}>
                {message.text.map((textItem, textIndex) => (
                  <div
                    key={`${index}-${textIndex}`}
                    className={`flex ${
                      textItem.sender === userId
                        ? "justify-end"
                        : "justify-start"
                    } mb-2`}
                  >
                    <div
                      className={`p-2 ${
                        textItem.sender === userId
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      } rounded-lg`}
                    >
                      <p className="break-words">{textItem.message}</p>
                    </div>
                  </div>
                ))}
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
