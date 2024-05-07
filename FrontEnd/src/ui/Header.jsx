import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import CartIcon from "../ui/CartIcon";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../image/Screenshot from 2024-05-07 14-20-48.png";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../store";

function Header() {
  const [image, setImage] = useState();
  const [user, setUser] = useState();
  const [role, setRole] = useState();
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  const handleLanguageChange = (lang) => {
    dispatch(changeLanguage(lang));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setImage(decodedToken.image);
      setRole(decodedToken.role);
      setUser(decodedToken);
      console.log(decodedToken);
    }
  }, []);

  const handleLogout = () => {
    if (user) {
      localStorage.removeItem("token");
      setUser(null);
      toast.success("Successfully logged out");
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 fixed top-0 z-10 h-36">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="text-xl">{language === "en" ? "Home" : "ቤት"}</a>
              </li>
              <Link to="/productlist">
                <li>
                  <a className="text-xl">
                    {" "}
                    {language === "en" ? "Shop" : "ግዢ"}
                  </a>
                </li>
              </Link>
              <li>
                <ul className="p-2">
                  <li>
                    <Link to="/cart">
                      <a> {language === "en" ? "Cart" : "ግዢ"}</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/history">
                      <a>{language === "en" ? "OrderHistory" : "የትዕዛዝ ታሪክ"}</a>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <Link to="/">
            <img
              src={Logo}
              alt=""
              className="w-64 relative rounded-2xl bg-white"
            />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Link to="/">
              <li>
                <a className="text-2xl font-bold roboto">
                  {language === "en" ? "Home" : "ቤት"}
                </a>
              </li>
            </Link>
            <Link to="/productlist">
              <li>
                <a className="text-2xl font-bold roboto">
                  {language === "en" ? "Shop" : "ግዢ"}
                </a>
              </li>
            </Link>
            <li>
              <details>
                <summary className="text-2xl font-bold roboto">
                  {language === "en" ? "Page" : "ገጽ"}
                </summary>
                <ul className="p-2">
                  <li>
                    <Link to="/cart">
                      <a className="text-2xl font-bold roboto">
                        {language === "en" ? "Cart" : "ጋሪ"}
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/history">
                      <a className="text-2xl font-bold roboto">
                        {language === "en" ? "Order History" : "የትዕዛዝ ታሪክ"}
                      </a>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a className="text-2xl font-bold roboto">
                {language === "en" ? "About" : "ስለ"}
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown">
          <label tabIndex={0} className="btn m-1">
            {language === "en" ? "English" : "Amharic"}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a onClick={() => handleLanguageChange("en")}>English</a>
            </li>
            <li>
              <a onClick={() => handleLanguageChange("am")}>Amharic</a>
            </li>
          </ul>
        </div>
        {user ? (
          <>
            {role === "admin" ? (
              <div className="">
                <Link to="/admin">
                  <a className="btn bg-indigo-400 text-white font-bold roboto text-xl hover:bg-indigo-800">
                    Dashboard
                  </a>
                </Link>
              </div>
            ) : null}
            <CartIcon />
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Profile" src={image} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    <a>{language === "en" ? "PRofile" : "መገለጫ"}</a>
                    <span className="badge"></span>
                  </a>
                </li>
                <li>
                  <a></a>
                </li>
                <li onClick={handleLogout}>
                  <a className="text-xl">
                    {language === "en" ? "Logout" : "ውጣ"}
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="navbar-end">
            <Link to="/login">
              <a className="btn bg-indigo-400 font-bold roboto text-xl text-white hover:bg-indigo-700">
                {language === "en" ? "Login" : "ግባ"}
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
