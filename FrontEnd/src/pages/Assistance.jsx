import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CustomerAssistance = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [userId, setUserId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  useEffect(() => {
    fetchChats();
  }, []);

  console.log(`hello:${selectedChat}`);
  const fetchChats = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:4000/api/chat/chats/all"
      );
      setChats(response.data.chats);
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
        `http://127.0.0.1:4000/api/chat/messages/${selectedChat}`
      );
      const messages = response.data.chat.messages;
      setMessages(messages); // Set messages state with received messages
    } catch (error) {
      console.error("Error fetching messages for chat:", error);
    }
  };

  const sendMessage = async () => {
    if (inputValue.trim() !== "" && selectedChat) {
      const messageData = {
        text: inputValue,
        sender: "66100272885b8ec4444466ea", // Update sender ID with the appropriate value
      };

      try {
        await axios.post(
          `http://127.0.0.1:4000/api/messages/send/${selectedChat}`,
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4  px-4 py-6 border-r border-gray-300">
        <h2 className="mb-4 roboto text-3xl font-bold">Chats</h2>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat._id}
              onClick={() => handleChatSelection(chat._id)}
              className="cursor-pointer hover:bg-gray-300 rounded-lg py-2 px-4 mb-2 font-bold active:bg-gray-300"
            >
              {chat.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1  px-4 py-6 roboto font-bold">
        <div className="w ">
          <h2 className="mb-4 roboto text-3xl font-bold">Messages</h2>
          <div className="overflow-y-auto h-4/5">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`flex ${
                  message.sender === userId ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`p-2 ${
                    message.sender === userId
                      ? "bg-green-800 text-white"
                      : "bg-blue-800 text-white"
                  } rounded-lg`}
                ></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex relative top-3/4  py-5  ">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="flex-1 border border-gray-300 rounded-l-lg roboto p-2 focus:outline-none "
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-400 text-white rounded-r-lg p-2 hover:bg-indigo-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerAssistance;
