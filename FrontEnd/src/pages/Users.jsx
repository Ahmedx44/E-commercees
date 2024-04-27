import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner"; // Import the Spinner component

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/api/users");
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
    <div className=" h-full">
      <div className="text-2xl p-10 mt-16">
        <h1 className="text-4xl font-bold">Customers</h1>
      </div>
      <input
        className="w-68 border-2 border-slate-100 p-2 rounded-lg mb-4 "
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
        <div className="p-16">
          <table className="table table-zebra p-16 text-2xl roboto">
            <thead>
              <tr className="text-2xl text-black roboto">
                <th>Name</th>
                <th>Email</th>
                <th>Orders</th>
                <th>Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.role}</td>
                  <td>
                    <details className="dropdown">
                      <summary className="m-1 btn">Action</summary>
                      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                        <li>
                          <Link to="useredit">Edit</Link>
                        </li>
                        <li>
                          <button onClick={() => handleDelete(user._id)}>
                            Delete
                          </button>
                        </li>
                      </ul>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;
