import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import EditModal from "./EditModal";

// import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    cast: "",
    genres: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

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

  async function handleSubmit(e) {
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

    const movies = await response.json();

    window.myObj = movies;
    setMovies(movies);
    clearFormData();
  }

  // This method will delete a movie
  // async function deleteMovie(id) {
  //   await fetch(`http://test.budfrogsdev.me:5010/${id}`, {
  //     method: 'DELETE',
  //   });

  //   const newMovies = movies.filter((el) => el._id !== id);
  //   setMovies(newMovies);
  // }

  // This method will map out the records on the table
  function MovieList() {
    //console.log("cardObject: ", movies);
    return (
      <Container fluid className="container-md">
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-center mb-3 pb-3 pt-3 movie-search">
            <Form.Group as={Col} controlId="formTitle">
              <Form.Control
                title="Movie Title"
                placeholder="Title"
                aria-label="Title"
                aria-describedby="Title"
                onChange={handleChange}
                value={formData.title}
                name="title"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formCast">
              <Form.Control
                title="Names of Cast members."
                placeholder="Cast"
                aria-label="Cast"
                aria-describedby="Cast"
                onChange={handleChange}
                value={formData.cast}
                name="cast"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGenres">
              <Form.Control
                title="Comma delimited list of genres names"
                placeholder="Genres"
                aria-label="Genres"
                aria-describedby="Genres"
                onChange={handleChange}
                value={formData.genres}
                name="genres"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formYear">
              <Form.Control
                placeholder="Release Year"
                aria-label="Year"
                aria-describedby="Year"
                minLength={4}
                maxLength={4}
                onChange={handleChange}
                value={formData.year}
                name="year"
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form.Group>
          </Row>
        </Form>
        <Row className="justify-content-center">
          {movies.map((cardObj, j) => {
            return (
              <Card key={cardObj._id} style={{ width: "15rem" }}>
                <Card.Img variant="top" className="center" src="logo192.png" max-width="100px" />
                <Card.Body>
                  <Card.Title>{cardObj.title}</Card.Title>
                  <Card.Text>
                    <strong>Year:</strong> {cardObj.year}
                  </Card.Text>
                  <Card.Text>
                    <strong>Cast: </strong>
                    {typeof cardObj.cast === "undefined"
                      ? ""
                      : cardObj.cast.map((x, index) => {
                          return cardObj.cast.length - 1 === index ? x : x + ",";
                        })}
                  </Card.Text>
                  <Card.Text>
                    <strong>Genre: </strong>
                    {typeof cardObj.genres === "undefined"
                      ? ""
                      : cardObj.genres.map((x, index) => {
                          return cardObj.genres.length - 1 === index ? x : x + ",";
                        })}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <EditModal editProps={cardObj} movieId={cardObj._id} />
                </Card.Footer>
              </Card>
            );
          })}
        </Row>
      </Container>
    );
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Movie List Test Site</h3>
      <h5>(Note: Main list 2018 and older. A few in 2022 and 2023.)</h5>
      {MovieList()}
    </div>
  );
}

export default MovieList;
