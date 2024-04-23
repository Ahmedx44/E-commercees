import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { BsFillChatFill } from "react-icons/bs";
import io from "socket.io-client";

const socket = io("http://localhost:4000");

const ChatWidget = () => {
  const [showChat, setShowChat] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("ahmed");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
      setUserName(decodedToken.userName);
      console.log("User ID:", decodedToken.id); // Debugging console log
    }
  }, []);

  useEffect(() => {
    // Listen for new messages from the server
    socket.on("newMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, []);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  // Inside the sendMessage function
  const sendMessage = async () => {
    if (inputValue.trim() !== "") {
      const message = {
        text: inputValue,
        sender: userId,
        recipient: "66100272885b8ec4444466ea", // Assuming recipient ID
        name: userName,
      };

      try {
        console.log("Sending message:", message);
        // Emit the message to the server
        socket.emit("sendMessage", message);
        setInputValue("");
      } catch (error) {
        console.error("Error sending message:", error);
        // Handle error as needed
      }
    }
  };

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
                    {Array.isArray(message.text) ? (
                      message.text.map((textMessage, textIndex) => (
                        <p key={textIndex} className="break-words">
                          {textMessage.message}
                        </p>
                      ))
                    ) : (
                      <p className="break-words">{message.text}</p>
                    )}
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
