import React from "react";
import SearchBar from '../../components/SearchBar/SearchBar'
import { Link } from "react-router-dom";
import logo from '../../Routes/images/logo-blanco.png'
import styles from './NavBar.module.css'
 

export default function NavBar(){
 
    return (
        <div className={styles.navBar}>
            <div className={styles.icono}><Link to ="/homeuser"><img src={logo}/></Link></div>
            <div className={styles.search}><SearchBar/></div>
            <div className={styles.menu}>figurita</div>
        </div>
    )
}