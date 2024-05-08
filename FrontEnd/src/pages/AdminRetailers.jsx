import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Breadcrumb } from "flowbite-react";
import { HiViewBoards } from "react-icons/hi";
import Spinner from "../ui/Spinner";
import { Link, useNavigate } from "react-router-dom";

function Retailers() {
  const [retailers, setRetailers] = useState([]);
  const [user, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRetailer = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/api/users");
        const usersWithRoleCustomer = response.data.data.users.filter(
          (user) => user.role === "retailer"
        );
        console.log(usersWithRoleCustomer);
        setUsers(usersWithRoleCustomer);
        setLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchRetailer();
  }, []);

  const handleViewClick = (retailerId) => {
    navigate(`/admin/retailerdetail/${retailerId}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/users/${id}`);
      toast.success("Retailer deleted successfully");
      const updatedRetailers = retailers.filter(
        (retailer) => retailer._id !== id
      );
      setRetailers(updatedRetailers);
    } catch (error) {
      console.error("Error deleting retailer:", error);
      toast.error("Failed to delete retailer");
    }
  };

  return (
    <div className="min-h-screen font-sans">
      <div className="text-2xl p-10 mt-16">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiViewBoards}>
            <p className="text-4xl font-bold">Retailers</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div className="overflow-x-auto p-16">
        <div className="flex justify-between">
          <input
            className="w-68 border-2 border-slate-100 p-2 rounded-lg mb-4"
            type="text"
            placeholder="Search retailers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link
            to="/admin/addretailer"
            className="btn bg-indigo-600 font-bold text-white text-2xl hover:bg-indigo-800 right"
          >
            Add Retailer
          </Link>
        </div>
        <table className="table table-zebra p-16 text-2xl roboto">
          <thead>
            <tr className="text-2xl text-black roboto">
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {user.map((user) => (
              <tr key={user._id}>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <details className="dropdown">
                    <summary className="m-1 btn">Action</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <button onClick={() => handleViewClick(user._id)}>
                          View
                        </button>
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
        {loading && (
          <div className="flex justify-center items-center h-full">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}

export default Retailers;
