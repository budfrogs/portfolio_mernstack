import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Create from "./Create";

// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";

// Here, we display our Navbar
export default function Menu() {
  return (
    <header>
      <Navbar
        bg="light"
        expand="lg"
      >
        <Navbar.Brand>
          <h1 style={{ color: "green" }}>James Developer Page</h1>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link
              as={Link}
              to="/"
              exact
            >
              Home
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/About">
                            About
                        </Nav.Link> */}
            <NavDropdown title="Portfolio">
              <NavDropdown.Item
                as={Link}
                to="/Tenzies"
              >
                Tenzies Dice Game
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/Movie"
              >
                Movie Search
              </NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link as={Link} to="/contact">
                            Contact
                        </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
