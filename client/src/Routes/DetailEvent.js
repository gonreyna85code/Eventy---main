import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, postPreference } from "../redux/actions";
import './DetailEvents.css';
import Boton from "../components/Boton/Boton";
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import './Ubicación.PNG';
import { useMercadopago } from 'react-sdk-mercadopago';
import Input from '../components/Input/Input'



export default function DetailEvet(){
    
    const{name} = useParams();
    console.log(name)

    const [cantidad, setCantidad] = useState(1);
    const [preference, setPreference] = useState({});

    const dispatch = useDispatch();

    useEffect(()=>{ 
        dispatch(getEvent(name)); 
    }, [dispatch, name]);

    const Events = useSelector((state) => state.Event);
    const PreferenceId = useSelector((state)=>state.PreferenceId)
    console.log(PreferenceId)
  
    const Evento = Events.filter(el => el.name === name); 
    const theEvent = Evento[0]; 

  
    useEffect(()=>{
        if(theEvent){
        const fee = theEvent.info.hasOwnProperty('fee') ? theEvent.info.fee : 3
        setPreference({
            title: 'Entradas de '+ theEvent.name,
            price: fee,
            quantity: cantidad
       })
    }
    }, [theEvent, cantidad])
    
    function handleChange(e){
        setCantidad(e.target.value);
        console.log(cantidad)
    }

    function handleClick(e){
        dispatch(postPreference(preference))
    }


    console.log(theEvent);

    const mercadopago = useMercadopago.v2('TEST-73717f29-d26d-4a49-aec6-3f75b4872625', {
        locale: 'es-AR'
    });

    useEffect(() => {
        if (mercadopago && PreferenceId) {
            mercadopago.checkout({
                preference: {
                    id: PreferenceId
                },
                render: {
                    container: '.pago',
                    label: 'Pay',
                }
            })
        }
    }, [mercadopago, PreferenceId])


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
                            <Link to = {'/editar-evento/' + name}>
                                <Boton colorBtn='btn_naranja'>Editar Evento</Boton>
                            </Link>
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
                       <div className = 'pago'>   
                       {
                           theEvent.event_pay === true ?
                           <div>
                           <h1>Comprar entradas:</h1>
                           <h3>Precio general: {theEvent.info.fee}$</h3>
                           <Input
                              label="Cantidad de entradas"
                              type="number"
                              name="quantity"
                              min = {1}
                              onChange={(e)=>handleChange(e)}
                           />
                           <Boton onClick = {(e)=>handleClick(e)}>Aplicar Cantidad</Boton>
                           </div>
                           :
                           <p>Este evento es GRATUITO.</p>
                       }
                       </div>
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