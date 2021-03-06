import React, {useEffect, useState} from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEvent, postPreference, getUser, findUser } from "../../redux/actions";
import style from'./DetailEvents.module.css';
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';
import './Ubicación.PNG';
import { useMercadopago } from 'react-sdk-mercadopago';
import Input from '../../components/Input/Input'
import Loading from '../../components/Loading/Loading'
import Map from "../../components/Maps/Map";
import Boton from "../../components/Boton/Boton";
import Container from "../../components/Container/Container";

function creatorr(n='',s=''){
    if(n && s){
        return n[0].toUpperCase() + n.slice(1) + ' ' + s[0].toUpperCase() + s.slice(1)
    }
    return '';
}

export default function DetailEvet(){
    
    const{name} = useParams();
    const dispatch = useDispatch();
    const navegate = useNavigate()
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
                    label: 'Pagar',
                }
            })
        }
    }, [mercadopago, PreferenceId])


    useEffect(()=>{
        if(Object.keys(user).length !== 0 && theEvent){
            if(user._id !== theEvent.user){
                dispatch(findUser(theEvent.user));
            }
        }
    },[theEvent, dispatch, user]);

    var creator=useSelector(state=>state.OtherUsers);
    if(creator){
        if(Object.keys(creator).length === 0){
            creator={profile:{name:'',surname:''}};
        }
    }

    return(
        <div>
            { user && !user._id ?
                navegate('/login')
            :
            <div>
                {
                    theEvent?
                    <div>
                        <div className = {style.fondo} style={{background:`linear-gradient(0deg, rgb(1, 56, 95) 10%, rgba(1, 56, 95, 0.9) 30%, rgba(1, 56, 95, 0.5) 100%), url(${theEvent.info.imagen})`}}>
                            <Container>
                                <div>
                                    {theEvent.info.imagen ?
                                        <img className = {style.imagenDetail} src = {theEvent.info.imagen} alt=''></img>
                                        :
                                        <img className = {style.imagenDetail} src = {'https://www.masquenegocio.com/wp-content/uploads/2018/03/evento-concierto-874x492.jpg'} alt=''></img>
                                    }
                                </div>
                                <div className = {style.info_detail}>
                                    <h1 className = {style.nombreEvento}>{theEvent.name}</h1>
                                    <div>
                                        <FontAwesomeIcon className = {style.icono} icon={faMapMarkerAlt} />
                                        <span className = {style.info}>{theEvent.location?.cityName}</span>
                                    </div>
                                    <div>
                                        <FontAwesomeIcon className = {style.icono} icon={faCalendarAlt} />
                                        <span className = {style.info}>{theEvent.date.slice(8,10)+'/'+theEvent.date.slice(5,7)+'/'+theEvent.date.slice(2,4)}</span>
                                    </div>
                                    <div>
                                        <Boton colorBtn='btn_naranja'>Asistiré</Boton>
                                        <Boton colorBtn='btn_naranja'>Seguir Evento</Boton>
                                        {
                                            user._id===theEvent.user?
                                            <Link to = {'/editar-evento/' + name}>
                                                <Boton colorBtn='btn_naranja'>Editar Evento</Boton>
                                            </Link>
                                            :
                                            <Link to={`/user/${creator?.profile?.name+'-'+creator?.profile?.surname}`}>
                                                <span className={style.creator}>Creado por: {creatorr(creator?.profile?.name,creator?.profile?.surname)}</span>
                                            </Link>
                                        }
                                    </div>
                                </div>
                            </Container>
                        </div>
                        
                        <div className = {style.dataContent}>
                            <Container>
                                <div className = {style.dataInfo}>
                                    <h2>Información del evento:</h2>
                                    <p className = {style.dataInfoP}>{theEvent.info?.description}</p>
                                
                                </div>
                                <div className = {style.dataInfo}>
                                    <div>
                                        {console.log(theEvent)}
                                        <Map 
                                            coords = {theEvent.location?.cityCords}
                                            LabelName='Ciudad'
                                        />
                                        
                                    </div>
                                </div>
                            </Container>
                        </div>
                        <div>
                            <Container>
                                <div className = {`pago ${style.cont_pagos}`}>   
                                {
                                    theEvent.event_pay === true ?
                                    <div>
                                        <h1>Comprar entradas:</h1>
                                        <div className={style.cont_datospago}>
                                            
                                            <h3>Precio general: {theEvent.info?.fee}$</h3>
                                            <div>
                                                <Input
                                                    label="Cantidad de entradas"
                                                    type="number"
                                                    name="quantity"
                                                    min = {1}
                                                    onChange={(e)=>handleChange(e)}
                                                />
                                                <Boton colorBtn='btn_azul' onClick = {(e)=>handleClick(e)}>Aplicar Cantidad</Boton>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <p>Este evento es GRATUITO.</p>
                                }
                                </div>
                            </Container>
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