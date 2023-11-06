import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

export default function Create() {
  const [form, setForm] = useState({
    title: '',
    year: '',
    cast: '',
    genre: '',
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function updateTitle(e) {
    let target = e.target.value;
    if (target.length > 0) {
      setForm({ ...form, title: e.target.value });
      // console.log(form);
    } else {
      // Validate title
    }
  }
  function updateYear(e) {
    setForm({ ...form, year: e.target.value });
    // console.log(form);
  }

  function updateCast(e) {
    setForm({ ...form, cast: e.target.value.split(',') });
    // console.log(form);
  }
  function updateGenre(e) {
    setForm({ ...form, genre: e.target.value.split(',') });
    // console.log(form);
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new movie to the database.
    const newMovie = { ...form };

    await fetch('http://budfrogsdev.me:5001/movie/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMovie),
    }).catch((error) => {
      window.alert(error);
    });
    handleClose(); // close the modal window
  }

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Create Movie
      </Button>

      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup className='mb-3'>
              <InputGroup.Text id='title'>Title</InputGroup.Text>
              <Form.Control
                id='formTitle'
                placeholder='Movie Title'
                aria-label='Title'
                aria-describedby='title'
                onChange={(e) => updateTitle(e)}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Text id='year'>Year</InputGroup.Text>
              <Form.Control
                id='formYear'
                placeholder='Movie Release Year'
                aria-label='Year'
                aria-describedby='year'
                minLength={4}
                maxLength={4}
                onChange={(e) => updateYear(e)}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Text id='cast'>Cast</InputGroup.Text>
              <Form.Control
                id='formCast'
                as='textarea'
                title='Comma delimited list of cast names'
                placeholder='Movie Cast'
                aria-label='Cast'
                aria-describedby='cast'
                rows='3'
                onChange={(e) => updateCast(e)}
              />
            </InputGroup>
            <InputGroup className='mb-3'>
              <InputGroup.Text id='genre'>Genre</InputGroup.Text>
              <Form.Control
                id='formGenre'
                as='textarea'
                title='Comma delimited list of genre names'
                placeholder='Movie Genre'
                aria-label='Genre'
                aria-describedby='genre'
                rows='3'
                onChange={(e) => updateGenre(e)}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={onSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
