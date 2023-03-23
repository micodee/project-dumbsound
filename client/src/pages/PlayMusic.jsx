import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useParams } from "react-router-dom";

export default function PlayMusic(props) {
  const params = useParams();
  let Product = props.music.filter(Product => Product.id === parseInt(params.id));
  Product = Product[0];
  return (
    <>
      <Header IsLogin={props.IsLogin} user={props.user} />
      <Container className="detail col-9">
        <Row className="flex-between">
          <Col className="header col-2">
            <img src={`http://localhost:8000/uploads/${Product.thumbnail}`} alt={Product.tilte} className="detail-thumb" />
          </Col>
          <Col className="header col-9 flex">
            <div className="col-12">
              <p className="mt-0 mb-1">SONG</p>
              <h3 className="mt-1 mb-0 detail-title">{Product.tilte}</h3>
              <p className="mt-2 mb-3">{Product.artis.name} | {Product.year}</p>
              <AudioPlayer
                className="bg-dark text-white"
                autoPlay
                src={`http://localhost:8000/uploads/music-1158488078.mp3`}
                layout="stacked-reverse"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
