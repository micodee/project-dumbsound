import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useNavigate, useParams } from "react-router-dom";

export default function PlayMusic(props) {
  let navigate = useNavigate()
  const params = useParams();
  let Product = props.music.filter(Product => Product.id === parseInt(params.id));
  Product = Product[0];

  // sort of new
  let sortMusic = []
  if (props.music != undefined) {
    sortMusic = [...props.music]
    sortMusic.sort((a,b) => b.id - a.id)
  }
  return (
    <>
      <Container className="detail col-9 p-0">
        <Row className="flex-between mb-5 m-0 p-0">
          <Col className="header col-2">
            <img src={Product.thumbnail} alt={Product.tilte} className="detail-thumb" />
          </Col>
          <Col className="header col-9 flex">
            <div className="col-12">
              <p className="mt-0 mb-1">SONG</p>
              <h3 className="mt-1 mb-0 detail-title">{Product.title}</h3>
              <p className="mt-2 mb-3">{Product.artis.name} | {Product.year}</p>
              <AudioPlayer
                className="bg-dark text-white"
                autoPlay
                src={Product.attach}
                layout="stacked-reverse"
              />
            </div>
          </Col>
        </Row>
        <div className="playMusic">
          <Row className="music grid">
            {sortMusic?.map(( item ) => {
            return (
              <Card key={item.id} className="card-music" 
              onClick={() => navigate(`/play-music/${item?.id}`)}
              >
                <Card.Img variant="top" src={item.thumbnail} className="thumbnail" />
                <Card.Body style={{ padding: "0" }}>
                  <Card.Title className="title flex-between">
                    <p style={{ lineClamp: "1", overflow: "hidden", textOverflow: "ellipsis", display: "block", whiteSpace: "nowrap" }}>{item.title}</p>
                    <p style={{ fontSize: "14px" }}>{item.year}</p>
                  </Card.Title>
                  <Card.Text>
                    <p style={{fontSize: "14px", lineClamp: "1", overflow: "hidden", textOverflow: "ellipsis", display: "block", whiteSpace: "nowrap" }}>{item.artis.name}</p>
                  </Card.Text>
                </Card.Body>
              </Card>
            );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
}
