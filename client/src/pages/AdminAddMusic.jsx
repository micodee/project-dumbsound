import React from 'react'
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Header from '../components/Header'

export default function AdminAddMusic(props) {
  return (
    <>
     <Header IsLogin={props.IsLogin} />
     <Container className="detail col-9 productadd">
      <Row className="d-flex justify-content-between">
        <Col className="header col-7 d-flex justify-content-center align-items-center">
          <div className="col-12">
            <h2 style={{ color: "#fff", fontWeight: "900", marginBottom: "1.5rem" }}>Add Music</h2>
            <Form>
              <Form.Group className="mb-2">
               <Row>
                 <Col sm={8}><Form.Control type="text" placeholder="Title" name="title" className="p-2 formInputProduct"/></Col>
                 <Col sm={4}>
                    <Form.Label htmlFor='upload-image' className="formInputProduct rounded p-2 flex-between" style={{ cursor: "pointer" }}>
                      <span style={{ color: "#d2d2d2" }}>Attach Thumbnail</span>
                      <span><img className="px-2" src={`img/attach.png`} alt="file" style={{ width: "100%", height: "20px" }} /></span>
                    </Form.Label>
                    <Form.Control
                      hidden
                      id="upload-image"
                      type="file"
                      className="py-2"
                    />
                  </Col>
               </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Year" name="year" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" placeholder="Singer" name="singer" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3 col-3">
                <Form.Label htmlFor='upload-image' className='rounded p-2 flex-between formInputProduct'  style={{ cursor: "pointer" }}>
                  <span style={{ color: "#d2d2d2" }}>Attach Music</span>
                  <span><img className="px-2" src={`img/attach-music1.png`} alt="file" style={{ width: "100%", height: "20px" }} /></span>
                </Form.Label>
              </Form.Group>
              <div className="d-flex justify-content-center" style={{ marginTop: "3rem" }}>
                <Button variant="secondary col-5" type="submit" style={{ backgroundColor: "#EE4622", border: "none" }}>
                  Add Song
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}
