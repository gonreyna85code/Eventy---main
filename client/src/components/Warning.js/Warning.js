import React from "react";
import Boton from "../Boton/Boton";
import {useNavigate} from "react-router-dom";

export default function Warning(){
    const history=useNavigate();

    function handleClick(e){
        history('/login');
    }

    return (
        <div>
            <h1>Sin autorización</h1>
            <h2>Debe estar logueado para acceder</h2>
            <Boton colorBtn='btn_azul' children='Log-In' onClick={handleClick}/>
        </div>
    )
}