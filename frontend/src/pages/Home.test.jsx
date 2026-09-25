import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./Home";

describe("Home", () => {
  it("renders the page heading", () => {
    render(<Home />);
    expect(screen.getByText("Latest Posts")).toBeInTheDocument();
  });

  it("only shows published posts, not drafts", () => {
    render(<Home />);
    expect(
      screen.getByText("Building a Blog API with Laravel Sanctum")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Draft: Notes on Testing Strategy")
    ).not.toBeInTheDocument();
  });

  it("shows at most 3 posts", () => {
    render(<Home />);
    const posts = screen.getAllByRole("heading", { level: 2 });
    expect(posts.length).toBeLessThanOrEqual(3);
  });
});