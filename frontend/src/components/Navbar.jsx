import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleSearch(e) {
    e.preventDefault();
    if (query.trim().length < 2) return;
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <nav className="sticky top-0 z-10 backdrop-blur-md bg-bg-dark-2/60 border-b border-teal/30 px-6 py-4 flex items-center justify-between gap-4">
      <Link
        to="/"
        className="font-heading text-lg font-bold tracking-tight shrink-0 bg-gradient-to-r from-mustard to-teal-soft bg-clip-text text-transparent"
      >
        HO BLOGS
      </Link>

      <form onSubmit={handleSearch} className="flex-1 max-w-xs">
        <input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full bg-bg-dark/60 border border-teal/40 px-4 py-2 text-sm text-offwhite placeholder-muted
                     focus:outline-none focus:border-mustard focus:ring-2 focus:ring-mustard/40 transition"
        />
      </form>

      <div className="flex gap-5 items-center shrink-0 text-sm font-medium uppercase tracking-wide">
        {user ? (
          <>
            <Link
              to="/create"
              className="rounded-full bg-mustard text-bg-dark px-4 py-1.5 font-semibold shadow-[0_0_0_0_rgba(223,175,52,0)]
                         hover:shadow-[0_0_18px_2px_rgba(223,175,52,0.45)] transition-shadow duration-300"
            >
              New Post
            </Link>
            <span className="text-muted normal-case">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="text-offwhite/80 hover:text-mustard transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="relative text-offwhite/80 hover:text-mustard transition-colors
              after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-mustard
              after:transition-all hover:after:w-full">
              Login
            </Link>
            <Link to="/register" className="relative text-offwhite/80 hover:text-mustard transition-colors
              after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-mustard
              after:transition-all hover:after:w-full">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}