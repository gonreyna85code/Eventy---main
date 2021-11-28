import React from "react";
import { Link } from "react-router-dom";
import styles from './CardEvent.module.css'
import botonStyles from "../components/Boton/Boton.module.css"
import {FontAwesomeIcon}from '@fortawesome/react-fontawesome'
import {faCalendarAlt, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons'
import '../portadadefault.png'


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
            { img ?
            <div className={styles.cont_img} style={{backgroundImage:`url(${img})`}}>
                {/* <img className = {styles.imagen} src = {img} alt={name} /> */}
            </div>
            :
            <div>
                <img className = {styles.cont_img} src = 'https://i.pinimg.com/564x/40/b1/3b/40b13b8551695223454663c0d26caaa3.jpg' alt=''></img>
            </div>    
            }
            <div>
                <h3 className = {styles.nameCard}>{name}</h3>
            </div>
            <div className={styles.cont_info}>
                <div>
                    <FontAwesomeIcon  className={`${colorIcon}`} icon={faMapMarkerAlt} /> <span className = {styles.locationCard}>{location}</span>
                </div>
                <div>
                    <FontAwesomeIcon className={`${colorIcon}`}  icon={faCalendarAlt} /> <span className = {styles.dateCard}>{date.slice(8,10)+'/'+date.slice(5,7)+'/'+date.slice(2,4)}</span>
                </div>
            </div>
            <Link to = {'/detailEvent/' + name}>
                <button className={`${botonStyles.btn} ${colorButton}`} >VER DETALLES</button>
            </Link>
        </div>
    )
}