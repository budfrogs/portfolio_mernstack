import React, { useState } from 'react';
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';

function EditModal(props) {
  // const movieId = props.movieId;
  const movie = props.editProps;
  const [show, setShow] = useState(false);
  const [form, setForm] = useState(movie);

  //window.formObj = form;

  //  These methods will update the state properties.

  function updateTitle(e) {
    setForm({ ...form, title: e.target.value });
  }
  function updateYear(e) {
    setForm({ ...form, year: e.target.value });
  }

  function updateCast(e) {
    setForm({ ...form, cast: e.target.value.split(',') });
    // console.log(form);
  }

  function updateGenre(e) {
    setForm({ ...form, genre: e.target.value.split(',') });
    // console.log(form);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSave = async () => {
    //add update call here!
    console.log('save', JSON.stringify(form));
    setShow(false);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    };

    const response = await fetch('http://budfrogsdev.me:5001/movie/updateOne', requestOptions);
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    window.location.reload(true);
    return response.json();
  };

  return (
    <>
      <Button variant='primary' onClick={handleShow}>
        Edit Movie
      </Button>

      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
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
                value={form.title}
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
                value={form.year}
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
                value={form.cast}
                rows='4'
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
                aria-describedby='Genre'
                value={form.genre}
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
          <Button variant='primary' onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
