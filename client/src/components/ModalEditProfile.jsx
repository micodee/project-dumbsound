import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from "react-bootstrap"
import Swal from 'sweetalert2'

import { useMutation } from 'react-query';
import { API } from "../config/api";

export default function ModalEditProfile(props) {
  const [formProfile, setFormProfile] = useState({
    email: '',
    fullname: '',
    gender: '',
    phone: '',
    address: '',
    photo_profile: '',
    });
  
    const { email, fullname, gender, phone, address } = formProfile;

    const [urlImage, setUrlImage] = useState("Choose Profile");

    async function getDataUpdate() {
      const respUser = await API.get('/user');
      setUrlImage(respUser.data.data.photo_profile);
  
      setFormProfile({
        ...formProfile,
        fullname: respUser.data.data.fullname,
        email: respUser.data.data.email,
        gender: respUser.data.data.gender,
        phone: respUser.data.data.phone,
        address: respUser.data.data.address,
      });
    }
  
    useEffect(() => {
      getDataUpdate()
    }, []);


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
  
    const ChangeProfile = (e) => {
      setFormProfile({
        ...formProfile,
        [e.target.name]: e.target.value,
      });
    };
  
    const SubmitEditProfile = useMutation(async (e) => {
      try {
        e.preventDefault();

        // Configuration
        const config = {
          headers: {
            'Content-type': 'multipart/form-data',
          },
        };
        // Store data with FormData as object
        const formData = new FormData();
        if (formProfile.photo_profile) {
          formData.set('photo_profile', formProfile?.photo_profile[0], formProfile?.photo_profile[0]?.name);
        }
        formData.set('fullname', formProfile.fullname);
        formData.set('email', formProfile.email);
        formData.set('gender', formProfile.gender);
        formData.set('phone', formProfile.phone); 
        formData.set('address', formProfile.address); 

        const response = await API.patch('/user', formData, config);
        console.log(response.data);

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Update Success',
          showConfirmButton: false,
          timer: 1500
        })
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Update Failed',
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
          <Form onSubmit={(e) => SubmitEditProfile.mutate(e)}>
            <Form.Group className="mb-3">
              <Form.Control type="email" placeholder="Email" name="email" onChange={ChangeProfile} value={email} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Fullname" name="fullname" onChange={ChangeProfile} value={fullname} required />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Select onChange={ChangeProfile} value={gender} name="gender" className="p-2 formInputProduct" required>
                <option className='colorwhite' hidden>Gender</option>
                <option value="Pria" className='colorblack'>Pria</option>
                <option value="Perempuan" className='colorblack'>Perempuan</option>
              </Form.Select>
              </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Phone" name="phone" onChange={ChangeProfile} value={phone} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control type="text" placeholder="Address" name="address" onChange={ChangeProfile} value={address} required />
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
              name="photo_profile"
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
