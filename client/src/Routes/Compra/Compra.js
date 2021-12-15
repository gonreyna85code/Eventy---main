import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, getEvent, putVentas } from "../../redux/actions";
import {Link, useNavigate, useParams} from 'react-router-dom';
import './Compra.css';
import Boton from "../../components/Boton/Boton";


export default function Compra(){

    const{title} = useParams();
    const dispatch = useDispatch();
    const name = title.slice(14);
    

    useEffect(() => {
        dispatch(getEvent('Festival Nacional del Chamamé 2022'));
      }, [dispatch, name]);
    
      useEffect(() => {
        dispatch(getUser());
      }, [dispatch]);

      const user = useSelector((state) => state.User);
      const event = useSelector((state) => state.Event[0]);
      const [qr, setQr] = useState(false)
      const ventasEntradas = Number(title.slice(0,1))
      const ventas = event && event.ventas + ventasEntradas
      console.log(ventas);
      console.log(event);

      function handleQr (e){
          e.preventDefault();
          setQr(true);
          dispatch(putVentas(name, ventas));
      }

    const navigate = useNavigate()


    return(
        <div className="contenedorCompra">
            {user&& user?.password==='' ? navigate('/completarPerfil'):null }
            <h1>Compra Exitosa</h1>
            <h4>Su compra de {title} ha sido exitosa</h4> 
            <h4>Guarde este código QR y muéstrelo al momento de entrar al evento</h4>
            <div>
                {
                    qr === false ?
                    <Boton colorBtn={'btn_naranja'} onClick={handleQr}>Generar Código</Boton>
                    :
                    <p></p>
                }
            </div>
            {
                qr === true ? 
                <img className="QR" alt="" src={'https://api.qrserver.com/v1/create-qr-code/?data=Eventy%20Validación%20de%20' + title + '.%20Usuario:%20' + user.username + '&size=250x250'}></img>
                :
                <p></p>
            }
            
            <h3>¡Que se divierta!</h3>
            <Link to = '/'>
            <Boton colorBtn={'btn_naranja'}>Volver al Home</Boton>
            </Link>
        </div>
    )
}