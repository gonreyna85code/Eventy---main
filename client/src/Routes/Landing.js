import React from 'react';
import { useNavigate } from 'react-router-dom';
import Boton from '../components/Boton/Boton';

//Esto está acá solo para que me deje correr la aplicación en el browser. Pueden borrarlo y colocar el verdadero componente.

export default function Landing (){

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate("/login")
    }

    return (
     <div>
        <h1>Este es el Landing</h1>
        <Boton colorBtn='btn_azul' onClick={handleClick}>Acceder</Boton>
     </div>
    )
}
