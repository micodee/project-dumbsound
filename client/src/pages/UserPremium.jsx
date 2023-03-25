import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
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
    active: 1
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
      active: parseInt(formPayment.active)
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
            status: "success",
            user: {id:props.user.id},
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
          /* You may add your own implementation here */
          console.log(result);
          navigate("/profile");
        },
        onClose: function () {
          /* You may add your own implementation here */
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
      </div>
    </>
  );
}
