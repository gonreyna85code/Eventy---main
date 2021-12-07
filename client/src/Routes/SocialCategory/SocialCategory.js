import React, { useState } from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { findEventByCategory, subscription, unsubscription } from "../../redux/actions";
import './SocialCategory.css';
import botonStyles from "../../components/Boton/Boton.module.css";
import Card from "../../components/CardEvent/CardEvent";
import Boton from "../../components/Boton/Boton";

export default function SocialCategory(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(findEventByCategory('social'));
    },[dispatch]);

    const socialEvents = useSelector((state) => state.Events);
    console.log(socialEvents)     

    var user=useSelector((state)=> state.User);
    var [statusubs,setStatusubs]=useState({
        social:'Suscribirse',
        Fiesta:'Suscribirse',
        Reunion:'Suscribirse',
        Protesta:'Suscribirse',
        Concierto:'Suscribirse'
    });

    useEffect(()=>{
        let subcategories=['Fiesta','Reunion','Protesta','Concierto'];
        if(user.subscriptions){
            if(user.subscriptions.includes('social')){
                setStatusubs({...statusubs,social:'Cancelar suscribción'});
            }
            subcategories.forEach(e => {
                if(user.subscriptions.includes(e)){
                    setStatusubs({...statusubs,[e]:'Cancelar suscribción'});
                }
            });
        }
    },[user]);

    function subscribe(e){
        if(e.target.textContent==='Suscribirse'){
            dispatch(subscription(user.username,e.target.id))
            setStatusubs({...statusubs,[e.target.id]:'Cancelar suscribción'});
        }else{
            dispatch(unsubscription(user.username,e.target.id))
            setStatusubs({...statusubs,[e.target.id]:'Suscribirse'});
        }
    }

    return(
        <div>
            <div className = 'encabezado'>
                <h1 className = 'title'>Eventos Sociales</h1>
                <Boton colorBtn='btn_azul' children={statusubs.social} onClick={subscribe} id='social'/>
            </div>
            <div className ='cardsEvents'>
            {
                socialEvents && socialEvents.map((el)=>{
                    return(
                        <Card key={el.name} img = {el.info.imagen} name = {el.name} location = {el.location.cityName} date = {el.date} id = {el.id} buttonColor='naranja'/>
                    )
                })
            }
            </div>
            <div className = 'cont-subcategories'>
                <h1 className = 'title2'>Subcategorías:</h1>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Fiestas</h1>
                    <section>
                        <Boton colorBtn='btn_azul' children={statusubs.Fiesta} onClick={subscribe} id='Fiesta'/>
                        <Link to = {'/subcategory/Fiesta'}>
                        <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                            Acceder
                        </button>
                        </Link>
                    </section>
                </div>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Reuniones</h1>
                    <section>
                        <Boton colorBtn='btn_azul' children={statusubs.Reunion} onClick={subscribe} id='Reunion'/>
                        <Link to = {'/subcategory/Reunion'}>
                        <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                            Acceder
                        </button>
                        </Link>
                    </section>
                </div>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Protestas</h1>
                    <section>
                        <Boton colorBtn='btn_azul' children={statusubs.Protesta} onClick={subscribe} id='Protesta'/>
                        <Link to = {'/subcategory/Protesta'}>
                        <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                            Acceder
                        </button>
                        </Link>
                    </section>
                </div>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Conciertos</h1>
                    <section>
                        <Boton colorBtn='btn_azul' children={statusubs.Concierto} onClick={subscribe} id='Concierto'/>
                        <Link to = {'/subcategory/Concierto'}>
                        <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                            Acceder
                        </button>
                        </Link>
                    </section>
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