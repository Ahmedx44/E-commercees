import React, { useState, useEffect } from "react";
import axios from "axios";

const CustomerAssistance = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:4000/api/chat/chats/all"
      );
      setChats(response.data.chats);
      console.log(chats);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };
  const handleChatSelection = (chat) => {
    setSelectedChat(chat); // Update selected chat first
    fetchMessagesForChat(chat); // Then fetch messages using the updated selectedChat state
  };

  const fetchMessagesForChat = async (chatId) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:4000/api/chat/messages/${chatId}`
      );
      const messages = response.data.chat.messages;
      console.log(messages); // Remove .data
      setMessages(messages); // Set messages state with received messages
    } catch (error) {
      console.error("Error fetching messages for chat:", error);
    }
  };

  const sendMessage = async () => {
    if (inputValue.trim() !== "" && selectedChat) {
      const messageData = {
        text: inputValue,
        sender: "Customer Assistance ID",
        recipient: selectedChat._id,
      };

      try {
        await axios.post(
          "http://127.0.0.1:4000/api/messages/send",
          messageData
        );
        // Refresh messages after sending message
        fetchMessagesForChat(selectedChat._id);
        setInputValue("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 px-4 py-6">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat._id}
              onClick={() => handleChatSelection(chat._id)}
              className="cursor-pointer hover:bg-gray-300 rounded-lg py-2 px-4 mb-2"
            >
              Chat ID: {chat._id}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 bg-gray-100 px-4 py-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4">Messages</h2>
          <div className="h-64 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message._id}
                className="rounded-lg bg-white shadow-md p-4 mb-4"
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
        <div className="flex">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-l-lg p-2 focus:outline-none"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white rounded-r-lg p-2 hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerAssistance;
