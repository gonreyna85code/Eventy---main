import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { findEventByCategory, getUser} from "../../redux/actions";
import '../SocialCategory/SocialCategory.css'
import botonStyles from "../../components/Boton/Boton.module.css"
import Card from "../../components/CardEvent/CardEvent";

export default function SportCategory(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector(state=> state.User)
    useEffect(()=>{
        dispatch(findEventByCategory('sports'));
    },[dispatch]);

    const sportsEvents = useSelector((state) => state.Events);
    
    useEffect(()=>{
        dispatch(getUser())
    }, [dispatch])


    return(
        <div>
            {user&& user?.password==='' ? navigate('/completarPerfil'):null }
           <div className = 'encabezado'>
                <h1 className = 'title'>Eventos Deportivos</h1>
            </div>
            <div className ='cardsEvents'>
            {
                sportsEvents && sportsEvents.length > 0 ? sportsEvents.map((el)=>{
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
            <div className = 'cont-subcategories'>
                <h1 className = 'title2'>Subcategorías:</h1>
                <div className = 'hobby'>
                    <h1 className = 'hobbytitle'>Fútbol</h1>
                    <section>
                        
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