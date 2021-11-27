import React from 'react';
import styles from './Profile.module.css';

export default function Information({user,handleClick}){
    return (
        <div className={styles.info}>
            <h3 className={styles.title}>Información</h3>
            <span> <b>Ciudad:</b> {user.profile.city} </span>
            <span> <b>Edad:</b> {user.profile.age} </span>
            <span> <b>Género:</b> {user.profile.gender?user.profile.gender:''}</span>
            <h3 className={styles.title}>Suscripciones</h3>
            {user.subscriptions.map((c)=><span>{c}</span>)}
            <h3 onClick={handleClick} className={styles.title}>Seguidores</h3>
            <h3 onClick={handleClick} className={styles.title}>Seguidos</h3>
        </div>
    )
}