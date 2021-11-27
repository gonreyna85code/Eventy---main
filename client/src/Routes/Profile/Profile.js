import {React, useState} from 'react';
import { useSelector } from 'react-redux';
import styles from './Profile.module.css'
import Initial from './Initial';
import Information from './Information';
import Novedades from './Novedades';
import NavBar from '../NavBar/NavBar';

export default function Profile(){
    const user = useSelector(state => state.User);
    const [params,setParams]=useState({view:'Novedades'});
    function handleClick(e){
        setParams({view:e.target.innerText})
    }
    return (
        <>
            <NavBar />
            <div className={styles.profile}>
                <Initial user={user} />
                <section id={styles.section2}>
                    <Information user={user} handleClick={handleClick}/>
                    <Novedades user={user} params={params} />
                </section>
            </div>
        </>
    )
}