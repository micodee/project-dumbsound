import React, { useState } from 'react'
import { Button, Form, Modal } from "react-bootstrap"
import Swal from 'sweetalert2'

import { useMutation } from 'react-query';
import { API } from "../config/api";

export default function ModalEditProfile(props) {
  const [formProfile, setFormProfile] = useState({
    email: '',
    password: '',
    fullname: '',
    gender: '',
    phone: '',
    address: '',
    photo: '',
    });
  
    const { email, password, fullname, gender, phone, address } = formProfile;

    const [urlImage, setUrlImage] = useState("Choose Profile");

    const onChangeProfile = (e) => {
      setFormProfile({
        ...formProfile,
        [e.target.name]:
          e.target.type === 'file' ? e.target.files : e.target.value,
      });
      // Create image url for preview
      if (e.target.type === 'file') {
        setUrlImage(e.target.files[0].name);
      }
    };
  
    const ChangeRegister = (e) => {
      setFormProfile({
        ...formProfile,
        [e.target.name]: e.target.value,
      });
    };
  
    const SubmitRegister = useMutation(async (e) => {
      try {
        e.preventDefault();
    
        const response = await API.post('/register', formProfile);
    
        console.log("register success : ", response)
    
        setFormProfile({
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
            Edit Profile
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
            <Form.Group className="mb-3" >
                <Form.Select onChange={ChangeRegister} value={gender} name="gender" className="p-2 formInputProduct" required>
                <option className='colorwhite' hidden>Gender</option>
                <option value="Pria" className='colorblack'>Pria</option>
                <option value="Perempuan" className='colorblack'>Perempuan</option>
              </Form.Select>
              </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Phone" name="phone" onChange={ChangeRegister} value={phone} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Address" name="address" onChange={ChangeRegister} value={address} required />
            </Form.Group>
            <Form.Group className="mb-4">
            <Form.Label htmlFor='upload-profile' className="formInputProduct rounded p-2 flex-between" style={{ cursor: "pointer", backgroundColor: "white" }}>
              <span style={{ color: "black" }}>{urlImage}</span>
              <span><img className="px-2" src={`img/attach.png`} alt="file" style={{ width: "100%", height: "20px" }} /></span>
            </Form.Label>
            <Form.Control
              hidden
              id="upload-profile"
              type="file"
              className="py-2"
              name="thumbnail"
              onChange={onChangeProfile}
            />
            </Form.Group>
            <Button variant="secondary col-12 mb-3" type="submit" style={{ backgroundColor: "#EE4622", border: "none" }}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}
