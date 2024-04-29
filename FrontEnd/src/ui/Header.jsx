import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import CartIcon from "../ui/CartIcon";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "../image/Screenshot from 2024-04-27 08-46-12.png";

function Header() {
  const [image, setImage] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setImage(decodedToken.image);
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
                <a className="text-xl">Home</a>
              </li>
              <li>
                <a className="text-xl">Shop</a>
              </li>
              <li>
                <a>Page</a>
                <ul className="p-2">
                  <li>
                    <Link to="/cart">
                      <a>Cart</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/history">
                      <a>Order History</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a>Contact</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost text-2xl">
            <img src={Logo} alt="" className="w-28 relative bottom-5" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <Link to="/">
              <li>
                <a className="text-2xl font-bold roboto">Home</a>
              </li>
            </Link>
            <Link to="/productlist">
              <li>
                <a className="text-2xl font-bold roboto">Shop</a>
              </li>
            </Link>
            <li>
              <details>
                <summary className="text-2xl font-bold roboto">Page</summary>
                <ul className="p-2">
                  <li>
                    <Link to="/cart">
                      <a className="text-2xl font-bold roboto">Cart</a>
                    </Link>
                  </li>
                  <li>
                    <Link to="/history">
                      <a className="text-2xl font-bold roboto">Order History</a>
                    </Link>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a className="text-2xl font-bold roboto">About</a>
            </li>
          </ul>
        </div>
        {user ? (
          <>
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
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <div className="navbar-end">
            <Link to="/login">
              <a className="btn bg-fuchsia-200 font-bold roboto text-xl">
                Login
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
