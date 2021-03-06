import React from 'react';
import portada from '../../portadadefault.png';
import photo from '../../photodefault.png';
import styles from './Profile.module.css';
import Boton from '../../components/Boton/Boton';
import { useLocation, useNavigate } from 'react-router';
import Seguir from '../../components/Seguir/Seguir';

export default function Initial({user,other}){
    const history=useNavigate();
    const location=useLocation();
    var toRoute=location.pathname==='/setting'?'Profile':'Settings';

    function handleClick(){
        if(location.pathname==='/setting'){
            history('/profile')
        }else{
            history('/setting')
        }
    }

    if(other){
        return (
            <div className={styles.initial}>
                <img src={user.profile?.portada?user.profile?.portada:portada} alt='portada' id={styles.portada}/><br/>
                <section id={styles.section1}>
                    <img src={user.profile?.photo?user.profile?.photo:photo} id={styles.photop} alt='photop' />
                    <section id={styles.name}>
                        <h1 className={styles.fullname}>{`${user.profile?.name} ${user.profile?.surname}`}</h1>
                        <Seguir ouser={user}/>
                    </section>
                </section>
            </div>
        )
    }

    return (
        <div className={styles.initial}>
            <img src={user.profile?.portada?user.profile?.portada:portada} alt='portada' id={styles.portada}/><br/>
            <section id={styles.section1}>
                <img src={user.profile?.photo?user.profile?.photo:photo} id={styles.photop} alt='photop' />
                <section id={styles.name}>
                    <h1 className={styles.fullname}>{`${user.profile?.name} ${user.profile?.surname}`}</h1>
                    
                </section>
                <section id={styles.setting} >
                    <Boton colorBtn='btn_azul' children={toRoute} onClick={handleClick}  />
                </section>
            </section>
        </div>
    )
}