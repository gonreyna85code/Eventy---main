import React from 'react';
import { useNavigate } from "react-router";
import photo from '../../photodefault.png';
import Boton from '../../components/Boton/Boton';
import styles from './Profile.module.css';

export default function Novedad({info,type}){
    let history = useNavigate();

    function handleClick(){
        history(`/detailEvent/${info.event.name}`);
    }

    switch(type){
        case 'seguidor':
            return (
                <div className={styles.novedad}>
                    <img src={photo} alt='photop' className={styles.photoi}/>
                    <span className={styles.p}>{info.username}</span>
                    <Boton children='Seguir' colorBtn='btn_naranja' />
                </div>
            )
        case 'seguido':
            return (
                <div className={styles.novedad}>
                    <img src={photo} alt='photop' className={styles.photoi}/>
                    <span className={styles.p}>{info.username}</span>
                    <Boton children='Dejar de seguir' colorBtn='btn_naranja' />
                </div>
            )
        case 'evento':
            return (
                <div className={styles.novedad}>
                    <img src={info.user.photo?info.user.photo:photo} alt='photop' className={styles.photoi}/>
                    <span className={styles.p}> {info.user.username} ha creado el evento <b onClick={handleClick}> {info.event.name} </b></span>
                </div>
            )
        default:
            return (
                <div className={styles.novedad}>
                    <span className={styles.p} >No hay Novedades recientes, el usuario no ha creado eventos.</span>
                </div>
            )
    }
}