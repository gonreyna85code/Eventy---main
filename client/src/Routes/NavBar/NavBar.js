import React, {useState} from "react";
import SearchBar from '../../components/SearchBar/SearchBar'
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import logo from '../../Routes/images/logo-blanco.png'
import styles from './NavBar.module.css'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import { logout } from "../../redux/actions";

 

export default function NavBar(){  
    const user = useSelector((state) => state.User);
    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [menu, setMenu] = useState(false);

    const handleClick = ()=>{
        let value = menu ? false : true
        setMenu(value)
    }

    const handler = () => {
        dispatch(logout());
        navigate('/');
        window.location.reload(true);
    }


    return (
        <div className={styles.navBar}>
            <div className={styles.icono}><Link to ="/"><img src={logo} alt=''/></Link></div>
            <div className={styles.cont_left}>
                <div className={styles.search}><SearchBar/></div>
                <div  className={menu ? `${styles.menu_active} ${styles.cont_menu}` : styles.cont_menu}>
                    <FontAwesomeIcon icon={faEllipsisV} onClick={handleClick} className={styles.icon_menu}/>
                    <ul>
                        <div ><Link to="/crear-evento" style={{textDecoration: 'none'}}><span>Crear Evento</span></Link></div>
                        <div ><Link to="/profile" style={{textDecoration: 'none'}}><span>Profile</span></Link></div>
                        <div ><Link to="/" onClick={(e) => handler()} style={{textDecoration: 'none'}}><span>Logout</span></Link></div>
                        {/* <div ><Link to="/setting" style={{textDecoration: 'none'}}><span>About</span></Link></div> */}

                    </ul>
                </div>
                <div className={styles.cont_user}>
                    <Link to="/profile">
                        {user.username}
                        <FontAwesomeIcon icon={faUser}/>
                    </Link>
                </div>
            </div>
        </div>
    )
}