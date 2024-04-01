import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Breadcrumb } from "flowbite-react";
import { IoIosAdd } from "react-icons/io";
import { HiViewBoards } from "react-icons/hi";
import { jwtDecode } from "jwt-decode";

const AddAssistance = () => {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("customer assitance");
  const [sex, setSex] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [file, setFile] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.id);
    }
  }, []);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImage(reader.result);
    };
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
      toast.success("Assistance added successfully!");

      setUserName("");
      setFirstName("");
      setlastName("");
      setEmail("");
      setSex("");
      setPassword("");
      setPasswordConfirm("");
      setPhoneNumber("");
      setImage("");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add assistance.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-100 h-screen">
      <div className="text-2xl p-10">
        <Breadcrumb aria-label="Default breadcrumb example">
          <Breadcrumb.Item href="#" icon={HiViewBoards}>
            <p className="text-4xl font-bold">Assistance</p>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="#" icon={IoIosAdd}>
            <p className="text-4xl font-bold">Add Assistance</p>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <form
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-10 bg-white rounded-xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold leading-6 text-gray-900">
              Assistance Information
            </h2>
            <p className="text-sm leading-6 text-gray-600">
              Enter details about the assistance.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Username
              </label>
              <input
                id="userName"
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={lastName}
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="sex"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Sex
              </label>
              <select
                id="sex"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Photo
              </label>
              <input
                id="photo"
                type="file"
                onChange={(e) => handleChange(e)}
                accept="image/*"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              {image && (
                <img
                  src={image}
                  alt="Assistance"
                  className="w-12 h-12 rounded-lg object-cover"
                />
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="passwordConfirm"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Confirm Password
              </label>
              <input
                id="passwordConfirm"
                type="password"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium leading-5 text-gray-900"
              >
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                pattern="[0-9]{10}"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="w-96 h-96 flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden">
          {image ? (
            <img
              src={image}
              alt="Assistance"
              className="object-cover w-full h-full"
            />
          ) : (
            <p className="text-gray-500">Photo Preview will appear here</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Assistance
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAssistance;
