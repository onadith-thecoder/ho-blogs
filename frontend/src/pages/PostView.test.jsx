// src/pages/PostView.test.jsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import PostView from "./PostView";
import apiClient from "../api/client";

vi.mock("../api/client");

function renderPostView(id = "1") {
  return render(
    <MemoryRouter initialEntries={[`/posts/${id}`]}>
      <Routes>
        <Route path="/posts/:id" element={<PostView />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("PostView", () => {
  it("renders the post title and content", async () => {
    apiClient.get.mockResolvedValue({
      data: {
        post: {
          id: 1,
          title: "My Test Post",
          content: "Full post content here.",
          created_at: "2026-09-20T10:00:00Z",
        },
        related_posts: [],
      },
    });

    renderPostView("1");

    expect(await screen.findByText("My Test Post")).toBeInTheDocument();
    expect(screen.getByText("Full post content here.")).toBeInTheDocument();
  });

  it("renders related posts when present", async () => {
    apiClient.get.mockResolvedValue({
      data: {
        post: {
          id: 1,
          title: "My Test Post",
          content: "Full post content here.",
          created_at: "2026-09-20T10:00:00Z",
        },
        related_posts: [{ id: 2, title: "A Related Post" }],
      },
    });

    renderPostView("1");

    expect(await screen.findByText("A Related Post")).toBeInTheDocument();
  });

  it("shows an error message if the post fails to load", async () => {
    apiClient.get.mockRejectedValue(new Error("Not found"));

    renderPostView("999");

    expect(
      await screen.findByText("Could not load this post.")
    ).toBeInTheDocument();
  });
});