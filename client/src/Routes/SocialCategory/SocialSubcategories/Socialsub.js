import React, {useEffect} from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findEventSub } from "../../../redux/actions";
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
            <div className = 'fondo'>
            <Boton colorBtn='btn_naranja'>Seguir Hobby</Boton>
            </div>
        </div>
    )
}