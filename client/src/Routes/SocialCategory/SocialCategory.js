import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { findEventByCategory } from "../../redux/actions";
import './SocialCategory.css'
import botonStyles from "../../components/Boton/Boton.module.css"
import Card from "../../components/CardEvent/CardEvent";

export default function SocialCategory(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(findEventByCategory('social'));
    },[dispatch]);

    const socialEvents = useSelector((state) => state.Events);
    console.log(socialEvents)     

    return(
        <div>
            <div className = 'encabezado'>
                <Link to = '/'>
                <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                        Home
                    </button>
                </Link>
                <h1 className = 'title'>Eventos Sociales</h1>
            </div>
            <div className ='cardsEvents'>
            {
                        socialEvents && socialEvents.map((el)=>{
                            return(
                            <Card key={el.name} img = {el.info.imagen} name = {el.name} location = {el.location} date = {el.date} id = {el.id} buttonColor='naranja'/>
                            )
                        })
                    }
            </div>
            <div className = 'cont-subcategories'>
                <h1 className = 'title2'>Subcategorías:</h1>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Fiestas</h1>
                    <Link to = {'/subcategory/Fiesta'}>
                    <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                        Acceder
                    </button>
                    </Link>
                </div>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Reuniones</h1>
                    <Link to = {'/subcategory/Reunion'}>
                    <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                        Acceder
                    </button>
                    </Link>
                </div>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Protestas</h1>
                    <Link to = {'/subcategory/Protesta'}>
                    <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                        Acceder
                    </button>
                    </Link>
                </div>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Conciertos</h1>
                    <Link to = {'/subcategory/Concierto'}>
                    <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                        Acceder
                    </button>
                    </Link>
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