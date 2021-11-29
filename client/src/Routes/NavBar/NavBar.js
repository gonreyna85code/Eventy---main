import React from "react";
import SearchBar from '../../components/SearchBar/SearchBar'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import logo from '../../Routes/images/logo-blanco.png'
import styles from './NavBar.module.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { logout } from "../../redux/actions";

 

export default function NavBar(){  
    const user = useSelector((state) => state.User);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const handler = () => {
        dispatch(logout());
        navigate('/');
        window.location.reload(true);
    }
    return (
        <div className={styles.navBar}>
            <div className={styles.icono}><Link to ="/"><img src={logo} alt=''/></Link></div>
            <div className={styles.search}><SearchBar/></div>
            <div className={styles.menu}>
             <FontAwesomeIcon icon={faUser}/>
             {user.username}
                <ul>
                    <li><Link to="/crear-evento" style={{textDecoration: 'none', color: 'black'}}><span>Crear Evento</span></Link></li>
                    <li><Link to="/profile" style={{textDecoration: 'none', color: 'black'}}><span>Profile</span></Link></li>
                    <li><Link to="/" style={{textDecoration: 'none', color: 'black'}}><span>About</span></Link></li>
                    <li><Link to="/" onClick={(e) => handler()} style={{textDecoration: 'none', color: 'black'}}><span>Logout</span></Link></li>
                </ul>
            </div>
        </div>
    )
}