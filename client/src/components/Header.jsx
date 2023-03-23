import React, { useState } from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import UserAdmin from "./UserAdmin";
import UserCust from "./UserCust";

export default function Header(props) {
  let navigate = useNavigate()
  const [showLogin, setModalLogin] = useState(false);
  const [showRegister, setModalRegister] = useState(false);
  return (
    <>
      <ModalLogin show={showLogin} hide={() => setModalLogin(false)} toRegister={() => [setModalLogin(false), setModalRegister(true)]}/>
      <ModalRegister show={showRegister} hide={() => setModalRegister(false)} toLogin={() => [setModalLogin(true), setModalRegister(false)]}/>
      <Navbar className="navbar" expand="lg" fixed={"top"} bg="transparent">
        <Container fluid className="mx-5 p-2">
          <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate("/")}>
            <img src={`img/LOGO.png`} alt="icon" className="me-2" />
            <img src={`img/DUMBSOUND.png`} alt="icon" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll></Nav>
            {props.IsLogin === "admin" ? (
            <>
              <UserAdmin />
            </>
          ) : props.IsLogin === "user" ? (
            <>
              <UserCust user={props.user} />
            </>
          ) : (
            <>
              <Form className="d-flex gap-3">
                  <Button className="login" onClick={() => setModalLogin(true)}>
                    Login
                  </Button>
                  <Button className="register" onClick={() => setModalRegister(true)}>
                    Register
                  </Button>
                </Form>
            </>
          )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
