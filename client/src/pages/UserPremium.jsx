import React, { useEffect } from "react";
import { Button, Card, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
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

  // const [formPayment, setPayment] = useState({
  //   active: 1,
  //   total_price: 2500,
  //   fullname: props.user.fullname,
  //   email: props.user.email,
  // });

  // const ChangePayment = (e) => {
  //   setPayment({
  //     ...formPayment,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  const handleBuy = useMutation(async (data) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    // const data = {
    //   active: active,
    //   total_price: total_price,
    // };
    console.log(data);
    const formDataJSON = JSON.stringify(data);
    try {

      const response = await API.post('/transaction', formDataJSON, config);
      const token = response.data.data.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          const newTransactionData = {
            id: response.length + 1,
            active: data.active,
            total_price: data.total_price,
            status: "success",
            user: {id:props.user.id},
          }
          response([newTransactionData]);
          // setPayment((formPayment) => ({
          //   ...formPayment,
          //   fullname: props.user.fullname,
          //   email: props.user.email,
          //   active: formPayment.active,
          //   total_price: formPayment.total_price,
          // }));
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
      <div className="premium">
        <h1 className="title">Premium</h1>
        <p>Bayar sekarang dan nikmati streaming music yang kekinian dari <span className="dumb">DUMB</span><span className="sound">SOUND</span></p>
          <div className="premiumCard">
          <Row className="music grid">
            <Card className="card-music">
              <Card.Text className="paket">BASIC</Card.Text>
              <Card.Img variant="top" src={`/img/music10.png`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
                <Card.Title className="title flex-between">
                  Rp. 2.500
                  <p style={{ fontSize: "14px" }}>/ days</p>
                </Card.Title>
                <Card.Text>
                <Button variant="secondary col-12" onClick={() => handleBuy.mutate({active: 1, total_price: 2500})} type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
                  Pay
                </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="card-music">
              <Card.Text className="paket">STANDARD</Card.Text>
              <Card.Img variant="top" src={`/img/music10.png`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
                <Card.Title className="title flex-between">
                  Rp. 25.000
                  <p style={{ fontSize: "14px" }}>/ 30 days</p>
                </Card.Title>
                <Card.Text>
                <Button variant="secondary col-12" onClick={() => handleBuy.mutate({active: 30, total_price: 25000})} type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
                  Pay
                </Button>
                </Card.Text>
              </Card.Body>
            </Card>
            <Card className="card-music">
              <Card.Text className="paket">PROFESSIONAL</Card.Text>
              <Card.Img variant="top" src={`/img/music10.png`} className="thumbnail" />
              <Card.Body style={{ padding: "0" }}>
                <Card.Title className="title flex-between">
                  Rp. 50.000
                  <p style={{ fontSize: "14px" }}>/ 90 days</p>
                </Card.Title>
                <Card.Text>
                <Button variant="secondary col-12" onClick={() => handleBuy.mutate({active: 90, total_price: 50000})} type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
                  Pay
                </Button>
                </Card.Text>
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
                <Button variant="secondary col-12" onClick={() => handleBuy.mutate({active: 360, total_price: 150000})} type="submit" style={{ backgroundColor: "#F58033", border: "none" }}>
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
