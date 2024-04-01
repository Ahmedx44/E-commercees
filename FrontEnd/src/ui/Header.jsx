import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { Link } from "react-router-dom";
import CartIcon from "./../ui/CartIcon";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Button from "./../ui/Button";
import toast from "react-hot-toast";

function Header() {
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setRole(decodedToken.role);
      setUser(decodedToken.userName);
      setImage(decodedToken.image);
      console.log(decodedToken);
    }
  }, []);

  const handleLogout = async () => {
    try {
      // Clear localStorage
      localStorage.removeItem("token");
      // Clear state
      setRole(null);
      setUser(null);
      // Redirect to homepage
      window.location.href = "/homepage";
      // Display success message

      toast.success(`Successfully logged out`);
    } catch (error) {
      // Display error message
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="border-t ">
      <nav className="text-xl fixed w-full z-10 top-0 left-0 font-bold font-sans">
        <Navbar fluid rounded>
          <NavbarBrand href="https://flowbite-react.com">
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              Ecommerce
            </span>
          </NavbarBrand>
          <div className="flex md:order-2 pt-10 relative bottom-5">
            <div className="mr-4">
              <CartIcon />
            </div>

            {role ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={<Avatar alt="User settings" img={image} rounded />}
              >
                <DropdownHeader>
                  <span className="block text-sm">welcome</span>
                  <span className="block truncate text-sm font-medium">
                    {user}
                  </span>
                </DropdownHeader>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem>
                  {" "}
                  <Link
                    to="history"
                    className="hover:text-gray-500 transition duration-300 delay-100"
                  >
                    Order History
                  </Link>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem onClick={(e) => handleLogout(e)}>
                  Log out
                </DropdownItem>
              </Dropdown>
            ) : (
              <Link
                to="/signup"
                className="hover:text-gray-500 transition duration-300 delay-100"
              >
                <Button name="Create Acount">Create account</Button>
              </Link>
            )}
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink
              href="#"
              className="text-2xl font-bold hover:text-gray-500"
            >
              <Link
                to="homepage"
                className="hover:text-gray-500 transition duration-300 delay-100 ml-40"
              >
                Home
              </Link>
            </NavbarLink>
            <NavbarLink href="#" className="text-2xl font-bold ">
              <Link
                to="ProductList"
                className="hover:text-gray-500 transition duration-300 delay-100"
              >
                Shop
              </Link>
            </NavbarLink>
            <NavbarLink href="#" className="text-2xl font-bold ">
              <Link
                to="about"
                className="hover:text-gray-500 transition duration-300 delay-100"
              >
                Contact
              </Link>
            </NavbarLink>
            <NavbarLink href="#" className="text-2xl font-bold "></NavbarLink>
            <NavbarLink href="#" className="text-2xl font-bold "></NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </nav>
    </div>
  );
}
export default Header;
