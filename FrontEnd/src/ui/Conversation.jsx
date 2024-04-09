import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const Conversation = ({ recipientId, recipientName }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/message/customer/${recipientId}`
        );
        setMessages(response.data);
        console.log(messages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

    socket.on("message", (message) => {
      if (
        message.sender === recipientId ||
        message.recipientId === recipientId
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("message");
    };
  }, [recipientId]);

  const sendMessage = () => {
    if (inputValue.trim() !== "") {
      socket.emit("message", {
        recipientId,
        text: inputValue,
      });
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow overflow-y-auto p-4">
        <h2 className="text-xl mb-4">Conversation with {recipientName}</h2>
        <div className="space-y-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg ${
                message.sender === recipientId
                  ? "bg-blue-200 text-blue-800"
                  : "bg-green-200 text-green-800"
              }`}
            >
              <p>{message.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <button
          onClick={sendMessage}
          className="mt-2 bg-green-500 text-white rounded-full p-2 hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Conversation;
