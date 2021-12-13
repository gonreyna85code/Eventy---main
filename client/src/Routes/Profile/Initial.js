import React from 'react';
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

    const portada = 'https://images.pexels.com/photos/361499/pexels-photo-361499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

    if(other){
        return (
            <div className={styles.initial}>
                <div className={styles.cont_img_profile} style={{backgroundImage:`url(${user && user.profile?.portada?user.profile?.portada:portada}})`}}>
                </div>
              
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
            <div className={styles.cont_img_profile} style={{backgroundImage:`url(${user.profile?.portada?user.profile?.portada:portada}})`}}>
            </div>
            <section id={styles.section1}>
                <img src={user.profile?.photo?user.profile?.photo:photo} id={styles.photop} alt='photop' />
                <section id={styles.name}>
                    <h1 className={styles.fullname}>{`${user.profile?.name} ${user.profile?.surname}`}</h1>
                    <Boton colorBtn='btn_azul' children={toRoute} onClick={handleClick}  />
                </section>
                <section id={styles.setting} >
                    
                </section>
            </section>
        </div>
    )
}