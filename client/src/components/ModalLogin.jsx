import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from "react-bootstrap"
import Swal from 'sweetalert2'

import { useMutation } from 'react-query';
import { API, setAuthToken } from "../config/api";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextUser";

export default function ModalLogin(props) {
  let navigate = useNavigate()

  const [_, dispatch] = useContext(UserContext);

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: ""
  });

  const ChangeLogin = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const SubmitLogin = useMutation(async (e) => {
    try {
      e.preventDefault();
  
      const response = await API.post('/login', formLogin);

      // Send data to useContext
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: response.data.data,
      });
      setAuthToken(response.data.data.token);
  
      setFormLogin({
        email: '',
        password: '',
      });
      props.hide()
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Login Success',
        showConfirmButton: false,
        timer: 1500
      })

      // Status check
      if (response.data.data.role === 'admin') {
        navigate('/');
        console.log(`You're Admin ${response.data.data.name}`);
      } else if (response.data.data.role === 'user') {
        navigate('/');
        console.log(`You're User ${response.data.data.name}`);
      } else {
        navigate('/')
      }
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Login Failed',
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
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#161616" }}>
          <Form onSubmit={(e) => SubmitLogin.mutate(e)}>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" name="email" onChange={ChangeLogin} value={formLogin.email} required />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Control type="password" placeholder="Password" name="password" onChange={ChangeLogin} value={formLogin.password} required />
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
