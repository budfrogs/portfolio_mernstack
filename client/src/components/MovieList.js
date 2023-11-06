import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import EditModal from './EditModal';

// import { Link } from 'react-router-dom';

function MovieList() {
  const [movies, setMovies] = useState([]);
  // const hasFetched = useRef(false);
  // This method fetches the movies from the database.
  const [form, setForm] = useState({
    title: '',
    year: '',
    cast: '',
    genre: '',
  });

  //window.formObj = form;

  //  These methods will update the state properties.

  function searchTitle(e) {
    setForm({ ...form, title: e.target.value });
  }
  function searchYear(e) {
    setForm({ ...form, year: e.target.value });
  }

  function searchCast(e) {
    setForm({ ...form, cast: e.target.value });
  }
  function searchGenre(e) {
    setForm({ ...form, genre: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new movie to the database.
    const newSearch = { ...form };

    const response = await fetch('http://budfrogsdev.me:5001/movie/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
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
    form.title = '';
    form.cast = [];
    form.genre = [];
    form.year = '';
  }

  // This method will delete a movie
  // async function deleteMovie(id) {
  //   await fetch(`http://budfrogsdev.me:5001/${id}`, {
  //     method: 'DELETE',
  //   });

  //   const newMovies = movies.filter((el) => el._id !== id);
  //   setMovies(newMovies);
  // }

  // This method will map out the records on the table
  function movieList() {
    return (
      <Container fluid className='container-md'>
        <Form onSubmit={handleSubmit}>
          <Row className='justify-content-center mb-3 pb-3 pt-3 movie-search'>
            <Form.Group as={Col} controlId='formTitle'>
              <Form.Control
                title='Movie Title'
                placeholder='Title'
                aria-label='Title'
                aria-describedby='Title'
                onChange={(e) => searchTitle(e)}
                value={form.title}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formCast'>
              <Form.Control
                title='Names of Cast members.'
                placeholder='Cast'
                aria-label='Cast'
                aria-describedby='Cast'
                onChange={(e) => searchCast(e)}
                value={form.cast}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formGenre'>
              <Form.Control
                title='Comma delimited list of genre names'
                placeholder='Genre'
                aria-label='Genre'
                aria-describedby='Genre'
                onChange={(e) => searchGenre(e)}
                value={form.genre}
              />
            </Form.Group>
            <Form.Group as={Col} controlId='formYear'>
              <Form.Control
                placeholder='Release Year'
                aria-label='Year'
                aria-describedby='Year'
                minLength={4}
                maxLength={4}
                onChange={(e) => searchYear(e)}
                value={form.year}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Button variant='primary' type='submit'>
                Search
              </Button>
            </Form.Group>
          </Row>
        </Form>
        <Row className='justify-content-center'>
          {movies.map((cardObj, j) => {
            return (
              <Card key={cardObj._id} style={{ width: '15rem' }}>
                <Card.Img variant='top' src='logo192.png' />
                <Card.Body>
                  <Card.Title>{cardObj.title}</Card.Title>
                  <Card.Text>
                    <strong>Year:</strong> {cardObj.year}
                  </Card.Text>
                  <Card.Text>
                    <strong>Cast: </strong>
                    {typeof cardObj.cast === 'undefined' ? '' : cardObj.cast.map((x) => x + ' ')}
                  </Card.Text>
                  <Card.Text>
                    <strong>Genre: </strong>
                    {typeof cardObj.genre === 'undefined' ? '' : cardObj.genre.map((x) => x + ' ')}
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
      <h3>Movie List Site</h3>
      <h5>(Note: Main list 2018 and older. A few in 2022 and 2023.)</h5>
      {movieList()}
    </div>
  );
}

export default MovieList;
