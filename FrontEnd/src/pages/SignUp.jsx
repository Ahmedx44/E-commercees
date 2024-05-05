import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import LeafletMap from "../ui/LeafletMap";
import Logo from "../image/Screenshot from 2024-05-05 17-06-11.png";
import { useDispatch, useSelector } from "react-redux";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState();
  const [lastName, setLastName] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedLocationLat, setSelectedLocationLat] = useState(null);
  const [selectedLocationLng, setSelectedLocationLng] = useState(null);

  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

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
  const handleLocationSelected = (location) => {
    setSelectedLocation(location);
    setSelectedLocationLat(location.lat);
    setSelectedLocationLng(location.lng);
    setIsLocationModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      userName: userName.trim(),
      email,
      firstName,
      lastName,
      password,
      passwordConfirm,
      phoneNumber: phoneNumber.trim(),
      image,
      location: [selectedLocationLat, selectedLocationLng],
    };

    try {
      await axios.post("http://127.0.0.1:4000/api/users/register", userData);
      console.log("User registered successfully");
      toast.success(
        language === "en" ? "Successfully registered" : "በተሳናቸው ተመዝገብን"
      );
      window.location.href = "/login";
    } catch (error) {
      setError(error.response.data.message);
      toast.error(
        language === "en" ? "Failed to register" : "አስተያየት ምረጥ፡ አትልቁም"
      );
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center">
      <div className="max-w-md w-full bg-white shadow rounded-xl m-10 overflow-hidden sm:p-10 p-6">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {language === "en" ? "Sign Up for an Account" : "መለያ ለመመዝገብ"}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="userName" className="sr-only">
              {language === "en" ? "Username" : "መጠቀሚ"}
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              autoComplete="username"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="appearance-none rounded-md  relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={language === "en" ? "Username" : "መጠቀሚ"}
            />
          </div>
          <div>
            <label htmlFor="firstName" className="sr-only">
              {language === "en" ? "First Name" : "ስም"}
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={language === "en" ? "First Name" : "ስም"}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="sr-only">
              {language === "en" ? "Last Name" : "የአባት ስም"}
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={language === "en" ? "Last Name" : "የአባት ስም"}
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">
              {language === "en" ? "Email address" : "ኢሜል አድራሻ"}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={language === "en" ? "Email address" : "ኢሜል አድራሻ"}
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              {language === "en" ? "Password" : "የይለፍ ቃል"}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={language === "en" ? "Password" : "የይለፍ ቃል"}
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm" className="sr-only">
              {language === "en" ? "Confirm Password" : "የይለፍ ቃል አረጋግጥ"}
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              autoComplete="new-password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={
                language === "en" ? "Confirm Password" : "የይለፍ ቃል አረጋግጥ"
              }
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="sr-only">
              {language === "en" ? "Phone Number" : "ስልክ ቁጥር"}
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="appearance-none rounded-md relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder={language === "en" ? "Phone Number" : "ስልክ ቁጥር"}
            />
          </div>
          <div>
            <label
              htmlFor="photo"
              className="block text-sm font-medium leading-5 text-gray-900"
            >
              {language === "en" ? "Photo" : "ፎቶ"}
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
                alt="Retailer"
                className="w-12 h-12 rounded-lg object-cover"
              />
            )}
          </div>
          <button
            className="btn bg-indigo-400 border-none"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            {language === "en"
              ? "Choose Location For Delivery"
              : "በአገራው የፊት አማራጭ ምረጥ"}
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-red-600">
                {language === "en"
                  ? "Please select your exact location for delivery"
                  : "እባክዎን ለማድረስ ትክክለኛ ቦታዎን ይምረጡ"}
              </h3>
              <LeafletMap onLocationSelected={handleLocationSelected} />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn">
                    {language === "en" ? "Close" : "ዝጋ"}
                  </button>
                </form>
              </div>
            </div>
          </dialog>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {language === "en" ? "Sign Up" : "መመዝገብ"}
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-xl text-gray-600 ">
            {language === "en"
              ? "Already have an account?"
              : "እስከዚህ መለያ ይለመዳል?"}{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              {language === "en" ? "Sign in" : "ግባ"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
