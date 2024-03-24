import { Button, Col, Form, Row } from "react-bootstrap";
import Create from "./Create";

export default function Search(props) {
  const formData = props.formData;
  const handleSubmit = props.handleSubmit;
  const handleChange = props.handleChange;
  return (
    <Row className="justify-content-center mb-3 pb-3 pt-3 movie-search">
      <Col
        xs={6}
        md={3}
        lg={4}
      >
        <Form onSubmit={handleSubmit}>
          <Form.Group
            as={Col}
            controlId="formTitle"
          >
            <Form.Control
              title="Movie Title"
              placeholder="Title"
              aria-label="Title"
              aria-describedby="Title"
              onChange={(e) => handleChange(e)}
              value={formData.title}
              name="title"
              className="m-1"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formCast"
          >
            <Form.Control
              title="Names of Cast members."
              placeholder="Cast"
              aria-label="Cast"
              aria-describedby="Cast"
              onChange={(e) => handleChange(e)}
              value={formData.cast}
              name="cast"
              className="m-1"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formGenres"
          >
            <Form.Control
              title="Comma delimited list of genres names"
              placeholder="Genres"
              aria-label="Genres"
              aria-describedby="Genres"
              onChange={(e) => handleChange(e)}
              value={formData.genres}
              name="genres"
              className="m-1"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId="formYear"
          >
            <Form.Control
              placeholder="Release Year"
              aria-label="Year"
              aria-describedby="Year"
              minLength={4}
              maxLength={4}
              onChange={(e) => handleChange(e)}
              value={formData.year}
              name="year"
              className="m-1"
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Button
              variant="primary"
              type="submit"
            >
              Search
            </Button>
          </Form.Group>
        </Form>
        <Create />
      </Col>
    </Row>
  );
}
