import React from "react";
import {Link, useNavigate, useParams} from 'react-router-dom';
import './Compra.css';
import Boton from "../../components/Boton/Boton";

export default function Compra(){

    const{title} = useParams();
    const navigate = useNavigate()

    return(
        <div className="contenedorCompra">
            {user&& user.password==='' ? navigate('/completarPerfil'):null }
            <h1>Compra Exitosa</h1>
            <h4>Su compra de {title} ha sido exitosa</h4> 
            <h4>Guarde este código QR y muéstrelo al momento de entrar al evento</h4>
            <img className="QR" alt="" src={'https://api.qrserver.com/v1/create-qr-code/?data=Eventy%20Validación%20de%20' + title +'&size=250x250'}></img>
            <h3>¡Que se divierta!</h3>
            <Link to = '/'>
            <Boton colorBtn={'btn_naranja'}>Volver al Home</Boton>
            </Link>
        </div>
    )
}