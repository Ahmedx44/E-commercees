import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom"; // Import MemoryRouter
import Product from "./Product";

jest.mock("axios");

describe("Products Component", () => {
  it("fetches products correctly", async () => {
    const mockedProducts = [
      {
        _id: "1",
        name: "Product 1",
        price: 10,
        quantity: 5,
        rating: 4.5,
      },
      {
        _id: "2",
        name: "Product 2",
        price: 20,
        quantity: 10,
        rating: 3.8,
      },
    ];

    // Mock axios get request
    axios.get.mockResolvedValueOnce({ data: { data: mockedProducts } });

    render(
      <MemoryRouter>
        <Product />
      </MemoryRouter>
    );

    // Ensure that axios.get was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      "http://127.0.0.1:4000/api/products"
    );
  });
});
