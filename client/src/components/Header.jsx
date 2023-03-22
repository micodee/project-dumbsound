import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <>
      <Navbar className="navbar" expand="lg" fixed={"top"} bg="transparent">
        <Container fluid className="ms-5 me-5 p-2 navcontainer">
          <Navbar.Brand className="navcontainer" style={{ cursor: "pointer" }}>
            <img src={`img/LOGO.png`} alt="icon" className="me-2" />
            <img src={`img/DUMBSOUND.png`} alt="icon" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="navcontainer">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
                <Form className="d-flex gap-3">
                  <Button className="login">
                    Login
                  </Button>
                  <Button
                    className="register"
                  >
                    Register
                  </Button>
                </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
