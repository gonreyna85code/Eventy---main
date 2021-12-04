import React from "react";
import SearchBar from '../../components/SearchBar/SearchBar'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import logo from '../../Routes/images/logo-blanco.png'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { logout } from "../../redux/actions";
import botonStyles from "../../components/Boton/Boton.module.css"
import styles from './NavBar.module.css'


 

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
            <div className = {styles.menu}>
            <div className={styles.search}><SearchBar/></div>
                <div className={styles.desplegable}>
                <Link to="/profile" style={{textDecoration: 'none'}}>
                    <div className= {styles.button}>
                        <div className ={styles.profileName}>
                            {user &&user.profile? user.profile.name:null}
                        </div>
                        <FontAwesomeIcon icon={faUser}/>
                    </div>

                </Link>

                    <ul>
                        <div ><Link to="/crear-evento" style={{textDecoration: 'none'}}><span>Crear Evento</span></Link></div>
                        <div ><Link to="/" onClick={(e) => handler()} style={{textDecoration: 'none'}}><span>Logout</span></Link></div>
                    </ul>
                </div>

            </div>

        </div>
    )
}