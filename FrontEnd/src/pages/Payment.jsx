import { useEffect, useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import Pay from "../ui/Pay";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

function Payment() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      setUser(decodedToken);
      console.log(decodedToken);
    }
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <form className="flex max-w-md flex-col gap-4 mx-auto mt-40 p-4 border rounded-lg shadow-lg bg-white">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="fname" value="First Name" />
        </div>
        <TextInput
          id="fname"
          type="text"
          placeholder="Enter your first name"
          value={user.firstName}
          onChange={(e) => setFname(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="lname" value="Last Name" />
        </div>
        <TextInput
          id="lname"
          type="text"
          placeholder="Enter your last name"
          value={user.lastName}
          onChange={(e) => setLname(e.target.value)}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="amount" value="Amount" />
        </div>
        <TextInput
          id="amount"
          type="text"
          placeholder="Enter the amount"
          value={cartTotalAmount}
          disabled
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          type="email"
          placeholder="Enter your email"
          value={user.email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>

      <Pay amount={cartTotalAmount} />
    </form>
  );
}

export default Payment;
