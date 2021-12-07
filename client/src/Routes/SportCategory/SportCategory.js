import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { findEventByCategory,subscription, unsubscription } from "../../redux/actions";
import '../SocialCategory/SocialCategory.css'
import botonStyles from "../../components/Boton/Boton.module.css"
import Card from "../../components/CardEvent/CardEvent";
import Boton from "../../components/Boton/Boton";

export default function SportCategory(){
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(findEventByCategory('sports'));
    },[dispatch]);

    const sportsEvents = useSelector((state) => state.Events);
    console.log(sportsEvents) 

    var user=useSelector((state)=> state.User);
    var [statusubs,setStatusubs]=useState({
        sports:'Suscribirse',
        Futbol:'Suscribirse',
        Maraton:'Suscribirse',
        Tenis:'Suscribirse',
        Handball:'Suscribirse'
    });

    useEffect(()=>{
        let subcategories=['Futbol','Maraton','Tenis','Handball'];
        if(user.subscriptions){
            if(user.subscriptions.includes('sports')){
                setStatusubs({...statusubs,sports:'Cancelar suscribción'});
            }
            subcategories.forEach(e => {
                if(user.subscriptions.includes(e)){
                    setStatusubs({...statusubs,[e]:'Cancelar suscribción'});
                }
            });
        }
    },[user, statusubs]);

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
                <h1 className = 'title'>Eventos Deportivos</h1>
                <Boton colorBtn='btn_azul' children={statusubs.sports} onClick={subscribe} id='sports'/>
            </div>
            <div className ='cardsEvents'>
            {
                sportsEvents && sportsEvents.map((el)=>{
                    return(
                        <Card key={el.name} img = {el.info.imagen} name = {el.name} location = {el.location.cityName} date = {el.date} id = {el.id} buttonColor='naranja'/>
                    )
                })
            }
            </div>
            <div className = 'cont-subcategories'>
                <h1 className = 'title2'>Subcategorías:</h1>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Fútbol</h1>
                    <section>
                        <Boton colorBtn='btn_azul' children={statusubs.Futbol} onClick={subscribe} id='Futbol'/>
                        <Link to = {'/subcategory/Futbol'}>
                        <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                            Acceder
                        </button>
                        </Link>
                    </section>
                </div>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Maratón</h1>
                    <section>
                        <Boton colorBtn='btn_azul' children={statusubs.Maraton} onClick={subscribe} id='Maraton'/>
                        <Link to = {'/subcategory/Maraton'}>
                        <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                            Acceder
                        </button>
                        </Link>
                    </section>
                </div>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Tenis</h1>
                    <section>
                        <Boton colorBtn='btn_azul' children={statusubs.Tenis} onClick={subscribe} id='Tenis'/>
                        <Link to = {'/subcategory/Tenis'}>
                        <button className={`${botonStyles.btn} ${botonStyles.btn_azul}`}>
                            Acceder
                        </button>
                        </Link>
                    </section>
                </div>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Handball</h1>
                    <section>
                        <Boton colorBtn='btn_azul' children={statusubs.Handball} onClick={subscribe} id='Handball'/>
                        <Link to = {'/subcategory/Handball'}>
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