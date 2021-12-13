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
                required
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
            <Boton
              colorBtn="btn_azul"
              onClick={() => {
                dispatch(login({ username, password }));            
                dispatch(getUser());                
                setTimeout(function () {
                  window.location.reload();
                }, 1000);
                navigate("/");
              }}
            >
              {" "}
              INGRESAR{" "}
            </Boton>
          </div>
          <div>              
              <form action="https://api-eventy.herokuapp.com/auth/google" method="GET">
                <Boton colorBtn="btn_azul" type="submit"> GOOGLE LOGIN </Boton>
              </form>
              <br/>
            </div>
          <div>
            <Link to = '/forgot'><Boton colorBtn= 'btn_naranja'>Olvidé mi contraseña</Boton></Link>
            <Boton onClick={() => setActiveFrom(true)} colorBtn="btn_naranja">
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
