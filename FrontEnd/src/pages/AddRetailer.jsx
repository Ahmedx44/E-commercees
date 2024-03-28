// AddRetailerForm.js
import { useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import toast from "react-hot-toast";

const AddRetailer = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("retailer");
  const [sex, setSex] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordConfirm, setpasswordConfirm] = useState("");
  const [file, setFile] = useState("");

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
    console.log(image);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        "http://127.0.0.1:3000/api/users/register",
        {
          userName,
          firstName,
          lastName,
          email,
          sex,
          role,
          password,
          passwordConfirm,
          phoneNumber,
          image,
        }
      );
      toast.success("Retailer added successfully!");
      // Clear input fields after successful creation
      setUserName("");
      setFirstName("");
      setlastName("");
      setEmail("");
      setSex("");
      setPassword("");
      setpasswordConfirm("");
      setPhoneNumber("");
      setImage("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add retailer.");
    }
  };

  return (
    <div className="bg-slate-200 h-full">
      <Title name={"Add Retailer"} />
      <div className="max-w-5xl mx-auto max-h-5xl">
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5 mt-36 ">
            <div>
              <label
                htmlFor="userName"
                className="block text-2xl font-medium text-gray-700"
              >
                Username
              </label>
              <input
                id="userName"
                name="userName"
                type="text"
                autoComplete="username"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-2xl font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-2xl font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                required
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-2xl font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="sex"
                className="block text-2xlfont-medium text-gray-700"
              >
                Sex
              </label>
              <div>
                <select
                  id="sex"
                  name="sex"
                  required
                  value={sex}
                  onChange={(e) => setSex(e.target.value)}
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block text-2xl font-medium text-gray-700"
              >
                Photo
              </label>
              <input
                id="photo"
                name="photo"
                type="file"
                onChange={(e) => handleChange(e)}
                accept="image/*"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
              <img src={image} alt="" className="w-80 h-80 mt-10" />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-2xl font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-2xl font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                autoComplete="new-password"
                required
                value={passwordConfirm}
                onChange={(e) => setpasswordConfirm(e.target.value)}
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-2xl font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                pattern="[0-9]{10}"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full h-12 px-4 py-2 border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="mt-9 text-white font-bold focus:ring-indigo-800 focus:border-indigo-500 block w-full h-12 px-4 py-2 border-gray-900 rounded-md shadow-sm sm:text-sm bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRetailer;
