import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-lg font-bold">
        HO Blogs
      </Link>
      <div className="flex gap-4 items-center">
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