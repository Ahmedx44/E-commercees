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

function Header() {
  return (
    <div className="border-t">
      <nav className="text-3xl fixed w-full z-10 top-0 left-0 font-bold">
        <Navbar fluid rounded>
          <NavbarBrand href="https://flowbite-react.com">
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              Ecommerce
            </span>
          </NavbarBrand>
          <div className="flex md:order-2 pt-6">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User settings"
                  img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  rounded
                />
              }
            >
              <DropdownHeader>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </DropdownHeader>
              <DropdownItem>Dashboard</DropdownItem>
              <DropdownItem>Settings</DropdownItem>
              <DropdownItem>Earnings</DropdownItem>
              <DropdownDivider />
              <DropdownItem>Sign out</DropdownItem>
            </Dropdown>
            <NavbarToggle />
          </div>
          <NavbarCollapse>
            <NavbarLink href="#" className="text-2xl font-bold">
              <Link to="homepage" className="hover:text-sky-700">
                Home
              </Link>
            </NavbarLink>
            <NavbarLink href="#" className="text-2xl font-bold">
              <Link to="ProductList" className="hover:text-violet-600">
                Shop
              </Link>
            </NavbarLink>
            <NavbarLink href="#" className="text-2xl font-bold">
              <Link to="contact" className="hover:text-orange-500">
                Contact
              </Link>
            </NavbarLink>
            <NavbarLink href="#" className="text-2xl font-bold">
              <Link to="cart" className="hover:text-red-500">
                cart
              </Link>
            </NavbarLink>
          </NavbarCollapse>
        </Navbar>
      </nav>
    </div>
  );
}
export default Header;
