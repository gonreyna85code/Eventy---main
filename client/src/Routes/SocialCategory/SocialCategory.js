import React from "react";
import { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { findEventByCategory, getUser } from "../../redux/actions";
import './SocialCategory.css';
import botonStyles from "../../components/Boton/Boton.module.css";
import Card from "../../components/CardEvent/CardEvent";

export default function SocialCategory(){
    const dispatch = useDispatch();
    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(findEventByCategory('social'));
    },[dispatch]);

    const socialEvents = useSelector((state) => state.Events);

    var user=useSelector((state)=> state.User);
   
    useEffect(()=>{
        dispatch(getUser())
    },  [dispatch])

    return(
        <div>
            {user&& user.password==='' ? navigate('/completarPerfil'):null }
            <div className = 'encabezado'>
                <h1 className = 'title'>Eventos Sociales</h1>
            </div>
            <div className ='cardsEvents'>
            {
                socialEvents && socialEvents.length > 0 ? socialEvents.map((el)=>{
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
                    <h1 className = 'hobbytitle'>Fiestas</h1>
                    <section>
                        
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