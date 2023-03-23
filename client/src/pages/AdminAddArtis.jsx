import React from 'react'
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Header from '../components/Header'

export default function AdminAddArtis(props) {
  return (
    <>
     <Header IsLogin={props.IsLogin} />
     <Container className="detail col-9 productadd">
      <Row className="d-flex justify-content-between">
        <Col className="header col-7 d-flex justify-content-center align-items-center">
          <div className="col-12">
            <h2 style={{ color: "#fff", fontWeight: "900", marginBottom: "1.5rem" }}>Add Artis</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Name" name="name" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Old" name="old" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" placeholder="Type" name="type" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Control type="text" placeholder="Start Career" name="start_career" className="p-2 formInputProduct"/>
              </Form.Group>
              <div className="d-flex justify-content-center" style={{ marginTop: "3rem" }}>
                <Button variant="secondary col-5" type="submit" style={{ backgroundColor: "#EE4622", border: "none" }}>
                  Add Artis
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
