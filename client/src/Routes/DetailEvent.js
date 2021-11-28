import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent } from "../redux/actions";
import './DetailEvents.css';
import Boton from "../components/Boton/Boton";
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import './Ubicación.PNG'

export default function DetailEvet(){
    
    const{name} = useParams();
    console.log(name)

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getEvent(name)); 
    }, [dispatch, name]);

    const Events = useSelector((state) => state.Events);
  
    const Evento = Events.filter(el => el.name === name); 
    const theEvent = Evento[0];

    console.log(theEvent);

    return(
       <div>
           {
               theEvent?
               <div>
                    <div className = 'fondo'>
                        <div className = 'info_detail'>
                            <h1 className = 'nombre_evento'>{theEvent.name}</h1>
                            <div>
                                <FontAwesomeIcon className = 'icono' icon={faMapMarkerAlt} /> <span className = 'info'>{theEvent.location}</span>
                             </div>
                             <div>
                                <FontAwesomeIcon className = 'icono' icon={faCalendarAlt} /> <span className = 'info'>{theEvent.date.slice(8,10)+'/'+theEvent.date.slice(5,7)+'/'+theEvent.date.slice(2,4)}</span>
                            </div>
                            <div>
                            <Boton colorBtn='btn_naranja'>Asistiré</Boton>
                            <Boton colorBtn='btn_naranja'>Seguir Evento</Boton>
                            </div>
                        </div>   
                        <div>
                                {theEvent.info.imagen ?
                                <img className = 'imagen_detail' src = {theEvent.info.imagen} alt=''></img>
                                :
                                <img className = 'imagen_detail' src = {'https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg'} alt=''></img>
                                }
                        </div>
                   </div>
                   <div className = 'data_content'>
                       <div className = 'data_info'>
                           <h1>Información del evento:</h1>
                           <p className = 'data_info_p'>{theEvent.info.description}</p>
                           <h4> El mapa es solo ilustrativo.</h4>
                       </div>
                       <div className = 'data_info'>
                           <h1>Mapa:</h1>
                           <img className = 'mapa' src = 'https://i.pinimg.com/564x/a4/40/e4/a440e408502b6aa3e290e030540ea6dc.jpg'/>
                       </div>
                   </div>
                   <div>
                       <h1>Comprar entradas:</h1>
                       <p>Aquí iría el sistema de pagos.</p>
                   </div>

               </div>
               :
               <h1>Cargando... </h1>
           }
           <div className = 'home'>
           <Link to ='/'>
           <Boton colorBtn='btn_azul'>Volver al Home</Boton>
           </Link>
           </div>
       </div>
    )
}