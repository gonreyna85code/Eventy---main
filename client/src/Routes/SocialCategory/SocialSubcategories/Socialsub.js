import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findEventSub, subscription, unsubscription } from "../../../redux/actions";
import botonStyles from '../../../components/Boton/Boton.module.css';
import Boton from '../../../components/Boton/Boton'
import Card from "../../../components/CardEvent/CardEvent";


export default function SubCategory(){

    const {subcategory} = useParams();
    console.log(subcategory);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(findEventSub(subcategory)); 
    }, [dispatch, subcategory]);

    const eventos = useSelector((state) => state.Events);
    console.log(eventos)

    var user= useSelector((state)=>state.User);
    var [statusubs,setStatusubs]=useState('Suscribirse');

    useEffect(()=>{
        if(user.subscriptions){
            if(user.subscriptions.includes(subcategory)){
                setStatusubs('Cancelar suscribción');
            }
        }
    },[user,subcategory]);

    function subscribe(e){
        if(e.target.textContent==='Suscribirse'){
            dispatch(subscription(user.username,e.target.id))
            setStatusubs('Cancelar suscribción');
        }else{
            dispatch(unsubscription(user.username,e.target.id))
            setStatusubs('Suscribirse');
        }
    }

    return(
        <div>
            <h1>{subcategory}</h1>
            <div className ='cardsEvents'>
                {
                    eventos.length > 0 ? eventos.map((el)=>{
                        return(
                            <Card key={el.name} img = {el.info.imagen} name = {el.name} location = {el.location.cityName} date = {el.date} id = {el.id} buttonColor='naranja'/>
                        )
                    })
                    :
                    <div>
                        <h3>Aún no hay eventos. Crea el tuyo!!</h3>
                        <Link to = '/crear-evento'>
                            <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                                Crear
                            </button>
                        </Link>
                    </div>
                }
            </div>
            <div className = 'boton_seguir'>
                <Boton colorBtn='btn_naranja' children={statusubs} onClick={subscribe} id={subcategory} />
            </div>
            <div className = 'fondosub'>
                <div className = 'siguenos'>
                    <h1>¡Síguenos en nuestro servidor de Discord y encuentra gente con tus mismos intereses!</h1>
                </div>
                <iframe className = 'discord' src="https://discordapp.com/widget?id=916403266538074232&theme=dark" width="350" height="350" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            </div>
        </div>
    )
}