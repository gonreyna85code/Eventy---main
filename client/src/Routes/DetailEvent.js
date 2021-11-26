import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent } from "../redux/actions";
import './DetailEvents.css';
import Boton from "../components/Boton/Boton";

export default function DetailEvet(){
    
    const{name} = useParams();
    console.log(name)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getEvent(name)); 
    }, [dispatch]);

    const theEvent = useSelector((state) => state.Event);

    console.log(theEvent);

    return(
       <div>
           {
               theEvent?
               <div>
                   <h1 className = 'nombre_evento'>{theEvent.name}</h1>
                   <div>
                   <img className = 'imagen_detail' src = 'https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg'></img>
                   <p>Esta imágen solo es de prueba</p>
                   </div>
                   <div>
                       <h1>Información del evento:</h1>
                       <h3>Lugar:</h3>
                       <p>{theEvent.location}</p>
                       <h3>Fecha y hora:</h3>
                       <p>{theEvent.date}</p>
                       <p>Esta es una fecha de prueba</p>
                   </div>
                   <div>
                       <h1>Comprar entradas:</h1>
                       <p>Aquí iría el sistema de pagos.</p>
                   </div>
                   <div>
                       <h1>Mapa:</h1>
                       <p>Aquí iría el mapa del lugar desde una api externa</p>
                   </div>
               </div>
               :
               <h1>Cargando... </h1>
           }
           <Link to ='/homeuser'>
           <Boton colorBtn='btn_azul'>Volver al Home</Boton>
           </Link>
       </div>
    )
}