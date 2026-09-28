import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Register from "./pages/Register";
import PostView from "./pages/PostView";
import EditPost from "./pages/EditPost";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <AuthProvider>
      <div className="bg-ambient" />
      <div className="bg-overlay" />
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/posts/:id" element={<PostView />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="/search" element={<SearchResults />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;