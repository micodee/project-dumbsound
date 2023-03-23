import React from "react";
import { Form, Button } from "react-bootstrap";
import Header from "../components/Header";

export default function UserPremium(props) {
  return (
    <>
      <Header IsLogin={props.IsLogin} user={props.user}/>
      <div className="premium">
        <h1 className="title">Premium</h1>
        <p>Bayar sekarang dan nikmati streaming music yang kekinian dari <span className="dumb">DUMB</span><span className="sound">SOUND</span></p>
        <Form className="form-payment">
          <div className="flex">
            <Form.Group className="mb-3 col-4">
              <Form.Select className="p-2 formInputProduct">
                <option className="text-black">Rp.2.000/hari</option>
                <option className="text-black">Rp.25.000/bulan</option>
                <option className="text-black">Rp.50.000/3 bulan</option>
                <option className="text-black">Rp.150.000/tahun</option>
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
