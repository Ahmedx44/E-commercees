import React from "react";

const CustomerList = ({ customers, onCustomerClick, socket }) => {
  // Create a Set to store unique usernames
  const uniqueUsernames = new Set();

  // Iterate through the customers to add unique usernames to the Set
  customers.forEach((customer) => {
    uniqueUsernames.add(customer.userName);
  });

  return (
    <ul>
      {/* Iterate through the Set to render unique usernames */}
      {[...uniqueUsernames].map((username) => (
        <li
          key={username}
          onClick={() => {
            // Find the customer object based on the username
            const customer = customers.find(
              (customer) => customer.userName === username
            );
            // Call onCustomerClick with the customer object
            onCustomerClick(customer);
          }}
          style={{ cursor: "pointer" }}
        >
          {username}
        </li>
      ))}
    </ul>
  );
};

export default CustomerList;
