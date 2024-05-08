// Login.test.js
import { render, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/Login";

test("allows the user to login", async () => {
  const { getByLabelText, getByText } = render(<Login />);

  // Fill in the email and password fields
  const emailInput = getByLabelText(/email address/i);
  const passwordInput = getByLabelText(/password/i);
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });

  // Simulate form submission
  const submitButton = getByText(/sign in/i);
  fireEvent.click(submitButton);

  // Wait for the login process to complete
  await waitFor(() => {
    expect(window.location.href).toBe("/");
  });
});
