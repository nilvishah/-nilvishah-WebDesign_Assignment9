import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Login from "./components/login/Login";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./Contact/Contact";
import Jobs from "./components/Jobs/Jobs";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/jobs" element={<Jobs />} />
      </Routes>
    </Router>
  );
};

export default App;
