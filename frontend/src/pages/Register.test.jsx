import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";
import apiClient from "../api/client";
import { AuthProvider } from "../context/AuthContext";

vi.mock("../api/client");

function renderRegister() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Register", () => {
  it("renders the registration form", () => {
    apiClient.get.mockResolvedValue({ data: {} });
    renderRegister();
    expect(screen.getByPlaceholderText("Full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Confirm password")
    ).toBeInTheDocument();
  });

  it("shows a validation error from the API", async () => {
    apiClient.get.mockResolvedValue({ data: {} });
    apiClient.post.mockRejectedValue({
      response: {
        status: 422,
        data: { errors: { password: ["The password field must be at least 8 characters."] } },
      },
    });

    renderRegister();

    fireEvent.change(screen.getByPlaceholderText("Full name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "short" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "short" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(
      await screen.findByText(
        "The password field must be at least 8 characters."
      )
    ).toBeInTheDocument();
  });

  it("calls the register API with entered data", async () => {
    apiClient.get.mockResolvedValue({ data: {} });
    apiClient.post.mockResolvedValue({
      data: { user: { name: "Test User" }, token: "fake-token" },
    });

    renderRegister();

    fireEvent.change(screen.getByPlaceholderText("Full name"), {
      target: { value: "Test User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await vi.waitFor(() => {
      expect(apiClient.post).toHaveBeenCalledWith("/register", {
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        password_confirmation: "password123",
      });
    });
  });
});