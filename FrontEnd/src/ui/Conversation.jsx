// Conversation.js
import React, { useState, useEffect } from "react";

const Conversation = ({ recipientId, recipientName, socket }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

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
    <div>
      <h2>Conversation with {recipientName}</h2>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Conversation;
