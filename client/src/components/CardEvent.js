import React from "react";
import { Link } from "react-router-dom";
import Boton from "./Boton/Boton";
import styles from './CardEvent.module.css'
import botonStyles from "../components/Boton/Boton.module.css"
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'


export default function Card({name, id, location, date, img,buttonColor}){
    let colorButton
    let colorIcon
    if(buttonColor=== 'naranja'){
        colorButton=botonStyles.btn_naranja 
        colorIcon=styles.iconNaranja
    }
    else if(buttonColor === 'azul'){
        colorButton=botonStyles.btn_azul
        colorIcon=styles.iconAzul
    }
    return(
        <div className = {styles.contenedor} key = {name}>
            <img className = {styles.imagen} src = {img} alt = "img not found" />
            <div>
            <h3 className = {styles.nameCard}>{name}</h3>
            </div>
            <div>
            <FontAwesomeIcon  className={`${colorIcon}`} icon={faMapMarkerAlt} /> <a className = {styles.locationCard}>{location}</a>
            </div>
            <div>
            <FontAwesomeIcon className={`${colorIcon}`}  icon={faCalendarAlt} /> <a className = {styles.dateCard}>{date}</a>
            </div>
            <Link to = {'/detailEvent/' + name}>
            <button className={`${botonStyles.btn} ${colorButton}`} >VER DETALLES</button>
            </Link>
            {console.log(buttonColor)}
        </div>
    )
}