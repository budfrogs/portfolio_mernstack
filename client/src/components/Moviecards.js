import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import EditModal from "./EditModal";

export default function Moviecard(props) {
  const mov = props.cardObj;
  return (
    <Row className="g-0 justify-content-center">
      {mov.map((cardObj, idx) => (
        <Col
          key={idx}
          xs={10}
          sm={6}
          md={4}
          xl={2}
          xxl={2}
        >
          ``
          <Card className="h-100">
            <Card.Img
              variant="top"
              className="center"
              src="logo192.png"
              max-width="100px"
              alt="Image Upload"
              title="Image Upload Coming Soon!"
            />
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
            <Card.Footer className="cardfooter text-center">
              <EditModal
                editProps={cardObj}
                movieId={cardObj._id}
              />
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
