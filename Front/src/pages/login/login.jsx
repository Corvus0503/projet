import React, { useEffect } from "react";
import { useState } from "react";
import "../../styles/login.css";
import IconButton from "@material-ui/core/IconButton";
//import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../routes/authProvider";
// import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import logo from "../../images/res-logo.png";

const Login = ({ isConn, setIsConn, saveCon, user, setUser, getCon }) => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const [isShow, setIsShow] = useState(false);

  const showMdp = (e) => {
    e.preventDefault();
    setIsShow(!isShow);
  };
  const [infoCon, setInfoCon] = useState({
    username: "",
    password: "",
  });

  const loadUser = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/login`,
        infoCon
      );
      setUser(response.data);
      console.log(user);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pseudo ou mot de passer incorrect",
      });
    }
  };

  const connexion = async (e) => {
    e.preventDefault();
    loadUser();

    if (user !== null) {
      setToken(JSON.stringify(user));
      setIsConn(true);
      saveCon();
      navigate("/Dashboard", { replace: true });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Pseudo ou mot de passer incorrect",
      });
    }
  };

  // // Initialize a Socket.IO client instance
  // const socket = io("http://localhost:8080");

  // useEffect(() => {
  //     // Connect to the server
  //     socket.connect();

  //     // Clean up the socket connection when the component unmounts
  //     return () => {
  //         socket.disconnect();
  //     };
  // }, [socket]);

  return (
    <div className="login">
      <form className="login-form">
        <div className="item-box">
          <img src={logo} alt="logo" />

          <div className="input-box">
            <Input
              style={{ color: "rgb(13, 13, 13)" }}
              value={infoCon.email}
              required
              onChange={(e) =>
                setInfoCon({ ...infoCon, username: e.target.value })
              }
              type="text"
              placeholder="Nom d'utitilisateur....."
              className="log-input"
            />
          </div>
          <div className="input-box">
            <Input
              style={{ color: "rgb(13, 13, 13)" }}
              value={infoCon.password}
              required
              onChange={(e) =>
                setInfoCon({ ...infoCon, password: e.target.value })
              }
              type={isShow ? "text" : "password"}
              placeholder="Mot de passe......."
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={showMdp}>
                    {isShow ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              className="log-input"
            ></Input>
          </div>
          <button onClick={connexion} className="log-btn">
            Connexion
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
