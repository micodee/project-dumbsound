import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header'
import DeleteData from '../components/ModalDelete';
import { API } from '../config/api';

export default function AdminUpdateArtis(props) {
  let navigate = useNavigate();
  const { id } = useParams();

  // form data
  const [formUpdateArtis, setUpdateArtis] = useState({
    name: "",
    old: "",
    type: "",
    start_career: "",
  });

  async function getDataUpdate() {
    const responArtis = await API.get('/artis/' + id);

    setUpdateArtis({
      ...formUpdateArtis,
      name: responArtis.data.data.name,
      old: responArtis.data.data.old,
      type: responArtis.data.data.type,
      start_career: responArtis.data.data.start_career,
    });
  }

  useEffect(() => {
    getDataUpdate()
  }, []);

  const onChangeForm = (e) => {
    setUpdateArtis({
      ...formUpdateArtis,
      [e.target.name]: e.target.value,
    });
  }

  const submitUpdateArtis = useMutation(async (e) => {
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
      formData.set('name', formUpdateArtis.name);
      formData.set('old', formUpdateArtis.old);
      formData.set('type', formUpdateArtis.type);
      formData.set('start_career', formUpdateArtis.start_career);

      // Insert product data
      const response = await API.patch('/artis/' + id, formData, config);
      console.log("update artis success : ", response);

      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Update Artis Success',
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
        title: 'Update Artis Failed',
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
    }, 1000);
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

 const handleUpdate = (id) => {
  setTimeout(function() {
    window.location.reload();
  }, 1000);
  navigate(`/update-artis/${id}`);
 };

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
     <Container className="detail col-9 productadd">
      <Row className="d-flex justify-content-between">
        <Col className="header col-4 d-flex justify-content-center">
          <div className="col-12">
            <h2 style={{ color: "#fff", fontWeight: "900", marginBottom: "1.5rem" }}>Update Artis</h2>
            <Form onSubmit={(e) => submitUpdateArtis.mutate(e)}>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={onChangeForm} value={formUpdateArtis.name} placeholder="Name" name="name" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={onChangeForm} value={formUpdateArtis.old} placeholder="Old" name="old" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" onChange={onChangeForm} value={formUpdateArtis.type} placeholder="Type" name="type" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" onChange={onChangeForm} value={formUpdateArtis.start_career} placeholder="Start Career" name="start_career" className="p-2 formInputProduct"/>
              </Form.Group>
              <div className="d-flex justify-content-center" style={{ marginTop: "3rem" }}>
                <Button variant="secondary col-5" type="submit" style={{ backgroundColor: "#EE4622", border: "none" }}>
                  Update Artis
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
                    <Button onClick={() => handleUpdate(item.id)} variant="success p-0 px-3">Update</Button>
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
