import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DeleteData from '../components/ModalDelete';
import { API } from '../config/api';

export default function AdminListIncome(props) {
 let navigate = useNavigate()
  
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
    const response = await API.delete(`/music/${id}`);
    console.log(response)
     navigate("/list-music")
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

 useEffect(() => {
  if (confirmDelete) {
    // Close modal confirm delete data
    handleClose();
    // execute delete data by id function
    deleteById.mutate(idDelete);
    setConfirmDelete(null);
  }
}, [confirmDelete]);

  // sort new music
  let sortMusic = []
  if (props.music != undefined) {
    sortMusic = [...props.music]
    sortMusic.sort((a,b) => b.id - a.id)
  }
  return (
    <>
     <Container className="detail col-9">
      <Row className="d-flex justify-content-between">
        <Col className="header col-12">
          <h2
            style={{
              fontWeight: "900",
              marginBottom: "2rem",
              padding: "0",
              fontSize: "24px",
            }}
          >
            Incoming Transaction
          </h2>
          <Table striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th>No</th>
                <th className="text-center">Users</th>
                <th className="text-center">Due Date</th>
                <th className="text-center">Remaining Active</th>
                <th className="text-center">Status User</th>
                <th className="text-center">Status Payment</th>
              </tr>
            </thead>
            <tbody>
              {props.music && sortMusic?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td style={{ verticalAlign: "middle", textAlign: "center", width: "30px" }}>{index + 1}</td>
                    <td style={{ verticalAlign: "middle", width: "300px" }}>Tommy Marcelino Hidayat</td>
                    <td style={{ verticalAlign: "middle", textAlign: "center" }}>26 April 2023</td>
                    <td className="text-center" style={{ verticalAlign: "middle", width: "200px" }}>30 Days</td>
                    <td style={{ verticalAlign: "middle", textAlign: "center" }}>Active</td>
                    <td style={{ verticalAlign: "middle", textAlign: "center", width: "200px" }}>
                      <p>Success</p>
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
