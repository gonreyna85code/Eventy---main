import React, { useState } from "react";
import Input from "../components/Input/Input";
import { useDispatch } from "react-redux";
import Boton from "../components/Boton/Boton";
import { useNavigate } from "react-router";
import {forgot} from "../redux/actions";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  return (
    <div>
      {user&& user.password==='' ? navigate('/completarPerfil'):null }
      <h1>Ingrese su Usuario.</h1>
      <div className="input">
        <Input
          type="text"
          onChange={(e) => {
            setUser({username: e.target.value,
            });
          }}
        />
        <Boton
        colorBtn="btn_azul"
        onClick={() => {
          dispatch(forgot(user));          
          setTimeout(function () {
            navigate("/login");
            window.location.reload();            
          }, 3000);          
        }}>
        {" "}ENVIAR EMAIL{" "}
      </Boton>
      </div>      
    </div>
  );
}
