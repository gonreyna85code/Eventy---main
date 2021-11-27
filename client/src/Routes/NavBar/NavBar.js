import React from "react";
import SearchBar from '../../components/SearchBar/SearchBar'
import { Link } from "react-router-dom";
import logo from '../../Routes/images/logo-blanco.png'
import styles from './NavBar.module.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
 

export default function NavBar(){
  
    return (
        <div className={styles.navBar}>
            <div className={styles.icono}><Link to ="/homeuser"><img src={logo} alt=''/></Link></div>
            <div className={styles.search}><SearchBar/></div>
            <div className={styles.menu}>
                <FontAwesomeIcon icon={faUser}/>
                <ul>
                    <li><Link to="/crear-evento" style={{textDecoration: 'none', color: 'black'}}><span>Crear Evento</span></Link></li>
                    <li><Link to="/profile" style={{textDecoration: 'none', color: 'black'}}><span>Profile</span></Link></li>
                    <li><Link to="/home" style={{textDecoration: 'none', color: 'black'}}><span>ruta 3</span></Link></li>
                </ul>
            </div>
        </div>
    )
}