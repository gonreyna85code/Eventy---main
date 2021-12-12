import React, { useState } from "react";
import Input from "./../components/Input/Input";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Boton from "./../components/Boton/Boton";
import { useNavigate } from "react-router";
import {reset} from "../redux/actions";

export default function ResetPassword() {
  const id = useParams()
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  console.log(id);
  return (
    <div>
      <h1>Ingrese su nueva contraseña.</h1>
      <div className="input">
        <Input
          label="Nueva Contraseña:"
          type="password"
          onChange={(e) => {
            setUser({password: e.target.value,
            id: id});
          }}
        />
        <Boton
        colorBtn="btn_azul"
        onClick={() => {
          dispatch(reset(user));          
          setTimeout(function () {
            navigate("/login");
            window.location.reload();            
          }, 3000);          
        }}>
        {" "}RESET PASSWORD{" "}
      </Boton>
      </div>      
    </div>
  );
}
