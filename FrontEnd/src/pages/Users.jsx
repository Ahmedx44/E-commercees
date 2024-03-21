import { Table } from "flowbite-react";
import { toast } from "react-hot-toast";
import Title from "../ui/Title";

function Users() {
  return (
    <div>
      <Title name="Users" />
      <div className="mt-24 px-10 py-10  bg-gret-500">
        <Table>
          <thead>
            <tr className="text-3xl py-10 text-center">
              <td>Name</td>
              <td>Email</td>
              <td>Phone Number</td>
              <td>Profile</td>
              <td>Number of Orders</td>
            </tr>
          </thead>
        </Table>
      </div>
    </div>
  );
}

export default Users;
