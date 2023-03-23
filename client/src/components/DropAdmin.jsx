import React, { useContext } from "react";
import { Form, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/contextUser";
import Swal from 'sweetalert2'

const DropAdmin = () => {
  let navigate = useNavigate()
  const [state, dispatch] = useContext(UserContext)

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Logout Success',
          showConfirmButton: false,
          timer: 1500
        })
        navigate("/")
    }
  return (
    <div>
      <Form className="d-flex align-items-center gap-3">
        <Dropdown className="dropdown" align="end" id="dropdown-menu-align-end">
          <Dropdown.Toggle className="profile">
            <img
              src={`img/drop-profile.png`}
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
              <Link to="/add-music" className="menu">
                <img src={`img/drop-add-music.png`} alt="add-music" />
                Add Music
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <Link to="/add-artis" className="menu">
                <img src={`img/drop-add-artis.png`} alt="add-artis" />
                Add Artis
              </Link>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout} className="menu">
              <img src={`img/drop-logout.png`} alt="logout" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </div>
  );
};

export default DropAdmin;
