import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import AddProduct from "./AddProduct";
import { BrowserRouter as Router } from "react-router-dom";
import React from "react";

jest.mock("axios");

describe("AddProduct Component", () => {
  test("submits product data to server", async () => {
    const productData = {
      name: "Test Product",
      description: "Test Description",
      price: "100",
      quantity: "10",
      category: "Fashion",
    };
    axios.post.mockResolvedValueOnce({ data: productData });
    render(
      <Router>
        <AddProduct />
      </Router>
    );
    // Fill out form fields
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: productData.name },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: productData.description },
    });
    fireEvent.change(screen.getByLabelText("Price"), {
      target: { value: productData.price },
    });
    fireEvent.change(screen.getByLabelText("Quantity"), {
      target: { value: productData.quantity },
    });
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: productData.category },
    });
    // Submit form
    fireEvent.click(screen.getByText("Add Products"));
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "http://127.0.0.1:4000/api/products/addProduct",
        expect.objectContaining(productData)
      );
    });
  });
});
