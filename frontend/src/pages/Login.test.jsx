import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";
import apiClient from "../api/client";
import { AuthProvider } from "../context/AuthContext";

vi.mock("../api/client");

function renderLogin() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  );
}

describe("Login", () => {
  it("renders the login form", () => {
    apiClient.get.mockResolvedValue({ data: {} });
    renderLogin();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("shows an error message on invalid credentials", async () => {
    apiClient.get.mockResolvedValue({ data: {} });
    apiClient.post.mockRejectedValue({ response: { status: 401 } });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(
      await screen.findByText("Invalid email or password.")
    ).toBeInTheDocument();
  });

  it("calls the login API with entered credentials", async () => {
    apiClient.get.mockResolvedValue({ data: {} });
    apiClient.post.mockResolvedValue({
      data: { user: { name: "Test" }, token: "fake-token" },
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

      await vi.waitFor(() => {
    expect(localStorage.getItem("token")).toBe("fake-token");
  });
});
});
      
    