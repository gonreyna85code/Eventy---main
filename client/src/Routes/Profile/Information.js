import React from 'react';
import styles from './Profile.module.css';
import { Link } from 'react-router-dom';

export default function Information({user,handleClick}){
    console.log(user.follows);
    return (
        <div className={styles.info}>
            <h3 className={styles.title}>Información</h3>
            <span> <b>User:</b> {user.username} </span>
            <span> <b>Ciudad:</b> {user.profile?.city?.cityName} </span>
            <span> <b>Edad:</b> {user.profile?.age} </span>
            <span> <b>Género:</b> {user.profile?.gender?user.profile?.gender:''}</span>
            <h3 onClick={handleClick} className={styles.title}>Usuarios seguidos:</h3>
            {user.follows?.map((e) => <Link to = {'/user/' + e._id} className={styles.item_seguidos}>{ e.username }</Link>)}
            <h3 onClick={handleClick} className={styles.title}>Eventos favoritos:</h3>
            {user.promises?.map((e) => e.expired === false ? <Link to = {'/detailEvent/' + e.name}  className={styles.item_seguidos}>{ e.name }</Link>: null)}
            
        </div>
    )
}