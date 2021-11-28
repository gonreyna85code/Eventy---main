import React from 'react';
import portada from '../../portadadefault.png';
import photo from '../../photodefault.png';
import styles from './Profile.module.css';

export default function Initial({user}){
    return (
        <div className={styles.initial}>
            <img src={user.profile?.portada?user.profile?.portada:portada} alt='portada' id={styles.portada}/><br/>
            <section id={styles.section1}>
                <img src={user.profile?.photo?user.profile?.photo:photo} id={styles.photop} alt='photop' />
                <section id={styles.name}>
                    <h1 className={styles.fullname}>{`${user.profile?.name} ${user.profile?.surname}`}</h1>
                    <h5>User: {user.username}</h5>
                </section>
            </section>
        </div>
    )
}