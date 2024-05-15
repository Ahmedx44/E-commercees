import React, { useState, useEffect } from "react";
import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

function Profile() {
  const [userP, setUserP] = useState("");
  const [user, setUser] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    image: "",
    email: "",
    sex: "",
    phoneNumber: "",
    location: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserP(decodedToken.id);
      // Set initial user data from token
      setUser({
        id: decodedToken.id, // Set the id here
        userName: decodedToken.userName,
        firstName: decodedToken.firstName,
        lastName: decodedToken.lastName,
        image: decodedToken.image,
        email: decodedToken.email,
        sex: decodedToken.sex,
        phoneNumber: decodedToken.phoneNumber,
        location: decodedToken.location,
      });
      console.log(user);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://127.0.0.1:4000/api/users/profile/${user.id}`,
        user,
        {}
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    }
  };
  const handleimage = () => {};

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md flex-col gap-4 mx-auto mt-40 p-4 border rounded-lg shadow-2xl my-36"
      >
        <div>
          <div>
            <img
              src={user.image}
              alt="profile"
              className="rounded-full border"
            />
            <button
              className="relative bottom-12  left-64 text-5xl font-bold text-indigo-400"
              onClick={handleimage}
            >
              +
            </button>
          </div>
          <div className="mb-2 block">
            <Label htmlFor="userName" value="Username" />
          </div>
          <TextInput
            id="userName"
            type="text"
            name="userName"
            value={user.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstName" value="First Name" />
          </div>
          <TextInput
            id="firstName"
            type="text"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastName" value="Last Name" />
          </div>
          <TextInput
            id="lastName"
            type="text"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="sex" value="Sex" />
          </div>
          <TextInput
            id="sex"
            type="text"
            name="sex"
            value={user.sex}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phoneNumber" value="Phone Number" />
          </div>
          <TextInput
            id="phoneNumber"
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn bg-indigo-500 hover:bg-indigo-800 text-white"
        >
          Update Profilee
        </button>
      </form>
    </div>
  );
}

export default Profile;
