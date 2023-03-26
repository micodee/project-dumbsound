import React, { useEffect, useState } from "react";
import { Form, Button, Card, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "../components/Header";
import { API } from "../config/api";

export default function UserPremium(props) {
  let navigate = useNavigate()

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;
  
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);
  
    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  const [formPayment, setPayment] = useState({
    active: 1,
    total_price: 2500,
    fullname: props.user.fullname,
    email: props.user.email,
  });

  const ChangePayment = (e) => {
    setPayment({
      ...formPayment,
      [e.target.name]: e.target.value,
    });
  };

  const handleBuy = useMutation(async (e) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const data = {
      active: parseInt(formPayment.active),
      total_price: parseInt(formPayment.total_price)
    };
    const formDataJSON = JSON.stringify(data);
    try {
      e.preventDefault();

      const response = await API.post('/transaction', formDataJSON, config);
      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          const newTransactionData = {
            id: response.length + 1,
            active: formPayment.active,
            total_price: formPayment.total_price,
            status: "success",
            user: {id:props.user.id},
            name: formPayment.fullname,
            email: formPayment.email,
          }
          response([newTransactionData]);
          setPayment((formPayment) => ({
            ...formPayment,
            [e.target.name]: e.target.value,
          }));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Payment Success',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(function() {
            window.location.reload();
          }, 1000);
          navigate("/profile");
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onError: function (result) {
          const newTransactionData = {
            status: "failed",
          }
          response([newTransactionData]);
          console.log(result);
          navigate("/profile");
        },
        onClose: function () {
          const newTransactionData = {
            status: "failed",
          }
          response([newTransactionData]);
          alert("you closed the popup without finishing the payment");
        },
      });
    } catch (error) {
      console.log("transaction failed : ", error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Payment Failed',
        showConfirmButton: false,
        timer: 1500
      })
    }
  });
  return (
    <>
      <Header IsLogin={props.IsLogin} user={props.user}/>
      <div className="premium">
        <h1 className="title">Premium</h1>
        <p>Bayar sekarang dan nikmati streaming music yang kekinian dari <span className="dumb">DUMB</span><span className="sound">SOUND</span></p>
        <Form className="form-payment" onSubmit={(e) => handleBuy.mutate(e)}>
          <div className="flex">
            <Form.Group className="mb-3 col-4">
              <Form.Select onChange={ChangePayment} value={formPayment.active} name="active" className="p-2 formInputProduct">
                <option className="text-black" value={1}>Rp.2.000/hari</option>
                <option className="text-black" value={30}>Rp.25.000/bulan</option>
                <option className="text-black" value={90}>Rp.50.000/3 bulan</option>
                <option className="text-black" value={360}>Rp.150.000/tahun</option>
              </Form.Select>
            </Form.Group>
          </div>
          <div className="flex mt-3">
            <Button variant="secondary col-4" type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
              Pay
            </Button>
          </div>
        </Form>
          <div className="premiumCard">
          <Row className="music grid">
            <Card className="card-music">
              <Card.Text className="paket">BASIC</Card.Text>
              <Card.Img variant="top" src={`/img/music10.png`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
               <Form onSubmit={(e) => handleBuy.mutate(e)}>
                <Card.Title className="title flex-between">
                  <Form.Control hidden type="text" onChange={ChangePayment} value={formPayment.total_price = 2500} name="total_price"/>
                  Rp. 2.500
                  <Form.Control hidden type="text" onChange={ChangePayment} value={formPayment.active = 1} name="active"/>
                  <p style={{ fontSize: "14px" }}>/ days</p>
                </Card.Title>
                <Card.Text>
                <Button variant="secondary col-12" type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
                  Pay
                </Button>
                </Card.Text>
                </Form>
              </Card.Body>
            </Card>
            <Card className="card-music">
              <Card.Text className="paket">STANDARD</Card.Text>
              <Card.Img variant="top" src={`/img/music10.png`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
              <Form onSubmit={(e) => handleBuy.mutate(e)}>
                <Card.Title className="title flex-between">
                  <Form.Control hidden type="text" onChange={ChangePayment} value={formPayment.total_price = 25000} name="total_price"/>
                  Rp. 25.000
                  <Form.Control hidden type="text" onChange={ChangePayment} value={formPayment.active = 30} name="active"/>
                  <p style={{ fontSize: "14px" }}>/ 30 days</p>
                </Card.Title>
                <Card.Text>
                <Button variant="secondary col-12" type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
                  Pay
                </Button>
                </Card.Text>
                </Form>
              </Card.Body>
            </Card>
            <Card className="card-music">
              <Card.Text className="paket">PROFESSIONAL</Card.Text>
              <Card.Img variant="top" src={`/img/music10.png`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
                <Form onSubmit={(e) => handleBuy.mutate(e)}>
                <Card.Title className="title flex-between">
                  <Form.Control hidden type="text" onChange={ChangePayment} value={formPayment.total_price = 50000} name="total_price"/>
                  Rp. 50.000
                  <Form.Control hidden type="text" onChange={ChangePayment} value={formPayment.active = 90} name="active"/>
                  <p style={{ fontSize: "14px" }}>/ 90 days</p>
                </Card.Title>
                <Card.Text>
                <Button variant="secondary col-12" type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
                  Pay
                </Button>
                </Card.Text>
                </Form>
              </Card.Body>
            </Card>
            <Card className="card-music">
              <Card.Text className="paket">ENTERPRISE</Card.Text>
              <Card.Img variant="top" src={`/img/music10.png`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
                <Card.Title className="title flex-between">
                  Rp. 150.000
                  <p style={{ fontSize: "14px" }}>/ 360 days</p>
                </Card.Title>
                <Card.Text>
                <Button variant="secondary col-12" type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
                  Pay
                </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
          </div>
      </div>
    </>
  );
}
