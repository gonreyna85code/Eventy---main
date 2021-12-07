import styles from '../Profile/Profile.module.css';
import React from "react";
import { useSelector } from "react-redux";
import Initial from "../Profile/Initial";
import Warning from '../../components/Warning.js/Warning';

export default function User(){
    var ouser=useSelector(state=>state.OtherUsers);
    var user=useSelector(state=>state.User);

    if(user==='Usuario no logueado'){
        return (
            <Warning />
        )
    }
    
    return (
        <div  className={styles.profile}>
            <Initial user={ouser} other={true}/>
        </div>
    )
}