import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header'
import DeleteData from '../components/ModalDelete';
import { API } from '../config/api';

export default function AdminAddArtis(props) {
  let navigate = useNavigate()

  // form data
  const [formAddArtis, setFormArtis] = useState({
    name: "",
    old: "",
    type: "",
    start_career: "",
  });

  const { name, old, type, start_career } = formAddArtis

  const onChangeForm = (e) => {
    setFormArtis({
      ...formAddArtis,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  }

  const submitAddArtis = useMutation(async (e) => {
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
      formData.set('name', formAddArtis.name);
      formData.set('old', formAddArtis.old);
      formData.set('type', formAddArtis.type);
      formData.set('start_career', formAddArtis.start_career);

      // Insert product data
      const response = await API.post('/artis', formData, config);
      console.log("add artis success : ", response);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Add Artis Success',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(function() {
        window.location.reload();
      }, 1000);
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Add Artis Failed',
        showConfirmButton: false,
        timer: 1500
      })
      console.log("add artis failed : ", error);
    }
  });
  
  // Variabel for delete product data
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  // Modal Confirm delete data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // For get id product & show modal confirm delete data
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
   try {
    const response = await API.delete(`/artis/${id}`);
    console.log(response)
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Delete Success',
      showConfirmButton: false,
      timer: 1500
    })
    setTimeout(function() {
      window.location.reload();
    }, 1000);;
   } catch (error) {
     Swal.fire({
       position: 'center',
       icon: 'error',
       title: 'Delete Failed',
       showConfirmButton: false,
       timer: 1500
     })
     console.log(error);
   }
 });

 useEffect(() => {
  if (confirmDelete) {
    // Close modal confirm delete data
    handleClose();
    // execute delete data by id function
    deleteById.mutate(idDelete);
    setConfirmDelete(null);
  }
}, [confirmDelete]);


  // sort of new
  let sortArtis = []
  if (props.artis != undefined) {
    sortArtis = [...props.artis]
    sortArtis.sort((a,b) => b.id - a.id)
  }

  return (
    <>
     <Header IsLogin={props.IsLogin} />
     <Container className="detail col-9 productadd">
      <Row className="d-flex justify-content-between">
        <Col className="header col-4 d-flex justify-content-center">
          <div className="col-12">
            <h2 style={{ color: "#fff", fontWeight: "900", marginBottom: "1.5rem" }}>Add Artis</h2>
            <Form onSubmit={(e) => submitAddArtis.mutate(e)}>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={onChangeForm} value={name} placeholder="Name" name="name" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={onChangeForm} value={old} placeholder="Old" name="old" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" onChange={onChangeForm} value={type} placeholder="Type" name="type" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" onChange={onChangeForm} value={start_career} placeholder="Start Career" name="start_career" className="p-2 formInputProduct"/>
              </Form.Group>
              <div className="d-flex justify-content-center" style={{ marginTop: "3rem" }}>
                <Button variant="secondary col-5" type="submit" style={{ backgroundColor: "#EE4622", border: "none" }}>
                  Add Artis
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col className="col-7 rounded d-flex flex-column">
        <Table striped bordered hover variant="dark col-12">
          <thead>
            <tr className='text-center'>
              <th>#</th>
              <th>Name</th>
              <th>Old</th>
              <th>Type</th>
              <th>SC</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortArtis?.map((item, index) => {
              return (
                <tr key={item.id}>
                  <td className='col-1 text-center'>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.old}</td>
                  <td>{item.type}</td>
                  <td>{item.start_career}</td>
                  <td className='col-2'>
                  <div className="flex gap-2">
                    <Button onClick={() => handleDelete(item.id)} variant="danger p-0 px-3">Delete</Button>
                    <Button variant="success p-0 px-3">Update</Button>
                  </div>
                  </td>
                </tr>
               )
            })}
          </tbody>
        </Table>
        </Col>
      </Row>
    </Container>
    <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
    />
    </>
  )
}
