import React, {useEffect, useState} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findEventSub, getUser } from "../../../redux/actions";
import botonStyles from '../../../components/Boton/Boton.module.css';
//import Boton from '../../../components/Boton/Boton'
import Card from "../../../components/CardEvent/CardEvent";


export default function SubCategory(){

    const dispatch = useDispatch();
    const {subcategory} = useParams();
    const eventos = useSelector((state) => state.Events);
    const user= useSelector((state)=>state.User);

    useEffect(()=>{
        dispatch(findEventSub(subcategory)); 
    }, [dispatch, subcategory]);

    useEffect(()=>{
        dispatch(getUser())
    }, [dispatch])
    
    

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
            
            <div className = 'fondosub'>
                <div className = 'siguenos'>
                    <h1>¡Síguenos en nuestro servidor de Discord y encuentra gente con tus mismos intereses!</h1>
                </div>
                <iframe className = 'discord' src="https://discordapp.com/widget?id=916403266538074232&theme=dark" width="350" height="350" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
            </div>
        </div>
    )
}