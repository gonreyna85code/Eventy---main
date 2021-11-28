import React from 'react';
import Novedad from './Novedad';
import styles from './Profile.module.css';

export default function Novedades({user,params}){
    if(params.view==='Seguidores'){
        return (
            <div className={styles.novedades}>
                {user.follows?.map((e)=><Novedad info={e} type='seguidor' />)}
            </div>
        )
    }
    if(params.view==='Seguidos'){
        return (
            <div className={styles.novedades}>
                {user.follows?.map((e)=><Novedad info={e} type='seguido' />)}
            </div>
        )
    }
    if(user.events?.length!==0){
        return (
            <div className={styles.novedades}>
                {user.events?.map((e)=><Novedad info={{event:e,user:user}} type='evento' />)}
            </div>
        )
    }
    return (
        <div className={styles.novedades}>
            <Novedad type={0} />
        </div>
    )
}