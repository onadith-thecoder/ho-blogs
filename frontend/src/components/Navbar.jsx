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
    <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between gap-4">
      <Link to="/" className="text-lg font-bold shrink-0">
        HO Blogs
      </Link>

      <form onSubmit={handleSearch} className="flex-1 max-w-xs">
        <input
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
        />
      </form>

      <div className="flex gap-4 items-center shrink-0">
        {user ? (
          <>
            <Link to="/create" className="text-gray-700 hover:text-black">
              New Post
            </Link>
            <span className="text-gray-500 text-sm">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-black"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-black">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-black">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}