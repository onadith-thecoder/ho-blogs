import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Home from "./Home";
import apiClient from "../api/client";

vi.mock("../api/client");

const mockApiPosts = [
  { id: 1, title: "First Post", excerpt: "Excerpt one", created_at: "2026-09-20T10:00:00Z" },
  { id: 2, title: "Second Post", excerpt: "Excerpt two", created_at: "2026-09-19T10:00:00Z" },
  { id: 3, title: "Third Post", excerpt: "Excerpt three", created_at: "2026-09-18T10:00:00Z" },
  { id: 4, title: "Fourth Post", excerpt: "Excerpt four", created_at: "2026-09-17T10:00:00Z" },
];

describe("Home", () => {
  it("renders the page heading", async () => {
  apiClient.get.mockResolvedValue({ data: { data: mockApiPosts } });
  render(<Home />);
  expect(screen.getByText("Latest Posts")).toBeInTheDocument();
  await screen.findByText("First Post");
});

  it("shows posts returned from the API", async () => {
    apiClient.get.mockResolvedValue({ data: { data: mockApiPosts } });
    render(<Home />);
    expect(await screen.findByText("First Post")).toBeInTheDocument();
  });

  it("shows at most 3 posts even if the API returns more", async () => {
    apiClient.get.mockResolvedValue({ data: { data: mockApiPosts } });
    render(<Home />);
    await screen.findByText("First Post");
    const posts = screen.getAllByRole("heading", { level: 2 });
    expect(posts.length).toBeLessThanOrEqual(3);
  });

  it("shows an error message if the API call fails", async () => {
    apiClient.get.mockRejectedValue(new Error("Network error"));
    render(<Home />);
    expect(
      await screen.findByText("Could not load posts. Please try again later.")
    ).toBeInTheDocument();
  });
});