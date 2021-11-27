import React from 'react';
import styles from './Profile.module.css';

export default function Information({user,handleClick}){
    return (
        <div className={styles.info}>
            <h3 className={styles.title}>Información</h3>
            <span> Ciudad: {user.profile.city} </span>
            <span> Edad: {user.profile.age} </span>
            <span> Género: {user.profile.gender?user.profile.gender:''}</span>
            <h3 className={styles.title}>Suscripciones</h3>
            {user.subscriptions.map((c)=><span>{c}</span>)}
            <h3 onClick={handleClick} className={styles.title}>Seguidores</h3>
            <h3 onClick={handleClick} className={styles.title}>Seguidos</h3>
        </div>
    )
}