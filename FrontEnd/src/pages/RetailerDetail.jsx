import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DataList } from "@radix-ui/themes";
import axios from "axios";

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
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className=" h-fullroboto mt-36">
      <div>
        <DataList.Root className=" py-10 px-5  rounded-xl m-5 gap-5">
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
