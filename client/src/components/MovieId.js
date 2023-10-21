import React, { useEffect, useRef, useState } from 'react';
import { Card, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import EditModal from './EditModal';

function MovieId() {
  const [movies, setMovies] = useState([]);
  const hasFetched = useRef(false);
  const params = useParams(); //Params need to be passed a dependency to the useEffect function.

  // This method fetches the movies from the database.
  useEffect(() => {
    async function getMovieId() {
      let id = params.id;
      console.log('Id: ', { id });
      const response = await fetch(`http://budfrogsdev.me:5000/movie/${id}`); // pass to express route

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const movies = await response.json();
      if (hasFetched.current === false) {
        setMovies(movies);
        hasFetched.current = true;
      }
    }

    getMovieId();
  }, [params]); //add params to the useEffect function

  // This method will map out the records on the table
  function movieId() {
    //console.log('movies Object: ', movies.title, ' year: ', movies.year);
    return (
      <>
        <Container fluid className='container-md'>
          <Row className='justify-content-center'>
            <Card key={movies._id} style={{ width: '13rem' }}>
              <Card.Img variant='top' src='../logo192.png' />
              <Card.Body>
                <Card.Title>{movies.title}</Card.Title>
                <Card.Text>
                  <strong>Year:</strong> {movies.year}
                </Card.Text>
                <Card.Text>
                  <strong>Cast:</strong> {movies.cast}
                </Card.Text>
                <Card.Text>
                  <strong>Genre:</strong> {movies.genres}
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <EditModal editProps={movies} />
              </Card.Footer>
            </Card>
          </Row>
        </Container>
      </>
    );
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Movie ID</h3>
      {movieId()}
    </div>
  );
}

export default MovieId;
