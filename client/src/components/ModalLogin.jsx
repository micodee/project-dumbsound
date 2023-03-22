import React from 'react'
import { Button, Form, Modal } from "react-bootstrap"

export default function ModalLogin(props) {
  return (
    <>
      <Modal show={props.show} onHide={props.hide} centered size="sm">
        <Modal.Header closeButton style={{ backgroundColor: "#161616", border: "none" }}>
          <Modal.Title style={{ color: "fff", fontWeight: "900" }}>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#161616" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" name="email"  />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control type="password" placeholder="Password" name="password" />
            </Form.Group>
            <Button variant="secondary col-12 mb-3" type="submit" style={{ backgroundColor: "#EE4622", border: "none" }}>
              Login
            </Button>
              <p style={{ color: "red", textAlign: "center" }}>
              </p>
            <p style={{ textAlign: "center", fontSize: ".9rem" }}>
              Don't have an account ?{" "}
              <span
                onClick={props.toRegister}
                style={{ cursor: "pointer" }}
              >
                Klik <b>Here</b>
              </span>
            </p>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
