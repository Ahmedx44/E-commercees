import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Breadcrumb } from "flowbite-react";
import { HiViewBoards } from "react-icons/hi";
import Spinner from "../ui/Spinner";
import { Link, useNavigate } from "react-router-dom";

function Retailers() {
  const [retailers, setRetailers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRetailers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:4000/api/users");
        setRetailers(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching retailers:", error);
      }
    };

    fetchRetailers();
  }, []);

  const handleViewClick = (retailerId) => {
    navigate(`/admin/retailerdetail/${retailerId}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/users/${id}`);
      toast.success("Retailer deleted successfully");
      // Refresh retailers after deletion
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
            {retailers.map((retailer) => (
              <tr key={retailer._id}>
                <td>{retailer.userName}</td>
                <td>{retailer.email}</td>
                <td>{retailer.role}</td>
                <td>
                  <details className="dropdown">
                    <summary className="m-1 btn">Action</summary>
                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                      <li>
                        <button onClick={() => handleViewClick(retailer._id)}>
                          View
                        </button>
                      </li>
                      <li>
                        <button onClick={() => handleDelete(retailer._id)}>
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
