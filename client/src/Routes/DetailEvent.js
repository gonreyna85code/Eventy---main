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

    const Events = useSelector((state) => state.Event);
  
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
                           <img className = 'mapa' src = 'https://i.pinimg.com/564x/a4/40/e4/a440e408502b6aa3e290e030540ea6dc.jpg' alt=''/>
                       </div>
                   </div>
                   <div>
                       <h1>Comprar entradas:</h1>
                       <div>
                       <form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post" >
                          <input type="hidden" name="cmd" value="_cart"/>
                          <input type="hidden" name="business" value="kautarol@gmail.com"/>
                          <input type="hidden" name="lc" value="ES"/>
                          <input type="hidden" name="item_name" value="Entradas"/>
                          <input type="hidden" name="item_number" value="01"/>
                          <input type="hidden" name="amount" value="0.05"/>
                          <input type="hidden" name="currency_code" value="USD"/>
                          <input type="hidden" name="button_subtype" value="products"/>
                          <input type="hidden" name="no_note" value="0"/>
                          <input type="hidden" name="add" value="1"/>
                          <input type="hidden" name="bn" value="PP-ShopCartBF:btn_cart_LG.gif:NonHostedGuest"/>
                          <input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_cart_LG.gif" border="0" name="submit" alt="PayPal, la forma rápida y segura de pagar en Internet."/>
                          <img alt="" border="0" src="https://www.paypalobjects.com/es_XC/i/scr/pixel.gif" width="1" height="1"/>
                        </form>          
                       </div>
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