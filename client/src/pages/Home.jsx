import React from "react";
import { Row, Card } from "react-bootstrap";
import Header from "../components/Header";

export default function Home(props) {
  return (
    <>
      <Header />
      <div className="home">
        <div className="flex">
          <img src={`img/Header.png`} alt="header" className="imgheader" />
          <div className="textheader">
            <h1>Connect On DumbSound</h1>
            <p>
              Discovery, Stream, and share a constantly expanding mix of music
              from emerging and major artists around the world
            </p>
          </div>
        </div>
        <h4 className="title-dumbsound">Dengarkan Dan Rasakan</h4>
        <div className="body">
          <Row className="music grid">
          {props.music?.map(( item ) => {
          return (
            <Card key={item.id} className="card-music">
              <Card.Img variant="top" src={`http://localhost:8000/uploads/${item.thumbnail}`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
                <Card.Title className="title flex-between">
                  {item.title}
                  <p style={{ fontSize: "14px" }}>{item.year}</p>
                </Card.Title>
                <Card.Text>
                  <p style={{fontSize: "14px" }}>{item.artis.name}</p>
                </Card.Text>
              </Card.Body>
            </Card>
          );
          })}
          </Row>
        </div>
      </div>
    </>
  );
}
