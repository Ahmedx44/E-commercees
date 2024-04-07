import React from "react";

const UserList = ({ users }) => {
  // Handle the case where users is undefined or an empty array
  if (!users || users.length === 0) {
    return <p>No users found.</p>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;
