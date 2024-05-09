import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import { Provider } from "react-redux";
import store from "../store";
import ProductList from "./ProductList";

jest.mock("axios");
describe("ProductList Component", () => {
  test("displays fetched products correctly", async () => {
    const mockedProducts = [
      { _id: "1", name: "Product 1", quantity: 5 },
      { _id: "2", name: "Product 2", quantity: 10 },
    ];

    axios.get.mockResolvedValueOnce({
      data: {
        data: mockedProducts,
        limit: 10,
      },
    });
    const { findByText } = render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        "http://127.0.0.1:4000/api/products?page=1&category=&price="
      );
      // Ensure product names are rendered correctly
      expect(findByText("Product 1")).toBeTruthy();
      expect(findByText("Product 2")).toBeTruthy();
    });
  });
});
