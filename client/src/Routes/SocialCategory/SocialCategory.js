import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { findEventByCategory } from "../../redux/actions";
import Card from "../../components/CardEvent";
import './SocialCategory.css'
import botonStyles from "../../components/Boton/Boton.module.css"

export default function SocialCategory(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(findEventByCategory('social'));
    },[]);

    const socialEvents = useSelector((state) => state.Events);
    console.log(socialEvents) 

    const pruebaEventos = [
        {
        name: 'LollaPalooza 2022',
        id: 1,
        location: 'San Isidro, Argentina',
        date: 'Marzo 18, 19 y 20 | 2022',
        img: 'https://i.pinimg.com/564x/e6/e1/58/e6e158eba9ba9208b4abb6fec41e2aeb.jpg'
    },
    {
        name: 'Festival Intenacional de Cine de Mar del Plata',
        id: 2,
        location: 'Mar del Plata, Argentina',
        date: 'Noviembre 18 al 28 | 2021',
        img: 'https://www.mardelplatafilmfest.com/beta36/images/news/36-festival-internacional-de-cine-de-mar-del-plata-imagen1_9.jpg'
    },
    {
        name: 'Festival La Nueva Generación (LNG) 2022',
        id: 3,
        location: 'Córdoba, Argentina',
        date: 'Noviembre 11, 12, 13 | 2022',
        img: 'https://indiehoy.com/wp-content/uploads/2019/10/la-nueva-generacion.jpg'
    }
    ]

    return(
        <div>
            <div>
                <h1 className = 'title'>Eventos Sociales</h1>
            </div>
            <div className ='cardsEvents'>
            {
                        pruebaEventos && pruebaEventos.map((el)=>{
                            return(
                            <Card key={el.name} img = {el.img} name = {el.name} location = {el.location} date = {el.date} id = {el.id} buttonColor='naranja'/>
                            )
                        })
                    }
            </div>
            <div className = 'cont-subcategories'>
                <h1 className = 'title'>Subcategorías:</h1>
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
        </div>
    )
}