// CustomerAssistanceInterface.jsx
import React, { useState, useEffect } from "react";
import CustomerList from "../ui/CustomerList";
import io from "socket.io-client";
import Conversation from "../ui/Conversation";

const socket = io("http://localhost:4000");

const CustomerAssistanceInterface = () => {
  const [customersWithMessages, setCustomersWithMessages] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomersWithMessages = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/message");
        const data = await response.json();

        if (response.ok) {
          setCustomersWithMessages(data.data.messages); // Assuming data structure is { data: { messages: Array } }
          setLoading(false);
        } else {
          console.error("Error fetching customers with messages:", data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching customers with messages:", error);
        setLoading(false);
      }
    };
    fetchCustomersWithMessages();
  }, []);

  const handleCustomerClick = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r p-4">
        <h2 className="text-xl mb-4">Customers with Messages</h2>
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg">Loading...</p>
          </div>
        ) : (
          <CustomerList
            customers={customersWithMessages} // Pass customersWithMessages here
            onCustomerClick={(customer) =>
              handleCustomerClick(customer, socket)
            }
          />
        )}
      </div>
      <div className="w-3/4 p-4">
        {selectedCustomer ? (
          <Conversation
            recipientId={selectedCustomer._id}
            recipientName={selectedCustomer.userName}
            socket={socket} // Pass socket object here
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-lg">Select a customer to start conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerAssistanceInterface;
