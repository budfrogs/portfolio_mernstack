import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Create from "./Create";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

// Here, we display our Navbar
export default function Menu() {
  return (
    <header>
      <Navbar
        expand="md"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand>
            {" "}
            <img
              width="25%"
              src="/MongoDb.png"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#Home">Home</Nav.Link>
              <Nav.Link>
                <Create />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
