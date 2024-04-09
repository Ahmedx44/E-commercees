import React, { useState, useEffect, useRef } from "react";
import { BsFillChatFill } from "react-icons/bs";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const socket = io("http://localhost:4000");

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const messageEndRef = useRef(null);
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.id);
      setName(decodedToken.userName);
      console.log(`username:${name}`);
      console.log(decodedToken);
    }
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (user) {
      const fetchMessages = async () => {
        try {
          const response = await fetch(
            `http://localhost:4000/api/message/${user}`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const responseData = await response.json();

          if (Array.isArray(responseData.data.messages)) {
            setMessages(responseData.data.messages);
            scrollToBottom();
          } else {
            console.error("Unexpected response format:", responseData);
          }
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [user]);

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      console.log("Sending message:", inputValue);
      const assistanceId = "66100272885b8ec4444466ea"; // Replace with actual ID
      socket.emit("message", {
        recipientId: assistanceId,
        text: inputValue,
        senderId: user,
        userName: name, // Add the userName here
      });
      setInputValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    console.log(`username:${name}`);
  }, [name]);

  return (
    <div className="fixed bottom-0 right-0 z-50 mb-20 mr-20">
      <button
        className="fixed bottom-10 right-10 z-50 bg-green-500 text-white rounded-full p-2 hover:bg-green-700"
        onClick={() => setShowChat(!showChat)}
      >
        <BsFillChatFill className="text-2xl" />
      </button>
      {showChat && (
        <div className="absolute bottom-0 right-0 z-50 w-64 bg-white border border-gray-300 rounded-lg shadow-lg">
          <div className="h-48 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === user ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 ${
                    message.sender === user
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  } rounded-lg m-1`}
                >
                  <p className="break-words">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
          <div className="p-4">
            <input
              type="text"
              placeholder="Type your message here.."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full border border-gray-300 rounded-lg p-2"
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
