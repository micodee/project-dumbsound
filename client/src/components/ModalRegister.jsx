import React, { useState } from 'react'
import { Button, Form, Modal } from "react-bootstrap"
import Swal from 'sweetalert2'

import { useMutation } from 'react-query';
import { API } from "../config/api";

export default function ModalRegister(props) {
  const [formRegister, setFormRegister] = useState({
    email: '',
    password: '',
    fullname: '',
    gender: '',
    phone: '',
    address: '',
    });
  
    const { email, password, fullname, gender, phone, address } = formRegister;
  
    const ChangeRegister = (e) => {
      setFormRegister({
        ...formRegister,
        [e.target.name]: e.target.value,
      });
    };
  
    const SubmitRegister = useMutation(async (e) => {
      try {
        e.preventDefault();
    
        const response = await API.post('/register', formRegister);
    
        console.log("register success : ", response)
    
        setFormRegister({
          email: '',
          password: '',
          fullname: '',
          gender: '',
          phone: '',
          address: '',
        });
        props.toLogin()
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Register Success',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Register Failed, email is exist',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });

  return (
    <>
      <Modal show={props.show} onHide={props.hide} centered size="sm">
        <Modal.Header closeButton style={{ backgroundColor: "#161616", border: "none" }}>
          <Modal.Title style={{ color: "fff", fontWeight: "900" }}>
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#161616" }}>
          <Form onSubmit={(e) => SubmitRegister.mutate(e)}>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" name="email" onChange={ChangeRegister} value={email} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="password" placeholder="Password" name="password" onChange={ChangeRegister} value={password} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Fullname" name="fullname" onChange={ChangeRegister} value={fullname} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Gender" name="gender" onChange={ChangeRegister} value={gender} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Phone" name="phone" onChange={ChangeRegister} value={phone} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control type="text" placeholder="Address" name="address" onChange={ChangeRegister} value={address} required />
            </Form.Group>
            <Button variant="secondary col-12 mb-3" type="submit" style={{ backgroundColor: "#EE4622", border: "none" }}>
              Register
            </Button>
              <p style={{ color: "red", textAlign: "center" }}>
              </p>
            <p style={{ textAlign: "center", fontSize: ".9rem" }}>
            Already have an account ?{" "}
              <span
                onClick={props.toLogin}
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
