import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Importing MemoryRouter for providing context
import axios from "axios";
import Login from "./Login";
// Mocking react-redux hooks
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock("axios");
describe("Login Component", () => {
  test("submits form with valid data", async () => {
    // Mocking useDispatch and useSelector hooks
    const useDispatchMock = jest.fn();
    const useSelectorMock = jest.fn();
    useDispatchMock.mockReturnValue(() => {});
    useSelectorMock.mockReturnValue({ language: "en" });

    const { getByLabelText, getByRole } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    fireEvent.change(getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    // Submit form
    fireEvent.click(getByRole("button", { name: /ይግቡቡ/i }));
    // Wait for axios post request to be called
    await waitFor(() => {
      // Check if axios post request is called with correct data
      expect(axios.post).toHaveBeenCalledWith(
        "http://127.0.0.1:4000/api/users/login",
        { email: "test@example.com", password: "password123" }
      );
    });
  });
});
