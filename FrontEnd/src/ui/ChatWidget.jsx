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

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken.id);
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
          const data = await response.json();
          setMessages(data);
          scrollToBottom();
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
                className={`p-2 text-white ${
                  message.sender === user ? "bg-green-500" : "bg-blue-500"
                }`}
              >
                <p>{message.text}</p>
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
              onKeyPress={handleKeyPress} // Add key press event listener
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
