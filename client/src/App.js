import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import MovieList from "./components/MovieList";
import Navbar from "./components/Menu";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={<MovieList />}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
