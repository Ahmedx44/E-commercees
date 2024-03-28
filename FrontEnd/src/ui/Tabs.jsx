import { Tabs } from "flowbite-react";

function Tabss({ product }) {
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-20 mx-auto w-2/4 items-center">
      <Tabs aria-label="Default tabs" style="default" className="text-3xl">
        <Tabs.Item active title="Description" className="font-semibold text-xl">
          {product.description}
        </Tabs.Item>

        <Tabs.Item title="Review" className="font-semibold text-xl"></Tabs.Item>
      </Tabs>
    </div>
  );
}

export default Tabss;
