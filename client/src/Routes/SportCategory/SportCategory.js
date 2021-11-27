import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { findEventByCategory } from "../../redux/actions";
import Card from "../../components/CardEvent";
import '../SocialCategory/SocialCategory.css'
import botonStyles from "../../components/Boton/Boton.module.css"

export default function SportCategory(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(findEventByCategory('social'));
    },[]);

    const sportEvents = useSelector((state) => state.Events);
    console.log(sportEvents) 

    const pruebaEventos = [
        {
        name: 'Triatlón Iron-Man ',
        id: 1,
        location: 'Argentina',
        date: 'Marzo 27 | 2022',
        img: 'https://scontent.fpra1-1.fna.fbcdn.net/v/t1.6435-9/32967695_1995853097333987_437935064731353088_n.png?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=iHDjgxYoi80AX-FjkBG&_nc_ht=scontent.fpra1-1.fna&oh=0f93492859a96cb22625a0ba68590e14&oe=61C81A67'
    },
    {
        name: 'Copa Mundial de Fútbol',
        id: 2,
        location: 'Catar',
        date: 'Noviembre, Diciembre| 2022',
        img: 'https://cdn-3.expansion.mx/dims4/default/8d6fd42/2147483647/strip/true/crop/1371x876+0+0/resize/1800x1150!/format/webp/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F6f%2Fc4%2F8766f2ff44a9b37bcd371593de2f%2Fqatar-2022.JPG'
    },
    {
        name: 'Rally Dakar 2022',
        id: 3,
        location: 'Arabia Saudí',
        date: 'Enero 2 - 14 | 2022',
        img: 'https://upload.wikimedia.org/wikipedia/en/f/fe/2022_Dakar_Rally_Logo.jpg'
    }
    ]

    return(
        <div>
            <div>
                <h1 className = 'title'>Eventos Deportivos</h1>
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