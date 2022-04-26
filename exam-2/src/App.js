import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/pages/Home";
import Contact from "./components/pages/Contact";
import Admin from "./components/pages/Admin";
import Accommodations from "./components/pages/Accommodations";
import Login from "./components/pages/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="wrapper">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hotels" element={<Accommodations />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/detail/:id" element={<SpaceshipPage />} /> */}
          <Route path="admin" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
