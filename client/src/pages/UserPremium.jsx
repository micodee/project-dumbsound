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
            fullname: props.user.fullname,
            email: props.user.email,
            active: formPayment.active,
            total_price: formPayment.total_price,
          }));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Payment Success',
            showConfirmButton: false,
            timer: 1500
          })
          navigate("/profile");
          setTimeout(function() {
            window.location.reload();
          }, 1000);
          return
        },
        onPending: function (result) {
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
          return
        },
        onError: function (result) {
          console.log(result);
          navigate("/profile");
          return
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
          return
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
          <div className="premiumCard">
          <Row className="music grid">
            <Card className="card-music">
              <Card.Text className="paket">BASIC</Card.Text>
              <Card.Img variant="top" src={`/img/music10.png`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
               {<Form onSubmit={(e) => handleBuy.mutate(e)}>
                <Card.Title className="title flex-between">
                  <Form.Control hidden type="text" onChange={ChangePayment} value="2500" name="total_price"/>
                  Rp. 2.500
                  <Form.Control hidden type="text" onChange={ChangePayment} value="1" name="active"/>
                  <p style={{ fontSize: "14px" }}>/ days</p>
                </Card.Title>
                <Card.Text>
                <Button variant="secondary col-12" type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
                  Pay
                </Button>
                </Card.Text>
                </Form>}
              </Card.Body>
            </Card>
            <Card className="card-music">
              <Card.Text className="paket">STANDARD</Card.Text>
              <Card.Img variant="top" src={`/img/music10.png`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
              {<Form onSubmit={(e) => handleBuy.mutate(e)}>
                <Card.Title className="title flex-between">
                  <Form.Control hidden type="text" onChange={ChangePayment} value={25000} name="total_price"/>
                  Rp. 25.000
                  <Form.Control hidden type="text" onChange={ChangePayment} value={30} name="active"/>
                  <p style={{ fontSize: "14px" }}>/ 30 days</p>
                </Card.Title>
                <Card.Text>
                <Button variant="secondary col-12" type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
                  Pay
                </Button>
                </Card.Text>
                </Form>}
              </Card.Body>
            </Card>
            <Card className="card-music">
              <Card.Text className="paket">PROFESSIONAL</Card.Text>
              <Card.Img variant="top" src={`/img/music10.png`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
                {<Form onSubmit={(e) => handleBuy.mutate(e)}>
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
                </Form>}
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
