import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import { ImArrowUp } from "react-icons/im";
import NavBar from "./components/NavBar";
import Home from "./components/pages/home/Home";
import Contact from "./components/pages/contact/Contact";
import Admin from "./components/pages/admin/Admin";
import Accommodations from "./components/pages/accommodations/Accommodations";
import Login from "./components/pages/login/Login";
import Footer from "./components/Footer";
import AccommodationDetails from "./components/pages/AccommodationDetails";

function App() {
  const [backTop, setBackTop] = useState();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 500) {
        setBackTop(true);
      } else {
        setBackTop(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AuthProvider>
      <div className="App">
        <NavBar />
        <div className="Wrapper">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/login" element={<Login />} />
            <Route path="/accommodations/detail/:id" element={<AccommodationDetails />} />
            <Route path="admin" element={<Admin />} />
          </Routes>
          {backTop && (
            <div className="Back__Top__Container">
              <ImArrowUp id="Back__Top__Container__Item" onClick={scrollToTop} />
            </div>
          )}
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
