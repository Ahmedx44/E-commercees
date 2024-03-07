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

function Header() {
  return (
    <nav className="text-3xl">
      <Navbar fluid rounded>
        <NavbarBrand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
            Flowbite React
          </span>
        </NavbarBrand>
        <div className="flex md:order-2">
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
          <NavbarLink href="#" className="text-2xl">
            Home
          </NavbarLink>
          <NavbarLink href="#" className="text-2xl">
            About
          </NavbarLink>
          <NavbarLink href="#" className="text-2xl">
            Services
          </NavbarLink>
          <NavbarLink href="#" className="text-2xl">
            Contact
          </NavbarLink>
        </NavbarCollapse>
      </Navbar>
    </nav>
  );
}
export default Header;
