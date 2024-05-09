import React from "react";
import { render } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter } from "react-router-dom";
import History from "./History";
import "@testing-library/jest-dom";

jest.mock("axios");

describe("History Component", () => {
  it("renders order history entries", async () => {
    const orders = [
      {
        _id: "1",
        products: [{}],
        totalAmount: 100,
        status: "completed",
      },
    ];

    // Mock axios get request
    axios.get.mockResolvedValueOnce({ data: { data: { orders } } });
    const { queryByText } = render(
      <MemoryRouter>
        <History />
      </MemoryRouter>
    );

    // Check if order history entries are rendered
    expect(queryByText("Number of Product")).toBeInTheDocument();
    expect(queryByText("Total Amount")).toBeInTheDocument();
  });
});
