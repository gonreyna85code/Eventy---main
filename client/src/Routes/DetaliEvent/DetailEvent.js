import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, postPreference, getUser } from "../../redux/actions";
import style from'./DetailEvents.module.css';
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import './Ubicación.PNG';
import { useMercadopago } from 'react-sdk-mercadopago';
import Input from '../../components/Input/Input'
import Loading from '../../components/Loading/Loading'
import Map from "../../components/Maps/Map";
import Warning from "../../components/Warning.js/Warning";
import Boton from "../../components/Boton/Boton";



export default function DetailEvet(){
    
    const{name} = useParams();
    const dispatch = useDispatch();

    const [cantidad, setCantidad] = useState(1);
    const [preference, setPreference] = useState({});
    const user = useSelector(state => state.User);
    const Events = useSelector((state) => state.Event);
    const PreferenceId = useSelector((state)=>state.PreferenceId)

    

    useEffect(()=>{ 
        dispatch(getEvent(name)); 
    }, [dispatch, name]);



    useEffect(()=>{

    dispatch(getUser());

    }, [dispatch]);

   
    
  
    const theEvent = Events[0]; 

  
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
            { user && !user._id ?
            <Warning/>
            :
            <div>
                {
                    theEvent?
                    <div>
                            <div className = {style.fondo}>
                                <div className = {style.info_detail}>
                                    <h1 className = {style.nombreEvento}>{theEvent.name}</h1>
                                    <div>
                                        <FontAwesomeIcon className = {style.icono} icon={faMapMarkerAlt} /> <span className = {style.info}>{theEvent.location.cityName}</span>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className = {style.icono} icon={faCalendarAlt} /> <span className = {style.info}>{theEvent.date.slice(8,10)+'/'+theEvent.date.slice(5,7)+'/'+theEvent.date.slice(2,4)}</span>
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
                                        <img className = {style.imagenDetail} src = {theEvent.info.imagen} alt=''></img>
                                        :
                                        <img className = {style.imagenDetail} src = {'https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg'} alt=''></img>
                                        }
                                </div>
                        </div>
                        <div className = {style.dataContent}>
                            <div className = {style.dataInfo}>
                                <h1>Información del evento:</h1>
                                <p className = {style.dataInfoP}>{theEvent.info.description}</p>
                               
                            </div>
                            <div className = {style.dataInfo}>
                                <h1>Mapa:</h1>
                                <div>
                                    {console.log(theEvent)}
                                <Map 
                                    coords = {theEvent.location.cityCords}
                                    LabelName='Ciudad'
                                />
                                
                            </div>
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
                    <Loading/>
                }
                <div className = {style.home}>
                <Link to ='/'>
                <Boton colorBtn='btn_azul'>Volver al Home</Boton>
                </Link>
                </div>
            </div>
            }
        </div>
    )
}