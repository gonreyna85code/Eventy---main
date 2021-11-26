import React from "react";
import SearchBar from '../SearchBar/SearchBar'
import { Link } from "react-router-dom";
import logo from '../../Routes/images/logo-blanco.png'
import styles from './NavBar.module.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
 

export default function NavBar(){
  
    return (
        <div className={styles.navBar}>
            <div className={styles.icono}><Link to ="/homeuser"><img src={logo}/></Link></div>
            <div className={styles.search}><SearchBar/></div>
            <div className={styles.menu}>
                <FontAwesomeIcon icon={faUser}/>
                <ul>
                    <li><Link to="/crear-evento" style={{textDecoration: 'none', color: 'black'}}><a>Crear Evento</a></Link></li>
                    <li><Link to="/home" style={{textDecoration: 'none', color: 'black'}}><a>ruta 2</a></Link></li>
                    <li><Link to="/home" style={{textDecoration: 'none', color: 'black'}}><a>ruta 3</a></Link></li>
                </ul>
            </div>
        </div>
    )
}