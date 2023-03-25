import React, { useState } from "react";
import { Row, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ModalLogin from "../components/ModalLogin";
import ModalRegister from "../components/ModalRegister";

export default function Home(props) {
  let navigate = useNavigate()

  const [showLogin, setModalLogin] = useState(false);
  const [showRegister, setModalRegister] = useState(false)
  return (
    <>
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
            <Card key={item.id} className="card-music" 
            onClick={() => props.IsLogin != null ? navigate(`/play-music/${item?.id}`) : setModalLogin(true)}
            >
              <Card.Img variant="top" src={item.thumbnail} className="thumbnail" />
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
        <ModalLogin
          show={showLogin}
          hide={() => setModalLogin(false)}
          toRegister={() => [setModalLogin(false), setModalRegister(true)]}
        />
        <ModalRegister
          show={showRegister}
          hide={() => setModalRegister(false)}
          toLogin={() => [setModalRegister(false), setModalLogin(true)]}
        />
      </div>
    </>
  );
}
