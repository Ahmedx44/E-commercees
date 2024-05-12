import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataList } from "@radix-ui/themes";
import { Breadcrumb } from "flowbite-react";
import { HiViewBoards } from "react-icons/hi";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../ui/Spinner";

function RetailerDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/users/${id}`
        );
        setUser(response.data.data.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className=" h-fullroboto mt-10">
      <div className="text-2xl p-10 mt-16">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Link to="/admin/retailers">
            <Breadcrumb.Item icon={HiViewBoards}>
              <p className="text-4xl font-bold">Retailer</p>
            </Breadcrumb.Item>
          </Link>
          <Breadcrumb.Item icon={HiViewBoards}>
            <p className="text-4xl font-bold">{user.userName}</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div>
        <DataList.Root className="px-5  rounded-xl gap-5">
          <DataList.Item align="center">
            <DataList.Label className="font-bold">Name:</DataList.Label>
            <DataList.Value>
              <span className="text-green-500">{user.userName}</span>
            </DataList.Value>
            <DataList.Label className="font-bold">First Name:</DataList.Label>
            <DataList.Value>
              <span className="text-green-500">{user.firstName}</span>
            </DataList.Value>
            <DataList.Label className="font-bold">Last Name:</DataList.Label>
            <DataList.Value>
              <span className="text-green-500">{user.lastName}</span>
            </DataList.Value>
            <DataList.Label className="font-bold">Email:</DataList.Label>
            <DataList.Value>
              <span className="text-green-500">{user.email}</span>
            </DataList.Value>
            <DataList.Label className="font-bold">Phone Number:</DataList.Label>
            <DataList.Value>
              <span className="text-green-500">{user.phoneNumber}</span>
            </DataList.Value>
            <DataList.Label className="font-bold">Image:</DataList.Label>
            <DataList.Value>
              <span className="text-green-500">
                <img src={user.image} alt="" />
              </span>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </div>
    </div>
  );
}

export default RetailerDetail;
