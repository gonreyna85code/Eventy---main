import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { findEventByCategory } from "../../redux/actions";
import Card from "../../components/CardEvent";
import '../SocialCategory/SocialCategory.css'
import botonStyles from "../../components/Boton/Boton.module.css"

export default function SportCategory(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(findEventByCategory('sports'));
    },[dispatch]);

    const sportsEvents = useSelector((state) => state.Events);
    console.log(sportsEvents) 

    

    return(
        <div>
           <div className = 'encabezado'>
                <Link to = '/'>
                <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                        Home
                    </button>
                </Link>
                <h1 className = 'title'>Eventos Deportivos</h1>
            </div>
            <div className ='cardsEvents'>
            {
                        sportsEvents && sportsEvents.map((el)=>{
                            return(
                            <Card key={el.name} img = {el.info.imagen} name = {el.name} location = {el.location} date = {el.date} id = {el.id} buttonColor='naranja'/>
                            )
                        })
                    }
            </div>
            <div className = 'cont-subcategories'>
                <h1 className = 'title2'>Subcategorías:</h1>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Ejemplo de subcategoría</h1>
                    <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                        Seguir Hobby
                    </button>
                </div>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Ejemplo de subcategoría</h1>
                    <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                        Seguir Hobby
                    </button>
                </div>
            </div>
            <div>
                    <h1 className = 'hobbytitle'>Crea tu propio evento!</h1>
                    <div>
                        <Link to = '/crear-evento'>
                    <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                        Crear
                    </button>
                        </Link>
                    </div>
            </div>
        </div>
    )
}