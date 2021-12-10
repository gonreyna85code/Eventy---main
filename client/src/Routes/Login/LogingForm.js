import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions";
import { login } from "../../redux/actions";
import Boton from "../../components/Boton/Boton";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router";
import RegisterForm from "./RegisterForm";
import estilos from "./RegisterForm.module.css";
import logo from "../images/logo-blanco.png";

export default function Loginform() {
  const dispatch = useDispatch();
  const [username, setUserName] = useState("");
  const [password, setPasword] = useState("");
  const [activeFrom, setActiveFrom] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.User);

  console.log(user);
  if (user && user._id) {
    navigate("/");
  }

  return (
    <div>
      <div
        className={activeFrom ? estilos.ContenedorActive : estilos.Contenedor}
      >
        <div className={estilos.Banner}>
          <img src={logo} alt="" />
        </div>
        <div className={estilos.contCenter}>
          <Link to="/">
            <Boton colorBtn="btn_naranja">Volver al Home</Boton>
          </Link>
          <h1>Por favor, Ingrese su Usuario y Contraseña</h1>
          <form>
            <div className="input">
              <Input
                label="Usuario"
                type="text"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
            <div className="input">
              <Input
                label="Contraseña"
                type="password"
                onChange={(e) => {
                  setPasword(e.target.value);
                }}
              />
            </div>
          </form>
          <div>
              <h1> Google Login </h1>
              Click here to authenticate with Google
              <form action="http://localhost:4000/auth/google" method="GET">
                <button type="submit"> GOOGLE BUTTON </button>
              </form>
            </div>
          <div>
            <Boton
              colorBtn="btn_azul"
              onClick={() => {
                dispatch(login({ username, password }));
                console.log(username, password);
                alert("Usuario Confirmado, Bienvenido a Eventy");
                dispatch(getUser());
                navigate("/");
                setTimeout(function () {
                  window.location.reload();
                }, 3000);
              }}
            >
              {" "}
              INGRESAR{" "}
            </Boton>
          </div>
          <div>
            <Boton onClick={(e) => setActiveFrom(true)} colorBtn="btn_naranja">
              Aún no estoy registrado
            </Boton>
          </div>
        </div>
      </div>
      {activeFrom ? (
        <div className={estilos.opacidad}>
          <div className={estilos.RegisterForm}>
            <div className={estilos.boton}>
              <Boton
                colorBtn="btn_naranja"
                onClick={(e) => setActiveFrom(false)}
              >
                X
              </Boton>
              
            </div>
            
            <RegisterForm />
          </div>
        </div>
      ) : null}
    </div>
  );
}
