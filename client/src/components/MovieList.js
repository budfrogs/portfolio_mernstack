import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Search from "./Search";
import Moviecard from "./Moviecards";
import "./MovieList.css";

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    cast: "",
    genres: "",
  });

  // function handleChange(event) {
  //   setFormData((prevFormData) => {
  //     return {
  //       ...prevFormData,
  //       [event.target.name]: event.target.value,
  //     };
  //   });
  // }

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  function clearFormData() {
    setFormData((prevFormData) => {
      return {
        title: "",
        year: "",
        cast: "",
        genres: "",
      };
    });
  }
  const handleSubmit = async (e) => {
    // async function handleSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new movie to the database.
    const newSearch = { ...formData };

    const response = await fetch("http://test.budfrogsdev.me:5010/movie/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSearch),
    }).catch((error) => {
      if (response === undefined) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
      }
    });

    const newMovieList = await response.json();

    window.myObj = newMovieList;
    setMovies((prevMoveList) => newMovieList);
    clearFormData();
  };

  // This method will delete a movie
  // async function deleteMovie(id) {
  //   await fetch(`http://test.budfrogsdev.me:5010/${id}`, {
  //     method: 'DELETE',
  //   });

  //   const newMovies = movies.filter((el) => el._id !== id);
  //   setMovies(newMovies);
  // }

  // const moviesElements = movies.map((cardObj) => (
  //   <Moviecard
  //     key={cardObj._id}
  //     cardObj={cardObj}
  //   />
  // ));
  function card(movies) {
    return (
      <Moviecard
        key="1"
        cardObj={movies}
      />
    );
  }

  const moviesElements = card(movies);
  // console.log(moviesElements);
  const Header = () => {
    return (
      <div className="text-white text-center ">
        <h4>Movie List Test Site</h4>
        <h5>(Note: Main list 2018 and older. A few in 2022 and 2023.)</h5>{" "}
      </div>
    );
  };

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <Container
        flex
        className="mt-3 "
      >
        <Header />
        <Search
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        {moviesElements}
      </Container>
    </div>
  );
}
