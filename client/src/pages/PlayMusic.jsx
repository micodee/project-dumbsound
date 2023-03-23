import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Header";

export default function PlayMusic(props) {
  return (
    <>
      <Header IsLogin={props.IsLogin} user={props.user} />
      <Container className="detail col-9">
        <Row className="flex-between">
          <Col className="header col-2">
            <img src={`img/music10.png`} alt="thumb-img" className="detail-thumb" />
          </Col>
          <Col className="header col-9 flex">
            <div className="col-12">
              <h3 className="mt-2 mb-0 detail-title">Tragic</h3>
              <p className="mt-0 mb-3">2019</p>
              <p className="detaildesc">Eminem</p>
              <p className="detailprice">Test</p>
              <Button className="col-12 detailBtnAdd">
                Add Cart
              </Button>{" "}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
