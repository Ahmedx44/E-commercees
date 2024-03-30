import { Breadcrumb } from "flowbite-react";

function AdminHeader() {
  return (
    <div className="w-full ml-1 py-7 bg-gray-50 text-2xl font-bold fixed z-20">
      <Breadcrumb aria-label="Default breadcrumb example">
        <Breadcrumb.Item href="#" icon={HiHome}>
          Home
        </Breadcrumb.Item>
        <Breadcrumb.Item href="#">Projects</Breadcrumb.Item>
        <Breadcrumb.Item>Flowbite React</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default AdminHeader;
