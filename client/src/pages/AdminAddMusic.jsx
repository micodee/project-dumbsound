import React, { useState } from 'react'
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Header from '../components/Header'
import { API } from '../config/api';

export default function AdminAddMusic(props) {
  let navigate = useNavigate()
  const [previewImage, setPreviewImage] = useState("/img/logo-add-music.png");
  const [previewMusic, setPreviewMusic] = useState("");
  const [autoplay, setAutoplay] = useState("")
  const [urlImage, setUrlImage] = useState("Attach Thumbnail");
  const [UrlMusic, setUrlMusic] = useState("Attach Music");

  // form data
  const [formAddMusic, setformAddMusic] = useState({
    title: "",
    year: "",
    thumbnail: "",
    attach: "",
    artis_id: "",
  });

  const { title, year, artis_id } = formAddMusic

  const onChangeForm = (e) => {
    setformAddMusic({
      ...formAddMusic,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
  }

  // Handle change data on form
  const onChangeThumbnail = (e) => {
    setformAddMusic({
      ...formAddMusic,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
    // Create image url for preview
    if (e.target.type === 'file') {
      let urlImage = URL.createObjectURL(e.target.files[0]);
      setUrlImage(e.target.files[0].name);
      setPreviewImage(urlImage);
    }
  };
  // Handle change data on form
  const onChangeMusic = (e) => {
    setformAddMusic({
      ...formAddMusic,
      [e.target.name]:
        e.target.type === 'file' ? e.target.files : e.target.value,
    });
    // Create image url for preview
    if (e.target.type === 'file') {
      let urlMusic = URL.createObjectURL(e.target.files[0]);
      setUrlMusic(e.target.files[0].name);
      setAutoplay("autoplay")
      setPreviewMusic(urlMusic);
    }
  };

  const submitAddMusic = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      formData.set('title', formAddMusic.title);
      formData.set('thumbnail', formAddMusic.thumbnail[0], formAddMusic.thumbnail[0].name);
      formData.set('year', formAddMusic.year);
      formData.set('artis_id', formAddMusic.artis_id);
      formData.set('attach', formAddMusic.attach[0], formAddMusic.attach[0].name);

      // Insert product data
      const response = await API.post('/music', formData, config);
      console.log("add music success : ", response);

      navigate('/');
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Add Music Success',
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
        title: 'Add Music Failed',
        showConfirmButton: false,
        timer: 1500
      })
      console.log("add music failed : ", error);
    }
  });

  return (
    <>
     <Header IsLogin={props.IsLogin} />
     <Container className="detail col-9 productadd">
      <Row className="d-flex justify-content-between">
        <Col className="header col-7 d-flex justify-content-center">
          <div className="col-12">
            <h2 style={{ color: "#fff", fontWeight: "900", marginBottom: "1.5rem" }}>Add Music</h2>
            <Form onSubmit={(e) => submitAddMusic.mutate(e)}>
              <Form.Group className="mb-2">
               <Row>
                 <Col sm={8}><Form.Control type="text" onChange={onChangeForm} value={title} placeholder="Title" name="title" className="p-2 formInputProduct"/></Col>
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
                      name="thumbnail"
                      onChange={onChangeThumbnail}
                    />
                  </Col>
               </Row>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control type="text" onChange={onChangeForm} value={year} placeholder="Year" name="year" className="p-2 formInputProduct"/>
              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Select onChange={onChangeForm} value={artis_id} name="artis_id" className="p-2 formInputProduct">
                <option disabled value="">Singer</option>
                {props.artis?.map ((item) => {
                  return (
                    <>
                      <option value={item.id}>{item.name}</option>
                    </>
                  )
                })}
              </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3 col-4">
                <Form.Label htmlFor='upload-music' className='rounded p-2 flex-between formInputProduct' style={{ cursor: "pointer" }}>
                  <span style={{ color: "#d2d2d2" }}>{UrlMusic}</span>
                  <span><img className="px-2" src={`img/attach-music1.png`} alt="file" style={{ width: "100%", height: "20px" }} /></span>
                </Form.Label>
                <Form.Control
                  hidden
                  id="upload-music"
                  type="file"
                  className="py-2"
                  name='attach'
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
