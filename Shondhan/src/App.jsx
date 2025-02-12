import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Reports from "./pages/Reports";
import CrimeFeed from "./pages/Feed";
import Trending from "./pages/Trending";
import Profile from "./pages/Profile";
import Events from "./pages/Events";

function App() {
  return (
    <div className="min-h-screen flex flex-col space-y-5">
      <Navbar />

      <div className = 'px-23'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/feed" element={<CrimeFeed />} />
        <Route path="/events" element={<Events />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
