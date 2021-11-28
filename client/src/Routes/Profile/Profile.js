import {React, useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Profile.module.css';
import Initial from './Initial';
import Information from './Information';
import Novedades from './Novedades';
import { getUser } from '../../redux/actions.js';
import Warning from '../../components/Warning.js/Warning';
import Loading from '../../components/Loading/Loading';


export default function Profile(){
    const user = useSelector(state => state.User);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const [params,setParams]=useState({view:'Novedades'});

    function handleClick(e){
        setParams({view:e.target.innerText})
    }

    if(user==="Usuario no logueado"){
        return (
            <Warning />
        )
    }

    return (
        <div>
        
            { user && user.hasOwnProperty('profile') ?
                <div className={styles.profile}>
                    <Initial user={user} />
                    <section id={styles.section2}>
                        <Information user={user} handleClick={handleClick}/>
                        <Novedades user={user} params={params} />
                    </section>
                </div>
                : <Loading/>
            }
        </div>
    )
}