import React from "react";
import { Link } from "react-router-dom";
<<<<<<< HEAD:client/src/components/Card/CardEvent.js
import Boton from "../Boton/Boton";
=======
//import Boton from "./Boton/Boton";
>>>>>>> e28d52054927fc67e304c4cebd7d9bba35ef8b09:client/src/components/CardEvent.js
import styles from './CardEvent.module.css'
import botonStyles from "../Boton/Boton.module.css"
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
            <div className={styles.cont_img} style={{backgroundImage:`url(${img})`}}>
                {/* <img className = {styles.imagen} src = {img} alt={name} /> */}
            </div>
            <div>
                <h3 className = {styles.nameCard}>{name}</h3>
            </div>
            <div className={styles.cont_info}>
                <div>
                    <FontAwesomeIcon  className={`${colorIcon}`} icon={faMapMarkerAlt} /> <span className = {styles.locationCard}>{location}</span>
                </div>
                <div>
                    <FontAwesomeIcon className={`${colorIcon}`}  icon={faCalendarAlt} /> <span className = {styles.dateCard}>{date}</span>
                </div>
            </div>
            <Link to = {'/detailEvent/' + name}>
                <button className={`${botonStyles.btn} ${colorButton}`} >VER DETALLES</button>
            </Link>
        </div>
    )
}