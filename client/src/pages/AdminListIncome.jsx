import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Table } from "react-bootstrap";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DeleteData from '../components/ModalDelete';
import { API } from '../config/api';

export default function AdminListIncome(props) {
 let navigate = useNavigate()
 console.log(new Date());
  
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
    const response = await API.delete(`/transaction/${id}`);
    console.log(response)
     navigate("/list-income")
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
  let sortTransaction = []
  if (props.transaction != undefined) {
    sortTransaction = [...props.transaction]
    sortTransaction.sort((a,b) => b.id - a.id)
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
                <th className="text-center">Start Date</th>
                <th className="text-center">Due Date</th>
                <th className="text-center">Remaining Active</th>
                <th className="text-center">Status User</th>
                <th className="text-center">Status Payment</th>
              </tr>
            </thead>
            <tbody>
              {props.transaction && sortTransaction?.map((item, index) => {
                  let status;
                  if (item.status === "success") {
                    status = {
                      color: "#78A85A"
                    };
                  } else if (item.status === "pending") {
                    status = {
                      color: "#FF9900"
                    };
                  } else if (item.status === "failed") {
                    status = {
                      color: "red"
                    };
                  }
                return (
                  <tr key={item.id}>
                    <td style={{ verticalAlign: "middle", textAlign: "center", width: "30px" }}>{index + 1}</td>
                    <td style={{ verticalAlign: "middle", width: "300px", textTransform: "capitalize" }}>{item.user.fullname}</td>
                    <td style={{ verticalAlign: "middle", textAlign: "center" }}>{item.start_date}</td>
                    <td style={{ verticalAlign: "middle", textAlign: "center" }}>{item.due_date}</td>
                    <td className="text-center" style={{ verticalAlign: "middle", width: "200px" }}>Rp.{item.total_price} / {item.active} Days</td>
                    <td style={{ verticalAlign: "middle", textAlign: "center" }}>{item.status == "success" ? "active" : "not active"}</td>
                    <td className='flex-between' style={{ verticalAlign: "middle", textAlign: "center", width: "200px" }}>
                      <p style={status}>{item.status}</p>
                      <p style={{ backgroundColor: "red", width: "30px", cursor: "pointer" }} onClick={() => handleDelete(item.id)}>X</p>
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
