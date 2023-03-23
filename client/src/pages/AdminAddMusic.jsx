import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import Header from '../components/Header'

export default function AdminAddMusic(props) {
  const [previewImage, setPreviewImage] = useState("/img/music10.png");
  const [previewMusic, setPreviewMusic] = useState("");
  const [autoplay, setAutoplay] = useState("")
  const [urlImage, setUrlImage] = useState("Attach Thumbnail");
  const [UrlMusic, setUrlMusic] = useState("Attach Music");

  // Handle change data on form
  const onChangeThumbnail = (e) => {
    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setUrlImage(e.target.files[0].name);
      setPreviewImage(url);
    }
  };
  // Handle change data on form
  const onChangeMusic = (e) => {
    // Create image url for preview
    if (e.target.type === 'file') {
      let url = URL.createObjectURL(e.target.files[0]);
      setUrlMusic(e.target.files[0].name);
      setAutoplay("autoplay")
      setPreviewMusic(url);
    }
  };


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
                      <span style={{ color: "#d2d2d2" }}>{urlImage}</span>
                      <span><img className="px-2" src={`img/attach.png`} alt="file" style={{ width: "100%", height: "20px" }} /></span>
                    </Form.Label>
                    <Form.Control
                      hidden
                      id="upload-image"
                      type="file"
                      className="py-2"
                      onChange={onChangeThumbnail}
                    />
                  </Col>
               </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" placeholder="Year" name="year" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Select className="p-2 formInputProduct">
                <option disabled value="">Singer</option>
                {props.artis?.map ((item) => {
                  console.log(item);
                  return (
                    <>
                      <option value={item.id}>{item.name}</option>
                    </>
                  )
                })}
              </Form.Select>
              </Form.Group>
              <Form.Group controlId="formFile" className="mb-3 col-4">
                <Form.Label htmlFor='upload-music' className='rounded p-2 flex-between formInputProduct'  style={{ cursor: "pointer" }}>
                  <span style={{ color: "#d2d2d2" }}>{UrlMusic}</span>
                  <span><img className="px-2" src={`img/attach-music1.png`} alt="file" style={{ width: "100%", height: "20px" }} /></span>
                </Form.Label>
                <Form.Control
                  hidden
                  id="upload-music"
                  type="file"
                  className="py-2"
                  onChange={onChangeMusic}
                />
              </Form.Group>
              <div className="d-flex justify-content-center" style={{ marginTop: "3rem" }}>
                <Button variant="secondary col-5" type="submit" style={{ backgroundColor: "#EE4622", border: "none" }}>
                  Add Song
                </Button>
              </div>
            </Form>
          </div>
        </Col>
        <Col className="col-4 d-flex justify-content-end flex-column gap-3">
          <img src={previewImage} alt="preview-image" className='preview-image'/>
          <AudioPlayer
            className="bg-dark text-white preview-music"
            {...autoplay}
            src={previewMusic}
            layout="stacked-reverse"
          />
        </Col>
      </Row>
    </Container>
    </>
  )
}
