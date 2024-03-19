import React, { useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";

export default function Create() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [formData, setFormData] = useState({
    title: "",
    year: "",
    cast: "",
    genres: "",
  });

  function handleChange(event) {
    setFormData((prevFormData) => {
      const name = event.target.name;
      return {
        ...prevFormData,
        [event.target.name]: name === "genres" || name === "cast" ? event.target.value.split(",") : event.target.value,
      };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new movie to the database.
    const newMovie = { ...formData };

    await fetch("http://test.budfrogsdev.me:5010/movie/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      <Button
        variant="primary"
        onClick={handleShow}
      >
        Add Movie
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup className="mb-1">
              <InputGroup.Text
                id="title"
                className="p-2 create-label"
              >
                Title
              </InputGroup.Text>
              <Form.Control
                id="formTitle"
                placeholder="Movie Title"
                aria-label="Title"
                aria-describedby="title"
                onChange={handleChange}
                name="title"
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <InputGroup.Text
                id="year"
                className="p-2 create-label"
              >
                Year
              </InputGroup.Text>
              <Form.Control
                id="formYear"
                placeholder="Movie Release Year"
                aria-label="Year"
                aria-describedby="year"
                minLength={4}
                maxLength={4}
                onChange={handleChange}
                name="year"
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <InputGroup.Text
                id="cast"
                className="p-2 create-label"
              >
                Cast
              </InputGroup.Text>
              <Form.Control
                id="formCast"
                as="textarea"
                title="Comma delimited list of cast names"
                placeholder="Movie Cast"
                aria-label="Cast"
                aria-describedby="cast"
                rows="3"
                onChange={handleChange}
                name="cast"
              />
            </InputGroup>
            <InputGroup className="mb-1">
              <InputGroup.Text
                id="genres"
                className="p-2 create-label"
              >
                Genre
              </InputGroup.Text>
              <Form.Control
                id="formGenre"
                as="textarea"
                title="Comma delimited list of genres names"
                placeholder="Movie Genre"
                aria-label="Genre"
                aria-describedby="genres"
                rows="3"
                onChange={handleChange}
                name="genres"
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={onSubmit}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
