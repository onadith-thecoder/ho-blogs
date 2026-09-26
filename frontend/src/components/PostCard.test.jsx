import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import PostCard from "./PostCard";

const mockPost = {
  id: 1,
  title: "Test Post Title",
  excerpt: "This is a test excerpt.",
  created_at: "2026-09-20T10:00:00Z",
  user: { name: "Hashen" },
};

describe("PostCard", () => {
  it("renders the post title", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getByText("Test Post Title")).toBeInTheDocument();
  });

  it("renders the author name", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getByText(/Hashen/)).toBeInTheDocument();
  });

  it("renders the excerpt", () => {
    render(
      <MemoryRouter>
        <PostCard post={mockPost} />
      </MemoryRouter>
    );
    expect(screen.getByText("This is a test excerpt.")).toBeInTheDocument();
  });
});