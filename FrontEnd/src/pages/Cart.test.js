import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";

import Cart from "./Cart";

const mockStore = configureStore([]);
const initialState = {
  cart: {
    items: [
      {
        id: 1,
        name: "Product 1",
        price: 10,
        quantity: 1,
      },
      {
        id: 2,
        name: "Product 2",
        price: 20,
        quantity: 2,
      },
    ],
  },
  language: {
    language: "en",
  },
};
const store = mockStore(initialState);

test("Cart displays products when there are items in the cart", () => {
  const { getByText, queryByText } = render(
    <Provider store={store}>
      <Cart />
    </Provider>
  );

  // Check if product names are displayed
  expect(getByText("Product 1")).toBeInTheDocument();
  expect(getByText("Product 2")).toBeInTheDocument();

  // Ensure that total price text is present
  expect(queryByText(/Total Price:/i)).toBeInTheDocument();
});
