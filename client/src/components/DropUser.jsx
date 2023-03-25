import React, { useContext } from "react";
import { Form, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextUser";
import Swal from 'sweetalert2'

const DropUser = (props) => {
  let navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        navigate("/")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logout Success',
          showConfirmButton: false,
          timer: 1500
        })
    }
  return (
    <div>
      <Form className="d-flex align-items-center gap-3">
        <Link to="/premium" className="position-relative">
          <h4 className="active-user">Hi, {props.user.fullname}</h4>
          <p className="active-remaining">You're active remaining <span style={{ color: "#eee", fontWeight: "bold" }}>3 days</span></p>
        </Link>
        <Dropdown className="dropdown" align="end" id="dropdown-menu-align-end">
          <Dropdown.Toggle className="profile">
            <img
              src={`/img/drop-profile.png`}
              alt="icon"
              style={{
                width: "60px",
                height: "60px",
                cursor: "pointer",
                border: "2px solid #fff",
                borderRadius: "50%",
              }}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>
              <Link to="/premium" className="menu">
                <img src={`/img/drop-pay.png`} alt="user" />
                Premium
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link to="/profile" className="menu">
                <img src={`/img/drop-user.png`} alt="user" />
                Profile
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout} className="menu">
              <img src={`/img/drop-logout.png`} alt="logout" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </div>
  );
};

export default DropUser;
