import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import NavBar from "./components/NavBar";
import Home from "./components/pages/home/Home";
import Contact from "./components/pages/contact/Contact";
import Admin from "./components/pages/admin/Admin";
import Accommodations from "./components/pages/accommodations/Accommodations";
import Login from "./components/pages/login/Login";
import Footer from "./components/Footer";
import AccommodationDetails from "./components/pages/AccommodationDetails";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <div className="wrapper">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/login" element={<Login />} />
            <Route path="/accommodations/detail/:id" element={<AccommodationDetails />} />
            <Route path="admin" element={<Admin />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
