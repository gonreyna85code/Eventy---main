import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { follow, unfollow, getUser } from "../../redux/actions";
import Boton from "../Boton/Boton";

export default function Seguir({ouser}){
    var user = useSelector(state=>state.User);
    const dispatch=useDispatch();
    const [params,setParams]=useState('Seguir');
    

    useEffect(()=>{
        dispatch(getUser())
    }, [dispatch])
    useEffect(()=>{
        if(Object.keys(user).length !== 0){

            let consulta = user.follows.map( e => e && e._id === ouser._id );
            
            if(consulta && consulta.length > 0){
                setParams('Dejar de seguir');
            }
        }
    },[params,user,ouser]);

    function handleClick(e){
        if(e.target.textContent==='Seguir'){
            dispatch(follow(user.username,ouser.id))
            setParams('Dejar de seguir');
            window.location.reload();
        }else{
            setParams('Seguir');
            dispatch(unfollow(user.username,ouser.id));
            window.location.reload();
        }
    }

    return (
        <Boton colorBtn='btn_azul' children={params} onClick={handleClick}/>
    )

}