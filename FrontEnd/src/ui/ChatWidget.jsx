import React, { useState, useEffect, useRef } from "react";
import { BsFillChatFill } from "react-icons/bs";
import io from "socket.io-client";
import { jwtDecode } from "jwt-decode";

const ChatWidget = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [userId, setUserId] = useState();
  const [chatId, setChatId] = useState();
  const messageEndRef = useRef(null);
  const socket = useRef(null);

  // Decode the token to get the user ID
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      socket.current = io("http://localhost:4000");
      socket.current.emit("join_chat", userId);

      socket.current.on("messages", (messages) => {
        setMessages(messages);
      });

      socket.current.on("new_message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [userId]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (message) => {
    if (socket.current && userId) {
      // Emit the message to the server
      socket.current.emit("send_message", { ...message, sender: userId });

      try {
        // Update the user's chats field in the database
        await fetch(`http://127.0.0.1:4000/api/users/${userId}/chats`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ chatId: message.chat }),
        });

        // Clear the input field
        setInputValue("");
      } catch (error) {
        console.error("Error updating user chats:", error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage({ text: inputValue });
      scrollToBottom();
    }
  };

  useEffect(() => {
    if (userId && chatId) {
      fetchMessages(chatId);
    }
  }, [userId, chatId]);

  const fetchMessages = async (chatId) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/chats/${chatId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data.messages);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleChat = (chatId) => {
    setShowChat(!showChat);
    setChatId(chatId);
    if (!showChat) {
      fetchMessages(chatId);
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-50 mb-20 mr-20">
      <button
        className="fixed bottom-10 right-10 z-50 bg-green-500 text-white rounded-full p-2 hover:bg-green-700"
        onClick={() => toggleChat(chatId)} // Pass chatId here
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
                  message.sender === userId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-2 ${
                    message.sender === userId
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
              onClick={
                () => sendMessage({ chatId, sender: userId, text: inputValue }) // Pass chatId here
              }
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
