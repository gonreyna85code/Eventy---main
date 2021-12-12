import React, { useState } from "react";
import Input from "../components/Input/Input";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Boton from "../components/Boton/Boton";
import { useNavigate } from "react-router";
import {forgot} from "../redux/actions";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  return (
    <div>
      <h1>Ingrese su Usuario.</h1>
      <div className="input">
        <Input
          label="Usuario"
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
