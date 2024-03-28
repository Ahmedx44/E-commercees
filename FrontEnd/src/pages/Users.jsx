import { Table } from "flowbite-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import Title from "../ui/Title";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner"; // Import the Spinner component

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/api/users");
        const usersWithRoleCustomer = response.data.data.users.filter(
          (user) => user.role === "customer"
        );
        setUsers(usersWithRoleCustomer);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-200 h-full">
      <Title name={"User"} />

      <div className="m-24 px-10 py-10 pb-10 mb-10 bg-slate-100 h-screen shadow-lg rounded-2xl overflow-x-auto">
        <input
          className="w-68 border-2 border-slate-300 p-2 rounded-lg mb-4"
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loading ? ( // Display spinner while loading
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        ) : (
          <Table hoverable>
            <Table.Head className="font-bold text-lg">
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Orders</Table.HeadCell>
              <Table.HeadCell>Number</Table.HeadCell>
              <Table.HeadCell>Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {filteredUsers.map((user) => (
                <Table.Row key={user._id} className="font-bold text-lg">
                  <Table.Cell>{user.userName}</Table.Cell>
                  <Table.Cell>{user.phoneNumber}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>
                    <Dropdown label="Action" dismissOnClick={false}>
                      <Dropdown.Item>
                        <Link to="useredit">Edit </Link>
                      </Dropdown.Item>
                      <Dropdown.Item>Delete</Dropdown.Item>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    </div>
  );
}

export default Users;
