import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { HashRouter as Router, Outlet, Route, Routes } from "react-router-dom";
import { Home } from "./Pages/Home";
import { Tenzies } from "./Pages/Tenzies";
import { Movie } from "./Pages/Movie";
import Footer from "./Components/Footer";
import Navbar from "./Components/Menu";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Outlet />}
        >
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/Tenzies"
            element={<Tenzies />}
          />
          <Route
            path="/Movie"
            element={<Movie />}
          />
        </Route>
      </Routes>

      <br />
      <Footer />
    </div>
  );
}

export default App;
