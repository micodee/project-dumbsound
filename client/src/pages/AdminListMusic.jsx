import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DeleteData from '../components/ModalDelete';
import { API } from '../config/api';

export default function AdminListMusic(props) {
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

  let { data: music, refetch } = useQuery("musicCache", async () => {
   const response = await API.get("/musics");
   return response.data.data;
  });

  const deleteById = useMutation(async (id) => {
   try {
    const response = await API.delete(`/music/${id}`);
    console.log(response)
     // load data seperti refresh
     refetch()
     navigate("/list-music")
     Swal.fire({
       position: 'center',
       icon: 'success',
       title: 'Delete Success',
       showConfirmButton: false,
       timer: 1500
     })
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
  if (music != undefined) {
    sortMusic = [...music]
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
            List Music
          </h2>
          <Table striped bordered hover variant='dark'>
            <thead>
              <tr>
                <th>No</th>
                <th className="text-center">Img</th>
                <th className="text-center">Title</th>
                <th className="text-center">Year</th>
                <th className="text-center">Artis</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortMusic?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td style={{ verticalAlign: "middle", textAlign: "center", width: "30px" }}>{index + 1}</td>
                    <td style={{ verticalAlign: "middle", width: "20px" }}>
                     <img src={`http://localhost:8000/uploads/${item.thumbnail}`} alt="thumb" style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                    </td>
                    <td style={{ verticalAlign: "middle" }}>{item.title}</td>
                    <td className="text-center" style={{ verticalAlign: "middle", width: "80px" }}>{item.year}</td>
                    <td style={{ verticalAlign: "middle" }}>{item.artis.name}</td>
                    <td style={{ verticalAlign: "middle", width: "30px" }}>
                      <div className="d-flex justify-content-evenly align-items-center gap-2">
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
