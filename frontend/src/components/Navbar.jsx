import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-lg font-bold">
        HO Blogs
      </Link>
      <div className="flex gap-4">
        <Link to="/create" className="text-gray-700 hover:text-black">
          New Post
        </Link>
        <Link to="/login" className="text-gray-700 hover:text-black">
          Login
        </Link>
      </div>
    </nav>
  );
}