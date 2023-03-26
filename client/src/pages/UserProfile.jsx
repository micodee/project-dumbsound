import React, { useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";
import { ModalEditProfile } from '../components';

export default function UserProfile(props) {
  const [showEdit, setModalEdit] = useState(false);
  return (
    <>
      <Container className="detail col-9 productadd">
      <Row className="d-flex justify-content-between">
        <Col className="header col-6 d-flex justify-content-center">
          <div className='col-12 d-flex justify-content-start'>
            <div className='col-6'>
              <div className='col-10'>
                <img src={`/img/music10.png`} alt="preview-image" className='preview-image'/>
                <div className="d-flex justify-content-center" style={{ marginTop: "2rem" }}>
                  <Button variant="secondary col-7" onClick={() => setModalEdit(true)} style={{ backgroundColor: "#EE4622", border: "none" }}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
            <div className="col-8">
              <h2 style={{ color: "#fff", fontWeight: "900", marginBottom: "1.5rem", fontSize: "24px", }}>Personal Info</h2>
              <p style={{ color: "#D2D2D2" }}>Fullname : </p>
              <h5 style={{ textTransform: "capitalize" }}>{props.user.fullname}</h5>
              <p style={{ color: "#D2D2D2" }}>Email : </p>
              <h5>{props.user.email}</h5>
              <p style={{ color: "#D2D2D2" }}>Phone : </p>
              <h5>{props.user.phone}</h5>
              <p style={{ color: "#D2D2D2" }}>Address : </p>
              <h5 style={{ textTransform: "capitalize" }}>{props.user.address}</h5>
              <p style={{ color: "#D2D2D2" }}>Gender : </p>
              <h5>{props.user.gender}</h5>
            </div>
          </div>
        </Col>
        <Col className="col-6 rounded d-flex align-items-end flex-column p-0">
        <h2
            style={{
              color: "#fff",
              fontWeight: "900",
              marginBottom: "1.5rem",
              padding: "0",
              fontSize: "24px",
            }}
          >
            History Transaction
          </h2>
          <div className="d-flex flex-column gap-2">
            <div style={{ padding: "1rem 1rem" }} className="d-flex justify-content-between gap-3 bg-dark">
           <div style={{ display: "flex", gap: "1rem" }}>
            <div className="d-flex justify-content-center flex-column">
             <p className="mb-1" style={{ fontSize: "14px" }}>ID Transaction <b>2</b></p>
             <span style={{ fontSize: "9px" }}><b>Saturday</b>, today</span>
             <p className="mb-1 mt-1" style={{ fontSize: "10px", fontWeight: "400", }}>Active : 30 Days</p>
             <p className="mb-1" style={{ fontSize: "10px", fontWeight: "400", }}><b>Price : Rp.50.000</b></p>
            </div>
           </div>
           <div className="d-flex justify-content-center align-items-center flex-column col-3">
           <div style = {{ backgroundColor: "#fff", width: "112px", height: "19px", fontSize: "10px", color: "#FF9900"}} className="flex">pending</div>
           </div>
          </div>
          </div>
        </Col>
      </Row>
    </Container>
    <ModalEditProfile show={showEdit} hide={setModalEdit}/>
    </>
  )
}
